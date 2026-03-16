import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import FantasyCard from "@/components/FantasyCard";
import MagicButton from "@/components/MagicButton";
import { supabase } from "@/integrations/supabase/client";
import { getDefaultPostAuthPath, normalizeNextPath } from "@/lib/auth";

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
          setError(searchError ?? hashError ?? "Authentication failed.");
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
          throw new Error("No authenticated session returned from Supabase.");
        }

        navigate(nextPath, { replace: true });
      } catch (authError) {
        if (!cancelled) {
          const message =
            authError instanceof Error
              ? authError.message
              : "Authentication failed.";
          setError(message);
        }
      }
    };

    void finishAuth();

    return () => {
      cancelled = true;
    };
  }, [location.key, navigate]);

  return (
    <PageLayout dimmed>
      <div className="container mx-auto px-4 py-20 max-w-xl">
        <FantasyCard className="text-center">
          {error ? (
            <>
              <h1 className="font-display text-2xl text-destructive mb-3">
                Sign-In Failed
              </h1>
              <p className="text-sm text-cream-text/80 font-body mb-6">
                {error}
              </p>
              <Link to="/delete-account">
                <MagicButton variant="secondary">Back to Delete Account</MagicButton>
              </Link>
            </>
          ) : (
            <>
              <div className="w-8 h-8 mx-auto border-4 border-gold-highlight border-t-transparent rounded-full animate-spin mb-5" />
              <h1 className="font-display text-2xl text-white mb-3">
                Finishing Sign-In
              </h1>
              <p className="text-sm text-cream-text/80 font-body">
                Completing your secure login and returning you to account deletion.
              </p>
            </>
          )}
        </FantasyCard>
      </div>
    </PageLayout>
  );
};

export default AuthCallback;
