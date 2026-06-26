import * as React from "react";
import { cn } from "@/lib/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export function Card({
  className,
  hover = false,
  as: Tag = "div",
  children,
  ...rest
}: CardProps) {
  const Component = Tag as React.ElementType;
  return (
    <Component
      className={cn(
        "card-base p-6 md:p-7",
        hover && "card-hover",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
