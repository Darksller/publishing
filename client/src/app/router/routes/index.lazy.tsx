import { Plans } from '@/pages/plans'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
	component: Plans,
})
