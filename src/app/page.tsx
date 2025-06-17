import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession()

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Coffee Valley</h1>
      <p className="text-gray-600">
        Your comprehensive data management solution. Use the navigation menu above to access different features.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Catalogue</h2>
          <p className="mt-2 text-gray-600">Browse and manage your product catalogue</p>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Order Status</h2>
          <p className="mt-2 text-gray-600">Track and manage your orders</p>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Distributors</h2>
          <p className="mt-2 text-gray-600">Manage your distributor network</p>
        </div>
      </div>
    </div>
  )
}
