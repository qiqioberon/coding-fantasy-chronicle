import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface MagicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive";
  size?: "default" | "lg" | "sm";
}

const MagicButton = forwardRef<HTMLButtonElement, MagicButtonProps>(
  ({ className, variant = "primary", size = "default", children, disabled, ...props }, ref) => {
    const base =
      "relative font-display tracking-wider uppercase transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary:
        "bg-gradient-to-b from-gold-highlight to-warm-gold text-dark-stroke border-2 border-brown-gold-stroke shadow-[0_4px_0_hsl(30_100%_18%),0_6px_20px_hsl(46_100%_61%/0.4)] hover:shadow-[0_4px_0_hsl(30_100%_18%),0_6px_30px_hsl(46_100%_61%/0.6)] hover:brightness-110 active:shadow-[0_1px_0_hsl(30_100%_18%)] active:translate-y-[3px]",
      secondary:
        "bg-gradient-to-b from-mystic-purple to-royal-indigo text-cream-text border-2 border-lavender-border/60 shadow-[0_4px_0_hsl(248_50%_15%),0_6px_20px_hsl(260_60%_50%/0.3)] hover:shadow-[0_4px_0_hsl(248_50%_15%),0_6px_30px_hsl(260_60%_50%/0.5)] hover:brightness-110 active:shadow-[0_1px_0_hsl(248_50%_15%)] active:translate-y-[3px]",
      destructive:
        "bg-gradient-to-b from-destructive to-[hsl(0_70%_40%)] text-destructive-foreground border-2 border-[hsl(0_60%_30%)] shadow-[0_4px_0_hsl(0_60%_25%),0_6px_20px_hsl(0_84%_60%/0.3)] hover:brightness-110 active:shadow-[0_1px_0_hsl(0_60%_25%)] active:translate-y-[3px]",
    };

    const sizes = {
      sm: "px-5 py-2 text-sm rounded-lg",
      default: "px-8 py-3 text-base rounded-xl",
      lg: "px-10 py-4 text-lg rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

MagicButton.displayName = "MagicButton";

export default MagicButton;
