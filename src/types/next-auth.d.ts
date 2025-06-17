import 'next-auth'
import { User as PrismaUser } from '@prisma/client'

declare module 'next-auth' {
  interface User extends Omit<PrismaUser, 'password' | 'createdAt' | 'updatedAt'> {}

  interface Session {
    user: User
  }
} 