import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Locale, type TranslationDictionary } from "@/lib/translations";

const STORAGE_KEY = "coding-fantasy-chronicle.locale";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  copy: TranslationDictionary;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const getInitialLocale = (): Locale => {
  if (typeof window === "undefined") {
    return "id";
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "id" || stored === "en") {
      return stored;
    }
  } catch {
    return "id";
  }

  return "id";
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Ignore local storage failures and keep the in-memory locale.
    }

    document.documentElement.lang = translations[locale].meta.htmlLang;
  }, [locale]);

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale: setLocaleState,
        copy: translations[locale],
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider.");
  }

  return context;
};
