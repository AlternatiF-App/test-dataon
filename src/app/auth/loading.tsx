import AuthLayout from '@/components/AuthLayout'

export default function AuthLoading() {
  return (
    <AuthLayout title="Loading..." subtitle="">
      <div className="mt-8 flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    </AuthLayout>
  )
} 