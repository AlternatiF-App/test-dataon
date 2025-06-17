'use client'

import { useState } from 'react'
import { Distributor } from '@prisma/client'
import * as Dialog from '@radix-ui/react-dialog'
import { Plus, Pencil, Trash } from 'lucide-react'

type Props = {
  initialDistributors: Distributor[]
}

export default function DistributorTable({ initialDistributors }: Props) {
  const [distributors, setDistributors] = useState<Distributor[]>(initialDistributors)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedDistributor, setSelectedDistributor] = useState<Distributor | null>(null)

  const handleAdd = async (formData: FormData) => {
    const response = await fetch('/api/distributor', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const newDistributor = await response.json()
      setDistributors([newDistributor, ...distributors])
      setIsAddOpen(false)
    }
  }

  const handleEdit = async (formData: FormData) => {
    if (!selectedDistributor) return

    const response = await fetch(`/api/distributor/${selectedDistributor.id}`, {
      method: 'PUT',
      body: formData,
    })

    if (response.ok) {
      const updatedDistributor = await response.json()
      setDistributors(distributors.map(d => d.id === updatedDistributor.id ? updatedDistributor : d))
      setIsEditOpen(false)
      setSelectedDistributor(null)
    }
  }

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/distributor/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      setDistributors(distributors.filter(d => d.id !== id))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog.Root open={isAddOpen} onOpenChange={setIsAddOpen}>
          <Dialog.Trigger asChild>
            <button className="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
              <Plus className="h-4 w-4" />
              Add Distributor
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
              <Dialog.Title className="text-lg font-semibold">Add Distributor</Dialog.Title>
              <form action={handleAdd} className="mt-4 space-y-4">
                <div>
                  <label htmlFor="distributorName" className="block text-sm font-medium text-gray-700">Distributor Name</label>
                  <input type="text" id="distributorName" name="distributorName" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input type="text" id="city" name="city" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none" />
                </div>
                <div className="flex justify-end gap-3">
                  <Dialog.Close className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                    Cancel
                  </Dialog.Close>
                  <button type="submit" className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                    Add
                  </button>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Distributor Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">City</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {distributors.map((distributor) => (
              <tr key={distributor.id}>
                <td className="whitespace-nowrap px-6 py-4">{distributor.distributorName}</td>
                <td className="whitespace-nowrap px-6 py-4">{distributor.city}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <button
                    onClick={() => {
                      setSelectedDistributor(distributor)
                      setIsEditOpen(true)
                    }}
                    className="mr-2 text-gray-600 hover:text-gray-900"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(distributor.id)}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog.Root open={isEditOpen} onOpenChange={setIsEditOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-semibold">Edit Distributor</Dialog.Title>
            <form action={handleEdit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="edit-distributorName" className="block text-sm font-medium text-gray-700">Distributor Name</label>
                <input
                  type="text"
                  id="edit-distributorName"
                  name="distributorName"
                  defaultValue={selectedDistributor?.distributorName}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="edit-city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  id="edit-city"
                  name="city"
                  defaultValue={selectedDistributor?.city}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Dialog.Close className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                  Cancel
                </Dialog.Close>
                <button type="submit" className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                  Save
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
} 