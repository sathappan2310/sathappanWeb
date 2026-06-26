import * as React from "react";
import { cn } from "@/lib/cn";

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "glass" | "accent";
}

export function Chip({
  className,
  variant = "default",
  children,
  ...rest
}: ChipProps) {
  const variants: Record<NonNullable<ChipProps["variant"]>, string> = {
    default:
      "bg-surface-2 text-muted border border-line",
    glass: "glass text-text",
    accent:
      "bg-accent/10 text-accent border border-accent/30 uppercase tracking-wider text-xs font-semibold",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
