import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 text-center shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Page Not Found</h2>
        <p className="mb-4 text-gray-600">The page you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
} 