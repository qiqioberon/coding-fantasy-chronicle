import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

const FantasyCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "glass-panel p-6 transition-all duration-300 hover:shadow-[var(--shadow-magic),0_0_40px_hsl(260_60%_50%/0.2)] hover:border-lavender-border/50 hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

FantasyCard.displayName = "FantasyCard";

export default FantasyCard;
