import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        centered && "text-center mx-auto max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <p className="text-[var(--color-accent)] text-sm font-semibold tracking-widest uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text)] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[var(--color-muted)] text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
