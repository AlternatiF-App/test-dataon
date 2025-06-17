'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import Image from 'next/image'

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Catalogue', href: '/catalogue' },
    { name: 'Order Status', href: '/order-status' },
    { name: 'Distributor', href: '/distributor' },
    { name: 'Upload', href: '/upload' },
  ]

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4">
        <NavigationMenu.Root className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              <Image
                src="/images/logo.png"
                alt="Coffee Valley"
                width={240}
                height={96}
                className="h-24 w-auto"
                unoptimized
              />
            </Link>
          </div>

          {session ? (
            <NavigationMenu.List className="flex items-center space-x-4">
              {navigation.map((item) => (
                <NavigationMenu.Item key={item.name}>
                  <Link
                    href={item.href}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                      pathname === item.href
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                </NavigationMenu.Item>
              ))}
              <NavigationMenu.Item>
                <button
                  onClick={() => signOut()}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          ) : (
            <Link
              href="/api/auth/signin"
              className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Login
            </Link>
          )}
        </NavigationMenu.Root>
      </nav>
    </header>
  )
} 