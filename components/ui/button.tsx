'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, HTMLMotionProps } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap border text-[15px] font-semibold tracking-[-0.01em] transition-[transform,box-shadow,color,background-color,border-color] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-base disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        booking:
          'border-transparent bg-[linear-gradient(135deg,#15251E_0%,#1E332A_100%)] text-[#F9F4EA] shadow-[0_12px_30px_rgba(14,22,19,0.22),inset_0_1px_0_rgba(255,255,255,0.18)] hover:shadow-[0_18px_36px_rgba(14,22,19,0.3),inset_0_1px_0_rgba(255,255,255,0.26)]',
        conversion:
          'border-transparent bg-[linear-gradient(135deg,#C9782D_0%,#B36C2C_100%)] text-[#FFF8EE] shadow-[0_12px_30px_rgba(90,52,20,0.24),inset_0_1px_0_rgba(255,255,255,0.24)] hover:shadow-[0_18px_36px_rgba(90,52,20,0.32),inset_0_1px_0_rgba(255,255,255,0.34)]',
        secondary:
          'border-white/25 bg-white/5 text-primary backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-white/40 hover:bg-white/14',
        ghost:
          'border-transparent bg-transparent text-primary hover:bg-black/5',
      },
      size: {
        default: 'h-[52px] rounded-full px-8',
        sm: 'h-11 rounded-full px-6 text-xs',
        lg: 'h-14 rounded-full px-10 text-[16px]',
        icon: 'h-11 w-11 rounded-full',
        ghost: 'h-auto px-0 py-1 rounded-none',
      },
    },
    defaultVariants: {
      variant: 'booking',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'color'>,
    VariantProps<typeof buttonVariants> {
  showArrow?: boolean
}

type ButtonInnerProps = {
  children: React.ReactNode
  showArrow?: boolean
  arrowSize: number
}

function ButtonInner({ children, showArrow = false, arrowSize }: ButtonInnerProps) {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.22)_50%,transparent_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-y-0 -left-[45%] w-1/3 -skew-x-[22deg] bg-white/18 opacity-0 blur-[1px] transition-all duration-700 ease-out group-hover:left-[120%] group-hover:opacity-100" />
      <span className="relative z-[1] flex items-center gap-3">
        <span>{children}</span>
        {showArrow && (
          <span className="flex shrink-0 items-center justify-center">
            <ArrowRight
              size={arrowSize}
              className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
            />
          </span>
        )}
      </span>
    </>
  )
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, showArrow = false, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.985, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        <ButtonInner showArrow={showArrow} arrowSize={size === 'sm' ? 14 : 16}>
          {children}
        </ButtonInner>
      </motion.button>
    )
  }
)
Button.displayName = 'Button'

// Export a motion anchor for links
export const LinkButton = React.forwardRef<HTMLAnchorElement, Omit<HTMLMotionProps<'a'>, 'color'> & VariantProps<typeof buttonVariants> & { showArrow?: boolean }>(
  ({ className, variant, size, showArrow = false, children, href, ...props }, ref) => {
    return (
      <motion.a
        ref={ref}
        href={href}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.985, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        <ButtonInner showArrow={showArrow} arrowSize={size === 'sm' ? 14 : 16}>
          {children}
        </ButtonInner>
      </motion.a>
    )
  }
)
LinkButton.displayName = 'LinkButton'

export { Button, buttonVariants }
