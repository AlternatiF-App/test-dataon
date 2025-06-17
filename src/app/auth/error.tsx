'use client'

import { useEffect } from 'react'
import AuthLayout from '@/components/AuthLayout'

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <AuthLayout
      title="Something went wrong"
      subtitle="We apologize for the inconvenience"
    >
      <div className="mt-8 text-center">
        <button
          onClick={reset}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
        >
          Try again
        </button>
      </div>
    </AuthLayout>
  )
} 