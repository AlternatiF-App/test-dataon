'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label htmlFor={props.id} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            {...props}
            className={`
              block w-full rounded-lg border-0 bg-gray-50 px-4 py-3 text-gray-900
              shadow-sm ring-1 ring-inset transition-colors
              placeholder:text-gray-400
              ${error ? 'ring-red-300' : 'ring-gray-300'}
              ${
                error
                  ? 'focus:ring-red-500'
                  : 'focus:ring-indigo-500'
              }
              focus:bg-white focus:outline-none focus:ring-2
              ${className}
            `}
          />
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 left-0 text-sm text-red-600"
            >
              {error}
            </motion.div>
          )}
        </div>
        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    )
  }
)

AuthInput.displayName = 'AuthInput'

export default AuthInput 