'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'

export default function UploadForm() {
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleUpload = async (formData: FormData) => {
    try {
      setIsUploading(true)
      setMessage(null)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      setMessage({ type: 'success', text: 'File uploaded successfully!' })
      formData.delete('file')
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload file. Please try again.' })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <form action={handleUpload} className="space-y-4">
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Choose File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".csv,.xlsx"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-gray-800"
          />
          <p className="mt-1 text-sm text-gray-500">
            Accepted formats: CSV, Excel (.xlsx)
          </p>
        </div>
        <div className="flex items-center justify-end gap-4">
          {message && (
            <p className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message.text}
            </p>
          )}
          <button
            type="submit"
            disabled={isUploading}
            className="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            <Upload className="h-4 w-4" />
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>
    </div>
  )
} 