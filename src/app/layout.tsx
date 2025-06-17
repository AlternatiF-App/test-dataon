import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SessionProvider from '@/components/SessionProvider'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DataON',
  description: 'Your Data Management Solution',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const childrenString = children?.toString() || ''
  const isAuthPage = childrenString.includes('auth/signin') || 
                    childrenString.includes('auth/register') || 
                    childrenString.includes('auth/password-reset')

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <SessionProvider session={session}>
          {!isAuthPage && <Navbar />}
          {isAuthPage ? (
            children
          ) : (
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          )}
        </SessionProvider>
      </body>
    </html>
  )
}
