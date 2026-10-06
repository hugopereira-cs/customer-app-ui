import { useState } from 'react'
import { BiSolidXSquare } from 'react-icons/bi'
import { FaCheck } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'
import { FiTrash } from 'react-icons/fi'
import type { Customer } from '../types/customer'

interface CustomerCardProps {
	customer: Customer
	onDelete: (id: string) => Promise<void>
	onUpdateEmail: (id: string, email: string) => Promise<void>
}

export function CustomerCard({
	customer,
	onDelete,
	onUpdateEmail,
}: CustomerCardProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [email, setEmail] = useState(customer.email)
	const [isSaving, setIsSaving] = useState(false)
	const [error, setError] = useState('')

	function cancelEditing() {
		setEmail(customer.email)
		setError('')
		setIsEditing(false)
	}

	async function saveEmail() {
		const updatedEmail = email.trim()
		if (!updatedEmail) return

		setIsSaving(true)
		setError('')
		try {
			await onUpdateEmail(customer.id, updatedEmail)
			setIsEditing(false)
		} catch (saveError) {
			console.error('Não foi possível atualizar o email:', saveError)
			setError('Não foi possível atualizar o email. Tente novamente.')
		} finally {
			setIsSaving(false)
		}
	}

	return (
		<article className="w-full bg-white rounded p-2 relative hover:scale-105 duration-350">
			<p>
				<span className="font-medium">Nome:</span> {customer.name}
			</p>

			{isEditing ? (
				<div className="flex gap-1">
					<label className="sr-only" htmlFor={`email-${customer.id}`}>
						Email de {customer.name}
					</label>
					<input
						id={`email-${customer.id}`}
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						className="border-b border-green-400 focus:border-green-600 focus:outline-none"
					/>
					<button
						type="button"
						aria-label="Salvar email"
						disabled={isSaving}
						onClick={saveEmail}
					>
						<FaCheck color="#15803D" className="hover:scale-105 duration-350" />
					</button>
					<button
						type="button"
						aria-label="Cancelar edição"
						disabled={isSaving}
						onClick={cancelEditing}
					>
						<BiSolidXSquare
							color="#B91C1C"
							className="hover:scale-105 duration-350"
						/>
					</button>
				</div>
			) : (
				<p>
					<span className="font-medium">Email:</span> {customer.email}
				</p>
			)}

			{error && (
				<p role="alert" className="text-red-700">
					{error}
				</p>
			)}

			<p>
				<span className="font-medium">Status:</span>{' '}
				{customer.status ? 'ATIVO' : 'INATIVO'}
			</p>

			<button
				type="button"
				aria-label={`Excluir ${customer.name}`}
				className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
				onClick={() => onDelete(customer.id)}
			>
				<FiTrash
					size={18}
					color="#fff"
					className="hover:scale-105 duration-350"
				/>
			</button>
			{!isEditing && (
				<button
					type="button"
					aria-label={`Editar email de ${customer.name}`}
					className="bg-transparent w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 top-7"
					onClick={() => setIsEditing(true)}
				>
					<FaPencil
						size={18}
						color="#000"
						className="hover:scale-105 duration-350"
					/>
				</button>
			)}
		</article>
	)
}
