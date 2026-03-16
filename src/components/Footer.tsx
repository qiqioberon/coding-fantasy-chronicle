import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="relative z-10 border-t border-lavender-border/20 bg-night-indigo/80 backdrop-blur-md">
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="font-display text-lg text-gold-highlight tracking-wide">
            Coding Fantasy
          </h3>
          <p className="text-sm text-muted-foreground mt-1 font-body">
            Master the Code, Rule the Kingdom
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-body">
          <Link
            to="/privacy-policy"
            className="text-cream-text/70 hover:text-gold-highlight transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/delete-account"
            className="text-cream-text/70 hover:text-gold-highlight transition-colors"
          >
            Delete Account
          </Link>
          {/* TODO: Replace with actual support email */}
          <a
            href="mailto:asteriaacademy.id@gmail.com"
            className="text-cream-text/70 hover:text-gold-highlight transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-lavender-border/10 text-center text-xs text-muted-foreground font-body">
        © {new Date().getFullYear()} Coding Fantasy. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
