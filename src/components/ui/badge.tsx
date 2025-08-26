import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primaryDark text-background  hover:bg-primaryLight",
        secondary:
          "border-transparent bg-primaryLight text-primaryDark  hover:bg-background",
        destructive:
          "border-transparent bg-backgroundLight text-primaryDark shadow hover:bg-primaryLight",
        helper:
          "border-transparent bg-helper text-primaryDark shadow hover:bg-primaryLight",
        success:
          "border-transparent bg-green-500 text-green-100 shadow hover:bg-green-600",
        failure: // New variant
          "border-transparent bg-red-100 text-red-600  hover:bg-red-200",
           outline:
      "border-primaryDark bg-background text-primaryDark hover:bg-primaryLight"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
export { Badge, badgeVariants }