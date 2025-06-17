import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const session = await getServerSession()

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const distributors = await prisma.distributor.findMany({
    orderBy: {
      distributorName: 'asc',
    },
  })

  return NextResponse.json(distributors)
}

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const formData = await request.formData()
  const distributorName = formData.get('distributorName') as string
  const city = formData.get('city') as string

  const distributor = await prisma.distributor.create({
    data: {
      distributorName,
      city,
    },
  })

  return NextResponse.json(distributor)
} 