import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Coins,
  LogOut,
  Mail,
  Map,
  Shield,
  Swords,
  Trophy,
  User as UserIcon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  createFallbackDeleteAccountSummary,
  fetchDeleteAccountSummary,
  type DeleteAccountDailyQuestSummary,
  type DeleteAccountSummary,
} from "@/lib/delete-account-summary";
import { getAuthCallbackUrl } from "@/lib/auth";
import PageLayout from "@/components/PageLayout";
import MagicButton from "@/components/MagicButton";
import FantasyCard from "@/components/FantasyCard";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

const CONFIRM_TEXT = "DELETE MY ACCOUNT";

const DeleteAccount = () => {
  const location = useLocation();
  const summaryRequestIdRef = useRef(0);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<DeleteAccountSummary | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryWarning, setSummaryWarning] = useState<string | null>(null);

  useEffect(() => {
    const syncUserState = (nextUser: User | null) => {
      setUser(nextUser);
      setLoading(false);
      void loadSummary(nextUser);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      syncUserState(session?.user ?? null);
    });

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        syncUserState(session?.user ?? null);
      })
      .catch(() => {
        setLoading(false);
      });

    return () => subscription.unsubscribe();
  }, []);

  const loadSummary = async (nextUser: User | null) => {
    const requestId = ++summaryRequestIdRef.current;

    if (!nextUser) {
      setSummary(null);
      setSummaryWarning(null);
      setSummaryLoading(false);
      return;
    }

    setSummary(createFallbackDeleteAccountSummary(nextUser));
    setSummaryWarning(null);
    setSummaryLoading(true);

    try {
      const result = await fetchDeleteAccountSummary(nextUser);
      if (summaryRequestIdRef.current !== requestId) return;
      setSummary(result.summary);
      setSummaryWarning(result.warning);
    } catch (_summaryError) {
      if (summaryRequestIdRef.current !== requestId) return;
      setSummary(createFallbackDeleteAccountSummary(nextUser));
      setSummaryWarning(
        "We could not load your latest account summary. You can still continue with account deletion.",
      );
    } finally {
      if (summaryRequestIdRef.current === requestId) {
        setSummaryLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSummaryWarning(null);

    const { data, error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getAuthCallbackUrl("/delete-account"),
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (signInError) {
      setError(signInError.message);
      return;
    }

    if (!data?.url) {
      setError("Supabase did not return an OAuth redirect URL.");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSummary(null);
    setSummaryWarning(null);
  };

  const handleDelete = async () => {
    if (!user) return;

    setDeleting(true);
    setError(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("No active session");
      }

      const res = await supabase.functions.invoke("delete-user-account", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (res.error) {
        throw new Error(res.error.message || "Deletion failed");
      }

      await supabase.auth.signOut();
      setDeleted(true);
    } catch (deleteError: unknown) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "An unexpected error occurred.",
      );
    } finally {
      setDeleting(false);
    }
  };

  const canDelete = checked && confirmInput === CONFIRM_TEXT && !deleting;
  const authErrorFromUrl = new URLSearchParams(location.search).get("auth_error");
  const displaySummary =
    summary ?? (user ? createFallbackDeleteAccountSummary(user) : null);

  if (loading) {
    return (
      <PageLayout dimmed>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gold-highlight border-t-transparent rounded-full animate-spin" />
        </div>
      </PageLayout>
    );
  }

  if (deleted) {
    return (
      <PageLayout dimmed>
        <div className="container mx-auto px-4 py-20 max-w-xl text-center">
          <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h1 className="font-display text-3xl text-gold-highlight text-shadow-gold mb-4">
            Account Deleted
          </h1>
          <p className="text-cream-text/80 font-body mb-6">
            Your Coding Fantasy account and all associated data have been
            permanently deleted. We&apos;re sorry to see you go.
          </p>
          <FantasyCard>
            <p className="text-sm text-cream-text/70 font-body">
              If you have any questions about your deleted data or need further
              assistance, please contact us at{" "}
              <a
                href="mailto:asteriaacademy.id@gmail.com"
                className="text-cyan-glow underline"
              >
                asteriaacademy.id@gmail.com
              </a>
              .
            </p>
          </FantasyCard>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout dimmed>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl text-gold-highlight text-shadow-gold mb-2 text-center">
          Delete Account
        </h1>
        <p className="text-center text-sm text-muted-foreground font-body mb-10">
          Permanently remove your Coding Fantasy account and data
        </p>

        <FantasyCard className="mb-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-cyan-glow flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-display text-lg text-cream-text mb-2">
                What Happens When You Delete
              </h2>
              <ul className="text-sm text-cream-text/70 font-body space-y-1.5 list-disc list-inside">
                <li>Your authentication account will be permanently removed</li>
                <li>Your profile, username, and avatar will be deleted</li>
                <li>
                  All gameplay progress including quests, quiz scores, and boss
                  completions
                </li>
                <li>Skill tree unlocks and badge achievements</li>
                <li>In-app purchase records (coins and transaction history)</li>
                <li>Daily quest progress and leaderboard entries</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-3 font-body">
                This action is irreversible. Some anonymized or aggregated data
                may be retained as permitted by law.
              </p>
            </div>
          </div>
        </FantasyCard>

        {!user ? (
          <FantasyCard className="text-center">
            <h2 className="font-display text-xl text-cream-text mb-3">
              Sign In to Continue
            </h2>
            <p className="text-sm text-cream-text/70 font-body mb-6">
              To securely delete your account, please sign in with the same
              Google account you use in the Coding Fantasy app.
            </p>
            {(error || authErrorFromUrl) && (
              <div className="mb-5 rounded-lg bg-destructive/10 p-3 text-sm text-destructive font-body">
                {error || authErrorFromUrl}
              </div>
            )}
            <MagicButton onClick={handleGoogleSignIn}>
              Sign In with Google
            </MagicButton>
            <p className="mt-4 text-xs text-muted-foreground font-body">
              After Google sign-in, you will be redirected back to this page to
              complete the deletion flow.
            </p>
            <div className="mt-6 pt-4 border-t border-lavender-border/20">
              <p className="text-xs text-muted-foreground font-body">
                Can&apos;t sign in? Contact us at{" "}
                <a
                  href="mailto:asteriaacademy.id@gmail.com"
                  className="text-cyan-glow underline"
                >
                  asteriaacademy.id@gmail.com
                </a>{" "}
                to request manual account deletion.
              </p>
            </div>
          </FantasyCard>
        ) : (
          <div className="space-y-6">
            {displaySummary && (
              <AccountSummaryPanel
                summary={displaySummary}
                loading={summaryLoading}
                warning={summaryWarning}
                onSignOut={handleSignOut}
              />
            )}

            <div className="rounded-xl border-2 border-destructive/50 bg-destructive/10 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-lg text-destructive mb-1">
                    Danger Zone
                  </h3>
                  <p className="text-sm text-cream-text/80 font-body">
                    Once you delete your account, there is{" "}
                    <strong>no way to recover it</strong>. All your progress,
                    achievements, and purchased items will be permanently lost.
                  </p>
                </div>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={checked}
                onCheckedChange={(value) => setChecked(value === true)}
                className="mt-1"
              />
              <span className="text-sm text-cream-text/80 font-body">
                I understand that deleting my account is permanent and
                irreversible, and that all my data will be lost.
              </span>
            </label>

            <div>
              <label className="block text-sm text-cream-text/70 font-body mb-2">
                Type{" "}
                <span className="text-destructive font-semibold">
                  {CONFIRM_TEXT}
                </span>{" "}
                to confirm:
              </label>
              <Input
                value={confirmInput}
                onChange={(event) => setConfirmInput(event.target.value)}
                placeholder={CONFIRM_TEXT}
                className="bg-muted/50 border-lavender-border/30 text-foreground font-body"
              />
            </div>

            {error && (
              <div className="text-sm text-destructive font-body bg-destructive/10 rounded-lg p-3">
                {error}
              </div>
            )}

            <MagicButton
              variant="destructive"
              size="lg"
              className="w-full"
              disabled={!canDelete}
              onClick={handleDelete}
            >
              {deleting ? "Deleting..." : "Permanently Delete My Account"}
            </MagicButton>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

type AccountSummaryPanelProps = {
  summary: DeleteAccountSummary;
  loading: boolean;
  warning: string | null;
  onSignOut: () => Promise<void>;
};

const AccountSummaryPanel = ({
  summary,
  loading,
  warning,
  onSignOut,
}: AccountSummaryPanelProps) => {
  const progressPercent =
    typeof summary.exp === "number" &&
      typeof summary.expMax === "number" &&
      summary.expMax > 0
      ? Math.min(100, (summary.exp / summary.expMax) * 100)
      : 0;

  return (
    <FantasyCard className="overflow-hidden">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-lavender-border/40 shadow-[0_0_25px_hsl(204_100%_80%/0.12)]">
              <AvatarImage src={summary.avatarUrl ?? undefined} alt={summary.username} />
              <AvatarFallback className="bg-royal-indigo text-white font-display text-2xl">
                {getInitials(summary.username)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow/80 font-semibold">
                Signed In Profile
              </p>
              <h2 className="font-display text-2xl text-white mt-2 truncate">
                {summary.username}
              </h2>
              <div className="mt-3 flex items-center gap-2 text-sm text-cream-text/75 font-body min-w-0">
                <Mail className="h-4 w-4 shrink-0 text-cyan-glow" />
                <span className="truncate">{summary.email}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-cream-text/60 font-body">
                <UserIcon className="h-4 w-4 shrink-0 text-pink-lilac" />
                <span>Ready to review this account before deletion.</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            {loading ? (
              <div className="rounded-full border border-lavender-border/30 bg-night-indigo/70 px-3 py-1.5 text-xs text-cream-text/70 font-body">
                Syncing latest profile...
              </div>
            ) : (
              <div className="rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1.5 text-xs text-green-300 font-body">
                Live account summary loaded
              </div>
            )}
            <div className="flex flex-wrap gap-2 md:justify-end">
              <SummaryPill
                icon={Trophy}
                label="Level"
                value={formatStatValue(summary.level)}
              />
              <SummaryPill
                icon={Coins}
                label="Coins"
                value={formatStatValue(summary.coins)}
              />
            </div>
            <button
              onClick={() => {
                void onSignOut();
              }}
              className="flex items-center gap-1.5 text-xs text-cream-text/60 hover:text-cream-text transition-colors font-body"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {warning && (
          <div className="rounded-xl border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100 font-body">
            {warning}
          </div>
        )}

        <div className="rounded-2xl border border-lavender-border/20 bg-night-indigo/35 p-5">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-glow/80 font-semibold">
                Experience
              </p>
              <h3 className="font-display text-xl text-white mt-2">
                {typeof summary.level === "number"
                  ? `Level ${summary.level} Adventurer`
                  : "Level data unavailable"}
              </h3>
            </div>
            <p className="text-sm text-cream-text/80 font-body">
              {formatExpValue(summary.exp, summary.expMax)}
            </p>
          </div>
          <Progress
            value={progressPercent}
            className="mt-4 h-4 rounded-full bg-royal-indigo/80"
          />
          <div className="mt-3 flex items-center justify-between gap-3 text-xs text-cream-text/60 font-body">
            <span>
              {typeof summary.exp === "number" && typeof summary.expMax === "number"
                ? `${Math.round(progressPercent)}% toward next level`
                : "Progress data will appear when your profile sync is available."}
            </span>
            {loading && summary.exp === null ? (
              <Skeleton className="h-3 w-20 bg-lavender-border/20" />
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <SummaryStat
            icon={Trophy}
            label="Badges"
            value={summary.badgeCount}
            loading={loading}
          />
          <SummaryStat
            icon={Map}
            label="Nodes Cleared"
            value={summary.levelNodeCount}
            loading={loading}
          />
          <SummaryStat
            icon={BookOpen}
            label="Stories"
            value={summary.storyCount}
            loading={loading}
          />
          <SummaryStat
            icon={Shield}
            label="Quizzes"
            value={summary.quizCount}
            loading={loading}
          />
          <SummaryStat
            icon={Swords}
            label="Boss Wins"
            value={summary.bossCount}
            loading={loading}
          />
        </div>

        {summary.latestDailyQuest ? (
          <DailyQuestSummary latestDailyQuest={summary.latestDailyQuest} />
        ) : null}
      </div>
    </FantasyCard>
  );
};

type SummaryPillProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

const SummaryPill = ({ icon: Icon, label, value }: SummaryPillProps) => (
  <div className="rounded-full border border-lavender-border/25 bg-night-indigo/70 px-3.5 py-2 text-sm text-white/90 font-body">
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-cyan-glow" />
      <span className="text-cream-text/70">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  </div>
);

type SummaryStatProps = {
  icon: LucideIcon;
  label: string;
  value: number | null;
  loading: boolean;
};

const SummaryStat = ({ icon: Icon, label, value, loading }: SummaryStatProps) => (
  <div className="rounded-2xl border border-lavender-border/20 bg-royal-indigo/30 p-4">
    <div className="flex items-center gap-2 text-cyan-glow">
      <Icon className="h-4 w-4" />
      <span className="text-xs uppercase tracking-[0.2em] font-semibold">
        {label}
      </span>
    </div>
    <div className="mt-4">
      {loading && value === null ? (
        <Skeleton className="h-8 w-16 bg-lavender-border/20" />
      ) : (
        <p className="font-display text-3xl text-white">
          {formatStatValue(value)}
        </p>
      )}
    </div>
  </div>
);

type DailyQuestSummaryProps = {
  latestDailyQuest: DeleteAccountDailyQuestSummary;
};

const DailyQuestSummary = ({ latestDailyQuest }: DailyQuestSummaryProps) => (
  <div className="rounded-2xl border border-lavender-border/20 bg-night-indigo/25 px-4 py-4">
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-pink-lilac/90 font-semibold">
          Latest Daily Quest
        </p>
        <p className="mt-2 text-sm text-cream-text/80 font-body">
          {formatQuestDate(latestDailyQuest.questLocalDate)}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <DailyQuestBadge
          label="Story"
          done={latestDailyQuest.storyCleared}
        />
        <DailyQuestBadge
          label="Quiz"
          done={latestDailyQuest.quizCleared}
        />
        <DailyQuestBadge
          label="Reward"
          done={latestDailyQuest.rewardClaimed}
        />
      </div>
    </div>
  </div>
);

type DailyQuestBadgeProps = {
  label: string;
  done: boolean;
};

const DailyQuestBadge = ({ label, done }: DailyQuestBadgeProps) => (
  <div
    className={`rounded-full px-3 py-1.5 text-xs font-body border ${done
        ? "border-green-400/20 bg-green-500/10 text-green-200"
        : "border-lavender-border/20 bg-royal-indigo/50 text-cream-text/70"
      }`}
  >
    {label}: {done ? "Done" : "Pending"}
  </div>
);

const getInitials = (username: string): string => {
  const trimmed = username.trim();
  if (!trimmed) return "CF";

  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const formatStatValue = (value: number | null): string =>
  typeof value === "number" ? value.toLocaleString() : "--";

const formatExpValue = (exp: number | null, expMax: number | null): string => {
  if (typeof exp !== "number" || typeof expMax !== "number") {
    return "EXP --";
  }

  return `EXP ${exp.toLocaleString()} / ${expMax.toLocaleString()}`;
};

const formatQuestDate = (value: string): string => {
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
};

export default DeleteAccount;
