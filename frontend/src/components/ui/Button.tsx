import React from 'react'
import clsx from 'clsx'
import { Loader2 } from 'lucide-react'

type ButtonProps = {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset' | undefined
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  disabled?: boolean
  className?: string
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className,
  onClick
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200'

  const variantStyles = {
    primary: 'bg-black text-white hover:bg-blue-600 focus:ring-blue-400',
    secondary:
      'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400'
  }

  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
}
