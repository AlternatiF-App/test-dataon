'use client'

import { useState } from 'react'
import { Catalogue } from '@prisma/client'
import * as Dialog from '@radix-ui/react-dialog'
import { Plus, Pencil, Trash } from 'lucide-react'

type Props = {
  initialProducts: Catalogue[]
}

export default function CatalogueTable({ initialProducts }: Props) {
  const [products, setProducts] = useState<Catalogue[]>(initialProducts)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Catalogue | null>(null)

  const handleAdd = async (formData: FormData) => {
    const response = await fetch('/api/catalogue', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const newProduct = await response.json()
      setProducts([newProduct, ...products])
      setIsAddOpen(false)
    }
  }

  const handleEdit = async (formData: FormData) => {
    if (!selectedProduct) return

    const response = await fetch(`/api/catalogue/${selectedProduct.id}`, {
      method: 'PUT',
      body: formData,
    })

    if (response.ok) {
      const updatedProduct = await response.json()
      setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
      setIsEditOpen(false)
      setSelectedProduct(null)
    }
  }

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/catalogue/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog.Root open={isAddOpen} onOpenChange={setIsAddOpen}>
          <Dialog.Trigger asChild>
            <button className="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
              <Plus className="h-4 w-4" />
              Add Product
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
              <Dialog.Title className="text-lg font-semibold">Add Product</Dialog.Title>
              <form action={handleAdd} className="mt-4 space-y-4">
                <div>
                  <label htmlFor="bean" className="block text-sm font-medium text-gray-700">Bean</label>
                  <input type="text" id="bean" name="bean" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea id="description" name="description" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                  <input type="number" id="price" name="price" step="0.01" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none" />
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
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Bean</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="whitespace-nowrap px-6 py-4">{product.bean}</td>
                <td className="px-6 py-4">{product.description}</td>
                <td className="whitespace-nowrap px-6 py-4">${product.price.toFixed(2)}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <button
                    onClick={() => {
                      setSelectedProduct(product)
                      setIsEditOpen(true)
                    }}
                    className="mr-2 text-gray-600 hover:text-gray-900"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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
            <Dialog.Title className="text-lg font-semibold">Edit Product</Dialog.Title>
            <form action={handleEdit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="edit-bean" className="block text-sm font-medium text-gray-700">Bean</label>
                <input
                  type="text"
                  id="edit-bean"
                  name="bean"
                  defaultValue={selectedProduct?.bean}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="edit-description"
                  name="description"
                  defaultValue={selectedProduct?.description}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="edit-price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  id="edit-price"
                  name="price"
                  step="0.01"
                  defaultValue={selectedProduct?.price}
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