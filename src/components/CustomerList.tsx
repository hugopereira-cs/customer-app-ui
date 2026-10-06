import { CustomerCard } from './CustomerCard'
import type { Customer } from '../types/customer'

interface CustomerListProps {
	customers: Customer[]
	isLoading: boolean
	error: boolean
	onRetry: () => void
	onDelete: (id: string) => Promise<void>
	onUpdateEmail: (id: string, email: string) => Promise<void>
}

export function CustomerList({
	customers,
	isLoading,
	error,
	onRetry,
	onDelete,
	onUpdateEmail,
}: CustomerListProps) {
	if (isLoading) {
		return (
			<div className="flex justify-center py-8" role="status">
				<span className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-green-500" />
				<span className="sr-only">Carregando clientes...</span>
			</div>
		)
	}

	if (error) {
		return (
			<div role="alert" className="text-white">
				<p>Não foi possível carregar os clientes.</p>
				<button type="button" onClick={onRetry}>
					Tentar novamente
				</button>
			</div>
		)
	}

	if (customers.length === 0) {
		return <p className="text-white">Nenhum cliente cadastrado.</p>
	}

	return (
		<div className="flex flex-col gap-4">
			{customers.map((customer) => (
				<CustomerCard
					key={customer.id}
					customer={customer}
					onDelete={onDelete}
					onUpdateEmail={onUpdateEmail}
				/>
			))}
		</div>
	)
}
