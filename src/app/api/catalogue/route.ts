import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const session = await getServerSession()

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const products = await prisma.catalogue.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const formData = await request.formData()
  const bean = formData.get('bean') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)

  const product = await prisma.catalogue.create({
    data: {
      bean,
      description,
      price,
    },
  })

  return NextResponse.json(product)
} 