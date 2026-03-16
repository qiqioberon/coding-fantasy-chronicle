import { Link, useLocation } from "react-router-dom";
import logoImg from "@/assets/logo.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  const { copy } = useI18n();

  const links = [
    { to: "/", label: copy.navbar.home },
    { to: "/privacy-policy", label: copy.navbar.privacy },
    { to: "/delete-account", label: copy.navbar.deleteAccount },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-lavender-border/20 bg-night-indigo/70 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="group flex items-center gap-3">
          <img src={logoImg} alt="Coding Fantasy" className="h-10 w-auto" />
          <span className="hidden font-display text-xl tracking-wide text-white sm:inline">
            Coding Fantasy
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "rounded-lg px-2 py-2 text-xs font-body font-medium transition-colors sm:px-3 sm:text-sm",
                location.pathname === link.to
                  ? "bg-muted/50 text-gold-highlight"
                  : "text-cream-text/70 hover:bg-muted/30 hover:text-cream-text",
              )}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
