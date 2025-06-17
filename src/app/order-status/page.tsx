import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function OrderStatusPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Order Status</h1>
      </div>
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <p className="text-gray-600">
          Order status tracking functionality will be implemented in a future update.
        </p>
      </div>
    </div>
  )
} 