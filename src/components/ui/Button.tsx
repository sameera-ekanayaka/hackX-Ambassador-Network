import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB8FF] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "rounded-full bg-gradient-to-r from-[#1A6FD4] to-[#5BB8FF] text-white border border-white/20 hover:shadow-[0_0_32px_rgba(91,184,255,0.45)] hover:scale-[1.03]",
        secondary:
          "rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/[0.12] text-white hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]",
        ghost:
          "rounded-full text-white/70 hover:text-white hover:bg-white/[0.05]",
        outline:
          "rounded-full border border-[#5BB8FF]/40 bg-transparent text-[#5BB8FF] hover:bg-[#5BB8FF]/10",
        destructive:
          "rounded-full bg-red-500 text-white hover:bg-red-600",
        link: "text-[#5BB8FF] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
