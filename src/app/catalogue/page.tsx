import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import CatalogueTable from '@/components/CatalogueTable'

const prisma = new PrismaClient()

export default async function CataloguePage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/auth/signin')
  }

  const products = await prisma.catalogue.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Product Catalogue</h1>
      </div>
      <CatalogueTable initialProducts={products} />
    </div>
  )
} 