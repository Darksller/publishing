import { Plans } from '@/pages/plans'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/plans')({
	component: Plans,
})
