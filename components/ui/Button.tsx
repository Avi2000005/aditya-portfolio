import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-[var(--radius-btn)] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none";

    const variants = {
      primary:
        "bg-[var(--color-accent)] text-white hover:brightness-110 active:brightness-95 shadow-sm",
      outline:
        "border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent-light)] active:bg-[var(--color-accent-light)]",
      ghost:
        "text-[var(--color-text)] hover:bg-[var(--color-border)] active:bg-[var(--color-border)]",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-7 py-3.5 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
