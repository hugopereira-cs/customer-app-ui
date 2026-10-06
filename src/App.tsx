import { useCallback, useEffect, useState } from 'react'
import { CustomerForm } from './components/CustomerForm'
import { CustomerList } from './components/CustomerList'
import { api } from './services/api'
import type { Customer } from './types/customer'

export default function App() {
	const [customers, setCustomers] = useState<Customer[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [loadError, setLoadError] = useState(false)

	const loadCustomers = useCallback(async () => {
		setIsLoading(true)
		setLoadError(false)
		try {
			const response = await api.get<Customer[]>('/customers')
			setCustomers(response.data)
		} catch (error) {
			console.error('Não foi possível carregar os clientes:', error)
			setLoadError(true)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		void loadCustomers()
	}, [loadCustomers])

	async function handleCreate(name: string, email: string) {
		const response = await api.post<Customer>('/customers', { name, email })
		setCustomers((currentCustomers) => [...currentCustomers, response.data])
	}

	async function handleDelete(id: string) {
		try {
			await api.delete(`/customers/${id}`)
			setCustomers((currentCustomers) =>
				currentCustomers.filter((customer) => customer.id !== id),
			)
		} catch (error) {
			console.error('Não foi possível excluir o cliente:', error)
		}
	}

	async function handleUpdateEmail(id: string, email: string) {
		await api.patch(`/customers/${id}`, { email })

		setCustomers((currentCustomers) =>
			currentCustomers.map((customer) =>
				customer.id === id ? { ...customer, email } : customer,
			),
		)
	}

	return (
		<div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
			<main className="my-10 w-full md:max-w-2xl">
				<h1 className="text-4xl font-medium text-white">Clientes</h1>

				<CustomerForm onCreate={handleCreate} />

				<section aria-label="Lista de clientes">
					<CustomerList
						customers={customers}
						isLoading={isLoading}
						error={loadError}
						onRetry={() => void loadCustomers()}
						onDelete={handleDelete}
						onUpdateEmail={handleUpdateEmail}
					/>
				</section>
			</main>
		</div>
	)
}
