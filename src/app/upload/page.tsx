import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import UploadForm from '@/components/UploadForm'

export default async function UploadPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Upload Data</h1>
      </div>
      <UploadForm />
    </div>
  )
} 