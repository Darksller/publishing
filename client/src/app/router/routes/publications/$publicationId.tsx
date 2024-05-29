import { PublicationPage } from '@/pages/publication'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/publications/$publicationId')({
	component: PublicationPage,
})
