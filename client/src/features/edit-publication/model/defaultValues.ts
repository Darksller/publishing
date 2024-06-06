import { Publication } from '@/entities/publication'

export const defaultValues = (publication?: Publication) => ({
	id: publication?.id,
	plannedAmount: publication?.plannedAmount || 0,
	plannedDueDate: publication?.plannedDueDate || '',
	actualAmount: publication?.actualAmount,
	actualDueDate: publication?.actualDueDate,
	mark: publication?.mark,
	editor: publication?.edit?.editor,
	startDate: publication?.edit?.startDate,
	finishDate: publication?.edit?.startDate,
	signatureDate: publication?.signatureDate,
	releaseDate: publication?.releaseDate,
	transferDate: publication?.transferDate,
	notes: publication?.notes || [],
})
