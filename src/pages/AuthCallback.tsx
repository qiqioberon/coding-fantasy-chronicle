import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import FantasyCard from "@/components/FantasyCard";
import MagicButton from "@/components/MagicButton";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { getDefaultPostAuthPath, normalizeNextPath } from "@/lib/auth";

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { copy } = useI18n();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const finishAuth = async () => {
      const currentUrl = new URL(window.location.href);
      const nextPath = normalizeNextPath(
        currentUrl.searchParams.get("next") ?? getDefaultPostAuthPath(),
      );
      const searchError =
        currentUrl.searchParams.get("error_description") ??
        currentUrl.searchParams.get("error");
      const hashParams = new URLSearchParams(
        currentUrl.hash.startsWith("#") ? currentUrl.hash.slice(1) : "",
      );
      const hashError =
        hashParams.get("error_description") ?? hashParams.get("error");

      if (searchError || hashError) {
        if (!cancelled) {
          setError(searchError ?? hashError ?? copy.authCallback.genericError);
        }
        return;
      }

      try {
        const {
          data: { session: existingSession },
          error: existingSessionError,
        } = await supabase.auth.getSession();

        if (existingSessionError) {
          throw existingSessionError;
        }

        if (existingSession?.user) {
          navigate(nextPath, { replace: true });
          return;
        }

        const code = currentUrl.searchParams.get("code");
        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            throw exchangeError;
          }
        } else {
          const accessToken = hashParams.get("access_token");
          const refreshToken = hashParams.get("refresh_token");
          if (accessToken && refreshToken) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            if (sessionError) {
              throw sessionError;
            }
          }
        }

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (!session?.user) {
          throw new Error(copy.authCallback.missingSessionError);
        }

        navigate(nextPath, { replace: true });
      } catch (authError) {
        if (!cancelled) {
          setError(
            authError instanceof Error
              ? authError.message
              : copy.authCallback.genericError,
          );
        }
      }
    };

    void finishAuth();

    return () => {
      cancelled = true;
    };
  }, [copy.authCallback.genericError, copy.authCallback.missingSessionError, location.key, navigate]);

  return (
    <PageLayout dimmed>
      <div className="container mx-auto max-w-xl px-4 py-20">
        <FantasyCard className="text-center">
          {error ? (
            <>
              <h1 className="mb-3 font-display text-2xl text-destructive">
                {copy.authCallback.signInFailed}
              </h1>
              <p className="mb-6 text-sm font-body text-cream-text/80">
                {error}
              </p>
              <Link to="/delete-account">
                <MagicButton variant="secondary">
                  {copy.authCallback.backToDeleteAccount}
                </MagicButton>
              </Link>
            </>
          ) : (
            <>
              <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-4 border-gold-highlight border-t-transparent" />
              <h1 className="mb-3 font-display text-2xl text-white">
                {copy.authCallback.finishingSignIn}
              </h1>
              <p className="text-sm font-body text-cream-text/80">
                {copy.authCallback.finishingDescription}
              </p>
            </>
          )}
        </FantasyCard>
      </div>
    </PageLayout>
  );
};

export default AuthCallback;
