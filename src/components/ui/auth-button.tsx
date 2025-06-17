'use client'

import { forwardRef } from 'react'

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingText?: string
  variant?: 'primary' | 'secondary'
}

const AuthButton = forwardRef<HTMLButtonElement, AuthButtonProps>(
  ({ children, isLoading, loadingText = 'Loading...', variant = 'primary', className = '', ...props }, ref) => {
    const baseStyles = 'relative flex w-full justify-center rounded-lg px-4 py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
    const variantStyles = {
      primary: 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus:ring-indigo-500',
      secondary: 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:ring-indigo-500'
    }

    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {loadingText}
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

AuthButton.displayName = 'AuthButton'

export default AuthButton 