import { Link, useLocation } from "react-router-dom";
import logoImg from "@/assets/logo.png";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/privacy-policy", label: "Privacy" },
    { to: "/delete-account", label: "Delete Account" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-night-indigo/70 border-b border-lavender-border/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logoImg} alt="Coding Fantasy" className="h-10 w-auto" />
          <span className="font-display text-xl text-white hidden sm:inline tracking-wide">
            Coding Fantasy
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-body font-medium transition-colors",
                location.pathname === link.to
                  ? "text-gold-highlight bg-muted/50"
                  : "text-cream-text/70 hover:text-cream-text hover:bg-muted/30"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
