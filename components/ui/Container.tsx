import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </Tag>
  );
}
