import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession()

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const formData = await request.formData()
  const distributorName = formData.get('distributorName') as string
  const city = formData.get('city') as string

  const distributor = await prisma.distributor.update({
    where: { id: params.id },
    data: {
      distributorName,
      city,
    },
  })

  return NextResponse.json(distributor)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession()

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  await prisma.distributor.delete({
    where: { id: params.id },
  })

  return new NextResponse(null, { status: 204 })
} 