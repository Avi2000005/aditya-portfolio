import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "accent" | "muted" | "outline";
  className?: string;
}

export function Badge({ children, variant = "accent", className }: BadgeProps) {
  const variants = {
    accent: "bg-[var(--color-accent-light)] text-[var(--color-accent)] border-[var(--color-accent)]/20",
    muted: "bg-[var(--color-border)] text-[var(--color-muted)] border-transparent",
    outline: "bg-transparent text-[var(--color-accent)] border-[var(--color-accent)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
