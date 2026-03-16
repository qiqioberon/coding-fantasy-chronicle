import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type DeleteAccountDailyQuestSummary = {
  questLocalDate: string;
  storyCleared: boolean;
  quizCleared: boolean;
  rewardClaimed: boolean;
};

export type DeleteAccountSummary = {
  username: string;
  email: string;
  avatarUrl: string | null;
  level: number | null;
  exp: number | null;
  expMax: number | null;
  coins: number | null;
  badgeCount: number | null;
  levelNodeCount: number | null;
  storyCount: number | null;
  quizCount: number | null;
  bossCount: number | null;
  latestDailyQuest: DeleteAccountDailyQuestSummary | null;
};

export type DeleteAccountSummaryLoadResult = {
  summary: DeleteAccountSummary;
  warning: string | null;
};

export type DeleteAccountSummaryCopy = {
  fallbackNoEmail: string;
  fallbackUsername: string;
  summaryWarning: string;
};

type CountKey =
  | "badgeCount"
  | "levelNodeCount"
  | "storyCount"
  | "quizCount"
  | "bossCount";

export const createFallbackDeleteAccountSummary = (
  user: User,
  copy: DeleteAccountSummaryCopy,
): DeleteAccountSummary => ({
  username: deriveUsername(user, copy.fallbackUsername),
  email: user.email?.trim() || copy.fallbackNoEmail,
  avatarUrl: deriveAvatarUrl(user),
  level: null,
  exp: null,
  expMax: null,
  coins: null,
  badgeCount: null,
  levelNodeCount: null,
  storyCount: null,
  quizCount: null,
  bossCount: null,
  latestDailyQuest: null,
});

export const fetchDeleteAccountSummary = async (
  user: User,
  copy: DeleteAccountSummaryCopy,
): Promise<DeleteAccountSummaryLoadResult> => {
  const fallback = createFallbackDeleteAccountSummary(user, copy);
  const summary: DeleteAccountSummary = { ...fallback };
  let hadFailures = false;

  const [
    profileResult,
    badgeCountResult,
    levelNodeCountResult,
    storyCountResult,
    quizCountResult,
    bossCountResult,
    dailyQuestResult,
  ] = await Promise.allSettled([
    supabase
      .from("profiles")
      .select("username, avatar_url, level, exp, exp_max, coins")
      .eq("id", user.id)
      .maybeSingle(),
    queryCount("skill_tree_badge_unlocks", user.id),
    queryCount("level_node_completions", user.id),
    queryCount("story_reward_claims", user.id),
    queryCount("quiz_first_pass_claims", user.id),
    queryCount("boss_first_pass_claims", user.id),
    supabase
      .from("daily_quest_progress")
      .select("quest_local_date, story_cleared, quiz_cleared, reward_claimed")
      .eq("user_id", user.id)
      .order("quest_local_date", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  if (profileResult.status === "fulfilled") {
    const { data, error } = profileResult.value;
    if (error) {
      hadFailures = true;
    } else if (data) {
      summary.username = normalizeText(data.username) || summary.username;
      summary.avatarUrl = data.avatar_url ?? summary.avatarUrl;
      summary.level = data.level;
      summary.exp = data.exp;
      summary.expMax = data.exp_max;
      summary.coins = data.coins;
    }
  } else {
    hadFailures = true;
  }

  hadFailures =
    applyCountResult(summary, "badgeCount", badgeCountResult) || hadFailures;
  hadFailures =
    applyCountResult(summary, "levelNodeCount", levelNodeCountResult) ||
    hadFailures;
  hadFailures =
    applyCountResult(summary, "storyCount", storyCountResult) || hadFailures;
  hadFailures =
    applyCountResult(summary, "quizCount", quizCountResult) || hadFailures;
  hadFailures =
    applyCountResult(summary, "bossCount", bossCountResult) || hadFailures;

  if (dailyQuestResult.status === "fulfilled") {
    const { data, error } = dailyQuestResult.value;
    if (error) {
      hadFailures = true;
    } else if (data) {
      summary.latestDailyQuest = {
        questLocalDate: data.quest_local_date,
        storyCleared: data.story_cleared,
        quizCleared: data.quiz_cleared,
        rewardClaimed: data.reward_claimed,
      };
    }
  } else {
    hadFailures = true;
  }

  return {
    summary,
    warning: hadFailures ? copy.summaryWarning : null,
  };
};

const applyCountResult = (
  summary: DeleteAccountSummary,
  key: CountKey,
  result: PromiseSettledResult<{ count: number | null; error: Error | null }>,
): boolean => {
  if (result.status !== "fulfilled") {
    return true;
  }

  if (result.value.error) {
    return true;
  }

  summary[key] = result.value.count ?? 0;
  return false;
};

const queryCount = async (
  table:
    | "skill_tree_badge_unlocks"
    | "level_node_completions"
    | "story_reward_claims"
    | "quiz_first_pass_claims"
    | "boss_first_pass_claims",
  userId: string,
) => {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  return { count, error };
};

const deriveUsername = (user: User, fallbackUsername: string): string => {
  const metadataUsername = normalizeText(
    typeof user.user_metadata?.username === "string"
      ? user.user_metadata.username
      : typeof user.user_metadata?.user_name === "string"
        ? user.user_metadata.user_name
        : "",
  );

  if (metadataUsername) {
    return metadataUsername;
  }

  const emailName = normalizeText(user.email?.split("@")[0]);
  if (emailName) {
    return emailName;
  }

  return fallbackUsername;
};

const deriveAvatarUrl = (user: User): string | null => {
  const picture = normalizeText(
    typeof user.user_metadata?.picture === "string"
      ? user.user_metadata.picture
      : typeof user.user_metadata?.avatar_url === "string"
        ? user.user_metadata.avatar_url
        : typeof user.user_metadata?.avatarUrl === "string"
          ? user.user_metadata.avatarUrl
          : "",
  );

  return picture || null;
};

const normalizeText = (value: string | null | undefined): string =>
  value?.trim() ?? "";
