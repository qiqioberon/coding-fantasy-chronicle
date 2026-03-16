import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import PageLayout from "@/components/PageLayout";
import MagicButton from "@/components/MagicButton";
import FantasyCard from "@/components/FantasyCard";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, CheckCircle2, LogOut, Shield } from "lucide-react";

const CONFIRM_TEXT = "DELETE MY ACCOUNT";

const DeleteAccount = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/delete-account",
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleDelete = async () => {
    if (!user) return;
    setDeleting(true);
    setError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No active session");

      // TODO: Replace with your actual edge function URL once deployed
      const res = await supabase.functions.invoke("delete-user-account", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (res.error) throw new Error(res.error.message || "Deletion failed");

      await supabase.auth.signOut();
      setDeleted(true);
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setDeleting(false);
    }
  };

  const canDelete = checked && confirmInput === CONFIRM_TEXT && !deleting;

  if (loading) {
    return (
      <PageLayout dimmed>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gold-highlight border-t-transparent rounded-full animate-spin" />
        </div>
      </PageLayout>
    );
  }

  // Success state after deletion
  if (deleted) {
    return (
      <PageLayout dimmed>
        <div className="container mx-auto px-4 py-20 max-w-xl text-center">
          <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h1 className="font-display text-3xl text-gold-highlight text-shadow-gold mb-4">
            Account Deleted
          </h1>
          <p className="text-cream-text/80 font-body mb-6">
            Your Coding Fantasy account and all associated data have been permanently deleted. We're sorry to see you go.
          </p>
          {/* TODO: Replace with actual post-deletion info or support link */}
          <FantasyCard>
            <p className="text-sm text-cream-text/70 font-body">
              If you have any questions about your deleted data or need further assistance, please contact us at{" "}
              <a href="mailto:support@example.com" className="text-cyan-glow underline">
                support@example.com
              </a>.
            </p>
          </FantasyCard>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout dimmed>
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <h1 className="font-display text-3xl md:text-4xl text-gold-highlight text-shadow-gold mb-2 text-center">
          Delete Account
        </h1>
        <p className="text-center text-sm text-muted-foreground font-body mb-10">
          Permanently remove your Coding Fantasy account and data
        </p>

        {/* Public info — always visible */}
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
                <li>All gameplay progress including quests, quiz scores, and boss completions</li>
                <li>Skill tree unlocks and badge achievements</li>
                <li>In-app purchase records (coins and transaction history)</li>
                <li>Daily quest progress and leaderboard entries</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-3 font-body">
                This action is irreversible. Some anonymized or aggregated data may be retained as permitted by law.
              </p>
            </div>
          </div>
        </FantasyCard>

        {!user ? (
          /* Not logged in */
          <FantasyCard className="text-center">
            <h2 className="font-display text-xl text-cream-text mb-3">
              Sign In to Continue
            </h2>
            <p className="text-sm text-cream-text/70 font-body mb-6">
              To securely delete your account, please sign in with the same Google account you use in the Coding Fantasy app.
            </p>
            <MagicButton onClick={handleGoogleSignIn}>
              Sign In with Google
            </MagicButton>
            <div className="mt-6 pt-4 border-t border-lavender-border/20">
              <p className="text-xs text-muted-foreground font-body">
                {/* TODO: Replace with actual support email */}
                Can't sign in? Contact us at{" "}
                <a href="mailto:support@example.com" className="text-cyan-glow underline">
                  support@example.com
                </a>{" "}
                to request manual account deletion.
              </p>
            </div>
          </FantasyCard>
        ) : (
          /* Logged in — deletion flow */
          <div className="space-y-6">
            {/* Account info */}
            <FantasyCard className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-xs text-muted-foreground font-body">Signed in as</p>
                <p className="text-sm text-cream-text font-body font-medium">
                  {user.email}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 text-xs text-cream-text/60 hover:text-cream-text transition-colors font-body"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </FantasyCard>

            {/* Warning */}
            <div className="rounded-xl border-2 border-destructive/50 bg-destructive/10 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-lg text-destructive mb-1">
                    Danger Zone
                  </h3>
                  <p className="text-sm text-cream-text/80 font-body">
                    Once you delete your account, there is <strong>no way to recover it</strong>.
                    All your progress, achievements, and purchased items will be permanently lost.
                  </p>
                </div>
              </div>
            </div>

            {/* Confirmation checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={checked}
                onCheckedChange={(v) => setChecked(v === true)}
                className="mt-1"
              />
              <span className="text-sm text-cream-text/80 font-body">
                I understand that deleting my account is permanent and irreversible, and that all my data will be lost.
              </span>
            </label>

            {/* Typed confirmation */}
            <div>
              <label className="block text-sm text-cream-text/70 font-body mb-2">
                Type <span className="text-destructive font-semibold">{CONFIRM_TEXT}</span> to confirm:
              </label>
              <Input
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
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

export default DeleteAccount;
