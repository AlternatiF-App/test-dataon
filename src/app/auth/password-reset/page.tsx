'use client'

import { useState } from 'react'
import Link from 'next/link'
import AuthLayout from '@/components/AuthLayout'
import AuthInput from '@/components/ui/auth-input'
import AuthButton from '@/components/ui/auth-button'
import { motion } from 'framer-motion'

export default function PasswordReset() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    try {
      const response = await fetch('/api/password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSuccess('Password reset instructions have been sent to your email.')
        e.currentTarget.reset()
      } else {
        const data = await response.text()
        setError(data)
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle={
        <>
          Remember your password?{' '}
          <Link href="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </>
      }
    >
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md bg-red-50 p-4 text-sm text-red-600"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md bg-green-50 p-4 text-sm text-green-600"
          >
            {success}
          </motion.div>
        )}

        <div className="space-y-6">
          <AuthInput
            id="email"
            name="email"
            type="email"
            label="Email address"
            autoComplete="email"
            required
            placeholder="Enter your email"
            helperText="We'll send you instructions on how to reset your password."
          />
        </div>

        <AuthButton
          type="submit"
          isLoading={isLoading}
          loadingText="Sending instructions..."
        >
          Send reset instructions
        </AuthButton>
      </form>
    </AuthLayout>
  )
} 