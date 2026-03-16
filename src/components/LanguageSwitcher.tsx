import { useI18n } from "@/lib/i18n";
import type { Locale } from "@/lib/translations";
import { cn } from "@/lib/utils";

const languages: Locale[] = ["id", "en"];

const LanguageSwitcher = () => {
  const { locale, setLocale, copy } = useI18n();

  return (
    <div
      className="inline-flex items-center rounded-full border border-lavender-border/30 bg-night-indigo/75 p-1 shadow-[0_0_20px_hsl(248_50%_15%/0.2)]"
      aria-label={copy.meta.languageSwitcherLabel}
      role="group"
    >
      {languages.map((language) => (
        <button
          key={language}
          type="button"
          onClick={() => setLocale(language)}
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.22em] transition-colors sm:px-3 sm:text-xs",
            locale === language
              ? "bg-gold-highlight text-dark-stroke"
              : "text-cream-text/70 hover:text-white",
          )}
          aria-pressed={locale === language}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
