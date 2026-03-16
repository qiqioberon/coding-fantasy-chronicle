import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const Footer = () => {
  const { copy } = useI18n();

  return (
    <footer className="relative z-10 border-t border-lavender-border/20 bg-night-indigo/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="font-display text-lg tracking-wide text-gold-highlight">
              Coding Fantasy
            </h3>
            <p className="mt-1 text-sm font-body text-muted-foreground">
              {copy.footer.tagline}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-body">
            <Link
              to="/privacy-policy"
              className="text-cream-text/70 transition-colors hover:text-gold-highlight"
            >
              {copy.footer.privacyPolicy}
            </Link>
            <Link
              to="/delete-account"
              className="text-cream-text/70 transition-colors hover:text-gold-highlight"
            >
              {copy.footer.deleteAccount}
            </Link>
            <a
              href="mailto:asteriaacademy.id@gmail.com"
              className="text-cream-text/70 transition-colors hover:text-gold-highlight"
            >
              {copy.footer.contact}
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-lavender-border/10 pt-6 text-center text-xs font-body text-muted-foreground">
          Copyright {new Date().getFullYear()} Coding Fantasy. {copy.footer.rightsReserved}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
