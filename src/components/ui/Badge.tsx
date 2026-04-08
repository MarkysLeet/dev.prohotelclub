import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        {
          "border-transparent bg-primary text-[#F6EEE1]": variant === "default",
          "border-transparent bg-surface-dim text-foreground": variant === "secondary",
          "text-foreground border-text-secondary/20": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
