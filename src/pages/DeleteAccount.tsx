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
import { useI18n } from "@/lib/i18n";
import type { Locale, TranslationDictionary } from "@/lib/translations";
import PageLayout from "@/components/PageLayout";
import MagicButton from "@/components/MagicButton";
import FantasyCard from "@/components/FantasyCard";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

type DeleteAccountSummaryCopy = TranslationDictionary["deleteAccount"]["summary"];

const DeleteAccount = () => {
  const location = useLocation();
  const { locale, copy } = useI18n();
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

  const pageCopy = copy.deleteAccount;
  const summaryCopy = pageCopy.summary;
  const confirmText = pageCopy.confirmText;

  const loadSummary = async (nextUser: User | null) => {
    const requestId = ++summaryRequestIdRef.current;

    if (!nextUser) {
      setSummary(null);
      setSummaryWarning(null);
      setSummaryLoading(false);
      return;
    }

    setSummary(createFallbackDeleteAccountSummary(nextUser, summaryCopy));
    setSummaryWarning(null);
    setSummaryLoading(true);

    try {
      const result = await fetchDeleteAccountSummary(nextUser, summaryCopy);
      if (summaryRequestIdRef.current !== requestId) {
        return;
      }

      setSummary(result.summary);
      setSummaryWarning(result.warning);
    } catch {
      if (summaryRequestIdRef.current !== requestId) {
        return;
      }

      setSummary(createFallbackDeleteAccountSummary(nextUser, summaryCopy));
      setSummaryWarning(pageCopy.confirmation.fallbackSummaryWarning);
    } finally {
      if (summaryRequestIdRef.current === requestId) {
        setSummaryLoading(false);
      }
    }
  };

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
  }, [locale]);

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
      setError(pageCopy.signInCard.missingRedirectError);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSummary(null);
    setSummaryWarning(null);
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    setDeleting(true);
    setError(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error(pageCopy.confirmation.noSessionError);
      }

      const res = await supabase.functions.invoke("delete-user-account", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (res.error) {
        throw new Error(res.error.message || pageCopy.confirmation.unexpectedError);
      }

      await supabase.auth.signOut();
      setDeleted(true);
    } catch (deleteError: unknown) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : pageCopy.confirmation.unexpectedError,
      );
    } finally {
      setDeleting(false);
    }
  };

  const canDelete = checked && confirmInput === confirmText && !deleting;
  const authErrorFromUrl = new URLSearchParams(location.search).get("auth_error");
  const displaySummary =
    summary ?? (user ? createFallbackDeleteAccountSummary(user, summaryCopy) : null);

  if (loading) {
    return (
      <PageLayout dimmed>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold-highlight border-t-transparent" />
        </div>
      </PageLayout>
    );
  }

  if (deleted) {
    return (
      <PageLayout dimmed>
        <div className="container mx-auto max-w-xl px-4 py-20 text-center">
          <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-green-400" />
          <h1 className="mb-4 font-display text-3xl text-gold-highlight text-shadow-gold">
            {pageCopy.deletedState.title}
          </h1>
          <p className="mb-6 font-body text-cream-text/80">
            {pageCopy.deletedState.description}
          </p>
          <FantasyCard>
            <p className="text-sm font-body text-cream-text/70">
              {pageCopy.deletedState.help}{" "}
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
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <h1 className="mb-2 text-center font-display text-3xl text-gold-highlight text-shadow-gold md:text-4xl">
          {pageCopy.title}
        </h1>
        <p className="mb-10 text-center text-sm font-body text-muted-foreground">
          {pageCopy.subtitle}
        </p>

        <FantasyCard className="mb-6">
          <div className="flex items-start gap-3">
            <Shield className="mt-0.5 h-6 w-6 flex-shrink-0 text-cyan-glow" />
            <div>
              <h2 className="mb-2 font-display text-lg text-cream-text">
                {pageCopy.deleteInfo.title}
              </h2>
              <ul className="list-inside list-disc space-y-1.5 text-sm font-body text-cream-text/70">
                {pageCopy.deleteInfo.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs font-body text-muted-foreground">
                {pageCopy.deleteInfo.note}
              </p>
            </div>
          </div>
        </FantasyCard>

        {!user ? (
          <FantasyCard className="text-center">
            <h2 className="mb-3 font-display text-xl text-cream-text">
              {pageCopy.signInCard.title}
            </h2>
            <p className="mb-6 text-sm font-body text-cream-text/70">
              {pageCopy.signInCard.description}
            </p>
            {(error || authErrorFromUrl) && (
              <div className="mb-5 rounded-lg bg-destructive/10 p-3 text-sm font-body text-destructive">
                {error || authErrorFromUrl}
              </div>
            )}
            <MagicButton onClick={handleGoogleSignIn}>
              {pageCopy.signInCard.signInButton}
            </MagicButton>
            <p className="mt-4 text-xs font-body text-muted-foreground">
              {pageCopy.signInCard.signInHelp}
            </p>
            <div className="mt-6 border-t border-lavender-border/20 pt-4">
              <p className="text-xs font-body text-muted-foreground">
                {pageCopy.signInCard.manualHelpPrefix}{" "}
                <a
                  href="mailto:asteriaacademy.id@gmail.com"
                  className="text-cyan-glow underline"
                >
                  asteriaacademy.id@gmail.com
                </a>{" "}
                {pageCopy.signInCard.manualHelpSuffix}
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
                locale={locale}
                numberLocale={copy.meta.numberLocale}
                dateLocale={copy.meta.dateLocale}
                copy={summaryCopy}
                onSignOut={handleSignOut}
              />
            )}

            <div className="rounded-xl border-2 border-destructive/50 bg-destructive/10 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-6 w-6 flex-shrink-0 text-destructive" />
                <div>
                  <h3 className="mb-1 font-display text-lg text-destructive">
                    {pageCopy.dangerZone.title}
                  </h3>
                  <p className="text-sm font-body text-cream-text/80">
                    {pageCopy.dangerZone.description}
                  </p>
                </div>
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-3">
              <Checkbox
                checked={checked}
                onCheckedChange={(value) => setChecked(value === true)}
                className="mt-1"
              />
              <span className="text-sm font-body text-cream-text/80">
                {pageCopy.confirmation.checkbox}
              </span>
            </label>

            <div>
              <label className="mb-2 block text-sm font-body text-cream-text/70">
                {pageCopy.confirmation.inputLabelPrefix}{" "}
                <span className="font-semibold text-destructive">
                  {confirmText}
                </span>{" "}
                {pageCopy.confirmation.inputLabelSuffix}
              </label>
              <Input
                value={confirmInput}
                onChange={(event) => setConfirmInput(event.target.value)}
                placeholder={confirmText}
                className="border-lavender-border/30 bg-muted/50 font-body text-foreground"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm font-body text-destructive">
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
              {deleting
                ? pageCopy.confirmation.deletingButton
                : pageCopy.confirmation.deleteButton}
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
  locale: Locale;
  numberLocale: string;
  dateLocale: string;
  copy: DeleteAccountSummaryCopy;
  onSignOut: () => Promise<void>;
};

const AccountSummaryPanel = ({
  summary,
  loading,
  warning,
  locale,
  numberLocale,
  dateLocale,
  copy,
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
              <AvatarImage
                src={summary.avatarUrl ?? undefined}
                alt={summary.username}
              />
              <AvatarFallback className="bg-royal-indigo font-display text-2xl text-white">
                {getInitials(summary.username)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-glow/80">
                {copy.signedInProfile}
              </p>
              <h2 className="mt-2 truncate font-display text-2xl text-white">
                {summary.username}
              </h2>
              <div className="mt-3 flex min-w-0 items-center gap-2 text-sm font-body text-cream-text/75">
                <Mail className="h-4 w-4 shrink-0 text-cyan-glow" />
                <span className="truncate">{summary.email}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm font-body text-cream-text/60">
                <UserIcon className="h-4 w-4 shrink-0 text-pink-lilac" />
                <span>{copy.readyToReview}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <div
              className={`rounded-full border px-3 py-1.5 text-xs font-body ${
                loading
                  ? "border-lavender-border/30 bg-night-indigo/70 text-cream-text/70"
                  : "border-green-400/20 bg-green-500/10 text-green-300"
              }`}
            >
              {loading ? copy.syncing : copy.liveLoaded}
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <SummaryPill
                icon={Trophy}
                label={copy.levelLabel}
                value={formatStatValue(summary.level, numberLocale)}
              />
              <SummaryPill
                icon={Coins}
                label={copy.coinsLabel}
                value={formatStatValue(summary.coins, numberLocale)}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                void onSignOut();
              }}
              className="flex items-center gap-1.5 text-xs font-body text-cream-text/60 transition-colors hover:text-cream-text"
            >
              <LogOut className="h-3.5 w-3.5" />
              {copy.signOut}
            </button>
          </div>
        </div>

        {warning && (
          <div className="rounded-xl border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-sm font-body text-amber-100">
            {warning}
          </div>
        )}

        <div className="rounded-2xl border border-lavender-border/20 bg-night-indigo/35 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-glow/80">
                {copy.experience}
              </p>
              <h3 className="mt-2 font-display text-xl text-white">
                {formatLevelHeading(summary.level, locale, numberLocale, copy)}
              </h3>
            </div>
            <p className="text-sm font-body text-cream-text/80">
              {formatExpValue(summary.exp, summary.expMax, numberLocale)}
            </p>
          </div>
          <Progress
            value={progressPercent}
            className="mt-4 h-4 rounded-full bg-royal-indigo/80"
          />
          <div className="mt-3 flex items-center justify-between gap-3 text-xs font-body text-cream-text/60">
            <span>
              {formatProgressText(
                progressPercent,
                summary.exp,
                summary.expMax,
                copy,
              )}
            </span>
            {loading && summary.exp === null ? (
              <Skeleton className="h-3 w-20 bg-lavender-border/20" />
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <SummaryStat
            icon={Trophy}
            label={copy.badges}
            value={summary.badgeCount}
            numberLocale={numberLocale}
            loading={loading}
          />
          <SummaryStat
            icon={Map}
            label={copy.nodesCleared}
            value={summary.levelNodeCount}
            numberLocale={numberLocale}
            loading={loading}
          />
          <SummaryStat
            icon={BookOpen}
            label={copy.stories}
            value={summary.storyCount}
            numberLocale={numberLocale}
            loading={loading}
          />
          <SummaryStat
            icon={Shield}
            label={copy.quizzes}
            value={summary.quizCount}
            numberLocale={numberLocale}
            loading={loading}
          />
          <SummaryStat
            icon={Swords}
            label={copy.bossWins}
            value={summary.bossCount}
            numberLocale={numberLocale}
            loading={loading}
          />
        </div>

        {summary.latestDailyQuest ? (
          <DailyQuestSummary
            latestDailyQuest={summary.latestDailyQuest}
            copy={copy}
            dateLocale={dateLocale}
          />
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
  <div className="rounded-full border border-lavender-border/25 bg-night-indigo/70 px-3.5 py-2 text-sm font-body text-white/90">
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
  numberLocale: string;
  loading: boolean;
};

const SummaryStat = ({
  icon: Icon,
  label,
  value,
  numberLocale,
  loading,
}: SummaryStatProps) => (
  <div className="rounded-2xl border border-lavender-border/20 bg-royal-indigo/30 p-4">
    <div className="flex items-center gap-2 text-cyan-glow">
      <Icon className="h-4 w-4" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em]">
        {label}
      </span>
    </div>
    <div className="mt-4">
      {loading && value === null ? (
        <Skeleton className="h-8 w-16 bg-lavender-border/20" />
      ) : (
        <p className="font-display text-3xl text-white">
          {formatStatValue(value, numberLocale)}
        </p>
      )}
    </div>
  </div>
);

type DailyQuestSummaryProps = {
  latestDailyQuest: DeleteAccountDailyQuestSummary;
  copy: DeleteAccountSummaryCopy;
  dateLocale: string;
};

const DailyQuestSummary = ({
  latestDailyQuest,
  copy,
  dateLocale,
}: DailyQuestSummaryProps) => (
  <div className="rounded-2xl border border-lavender-border/20 bg-night-indigo/25 px-4 py-4">
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pink-lilac/90">
          {copy.latestDailyQuest}
        </p>
        <p className="mt-2 text-sm font-body text-cream-text/80">
          {formatQuestDate(latestDailyQuest.questLocalDate, dateLocale)}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <DailyQuestBadge
          label={copy.story}
          done={latestDailyQuest.storyCleared}
          copy={copy}
        />
        <DailyQuestBadge
          label={copy.quiz}
          done={latestDailyQuest.quizCleared}
          copy={copy}
        />
        <DailyQuestBadge
          label={copy.reward}
          done={latestDailyQuest.rewardClaimed}
          copy={copy}
        />
      </div>
    </div>
  </div>
);

type DailyQuestBadgeProps = {
  label: string;
  done: boolean;
  copy: DeleteAccountSummaryCopy;
};

const DailyQuestBadge = ({ label, done, copy }: DailyQuestBadgeProps) => (
  <div
    className={`rounded-full border px-3 py-1.5 text-xs font-body ${
      done
        ? "border-green-400/20 bg-green-500/10 text-green-200"
        : "border-lavender-border/20 bg-royal-indigo/50 text-cream-text/70"
    }`}
  >
    {label}: {done ? copy.done : copy.pending}
  </div>
);

const getInitials = (username: string): string => {
  const trimmed = username.trim();
  if (!trimmed) {
    return "CF";
  }

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

const formatStatValue = (value: number | null, numberLocale: string): string =>
  typeof value === "number" ? value.toLocaleString(numberLocale) : "--";

const formatExpValue = (
  exp: number | null,
  expMax: number | null,
  numberLocale: string,
): string => {
  if (typeof exp !== "number" || typeof expMax !== "number") {
    return "EXP --";
  }

  return `EXP ${exp.toLocaleString(numberLocale)} / ${expMax.toLocaleString(numberLocale)}`;
};

const formatLevelHeading = (
  level: number | null,
  locale: Locale,
  numberLocale: string,
  copy: DeleteAccountSummaryCopy,
): string => {
  if (typeof level !== "number") {
    return copy.levelUnavailable;
  }

  const formattedLevel = level.toLocaleString(numberLocale);
  return locale === "id"
    ? `Petualang Level ${formattedLevel}`
    : `Level ${formattedLevel} Adventurer`;
};

const formatProgressText = (
  progressPercent: number,
  exp: number | null,
  expMax: number | null,
  copy: DeleteAccountSummaryCopy,
): string => {
  if (typeof exp !== "number" || typeof expMax !== "number") {
    return copy.progressUnavailable;
  }

  return `${Math.round(progressPercent)}% ${copy.progressSuffix}`;
};

const formatQuestDate = (value: string, dateLocale: string): string => {
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(dateLocale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
};

export default DeleteAccount;
