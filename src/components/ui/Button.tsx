import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-lg font-medium transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 px-8 py-4 overflow-hidden group",
          variant === 'primary' && "bg-gradient-to-r from-brand-royal to-brand-sky text-white hover:shadow-[0_0_30px_rgba(91,184,255,0.4)] hover:scale-[1.02] border border-white/20",
          variant === 'secondary' && "bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:scale-[1.02]",
          variant === 'glass' && "bg-white/10 backdrop-blur-2xl border border-white/20 text-white hover:bg-white/20 hover:shadow-[0_0_30px_rgba(26,111,212,0.5)] hover:border-brand-sky/50 hover:scale-[1.02]",
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        
        {/* Shine effect overlay for primary button */}
        {variant === 'primary' && (
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite] transition-all" />
        )}
      </button>
    )
  }
)
Button.displayName = "Button"
