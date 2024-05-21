import { SuccessPage } from '@/pages/success'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/success')({
	component: SuccessPage,
})
