const DEFAULT_POST_AUTH_PATH = "/delete-account";

export const getSiteUrl = (): string => {
  const configuredUrl = import.meta.env.VITE_SITE_URL?.trim();
  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, "");
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
};

export const normalizeNextPath = (value: string | null | undefined): string => {
  if (!value || !value.startsWith("/")) {
    return DEFAULT_POST_AUTH_PATH;
  }

  if (value.startsWith("//")) {
    return DEFAULT_POST_AUTH_PATH;
  }

  return value;
};

export const getAuthCallbackUrl = (nextPath = DEFAULT_POST_AUTH_PATH): string => {
  const baseUrl = getSiteUrl();
  const normalizedNextPath = normalizeNextPath(nextPath);
  return `${baseUrl}/auth/callback?next=${encodeURIComponent(normalizedNextPath)}`;
};

export const getDefaultPostAuthPath = (): string => DEFAULT_POST_AUTH_PATH;
