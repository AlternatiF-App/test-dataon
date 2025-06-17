import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import DistributorTable from '@/components/DistributorTable'

const prisma = new PrismaClient()

export default async function DistributorPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/auth/signin')
  }

  const distributors = await prisma.distributor.findMany({
    orderBy: {
      distributorName: 'asc',
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Distributors</h1>
      </div>
      <DistributorTable initialDistributors={distributors} />
    </div>
  )
} 