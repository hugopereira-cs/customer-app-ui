import { useState, type SubmitEvent } from 'react'

interface CustomerFormProps {
	onCreate: (name: string, email: string) => Promise<void>
}

export function CustomerForm({ onCreate }: CustomerFormProps) {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [error, setError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault()
		setError('')

		const customerName = name.trim()
		const customerEmail = email.trim()

		if (!customerName || !customerEmail) return

		setIsSubmitting(true)
		try {
			await onCreate(customerName, customerEmail)
			setName('')
			setEmail('')
		} catch (submitError) {
			console.error('Não foi possível cadastrar o cliente:', submitError)
			setError('Não foi possível cadastrar o cliente. Tente novamente.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form className="flex flex-col my-6" onSubmit={handleSubmit}>
			<label htmlFor="customer-name" className="font-medium text-white">
				Nome:
			</label>
			<input
				id="customer-name"
				type="text"
				placeholder="Digite seu nome completo"
				className="w-full mb-5 p-2 rounded bg-white"
				value={name}
				onChange={(event) => setName(event.target.value)}
				required
			/>

			<label htmlFor="customer-email" className="font-medium text-white">
				Email
			</label>
			<input
				id="customer-email"
				type="email"
				placeholder="Digite seu email"
				className="w-full mb-5 p-2 rounded bg-white"
				value={email}
				onChange={(event) => setEmail(event.target.value)}
				required
			/>

			<button
				type="submit"
				disabled={isSubmitting}
				className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium hover:bg-green-600 disabled:opacity-60"
			>
				{isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
			</button>
			{error && (
				<p role="alert" className="mt-2 text-red-300">
					{error}
				</p>
			)}
		</form>
	)
}
