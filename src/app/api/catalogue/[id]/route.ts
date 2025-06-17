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
  const bean = formData.get('bean') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)

  const product = await prisma.catalogue.update({
    where: { id: params.id },
    data: {
      bean,
      description,
      price,
    },
  })

  return NextResponse.json(product)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession()

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  await prisma.catalogue.delete({
    where: { id: params.id },
  })

  return new NextResponse(null, { status: 204 })
} 