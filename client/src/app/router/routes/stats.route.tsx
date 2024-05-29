import { Stats } from '@/pages/stats'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stats')({
	component: Stats,
})
