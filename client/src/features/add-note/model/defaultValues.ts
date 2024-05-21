import { Publication } from '@/entities/publication/types'
import { formatDateWithTime } from '@/shared/lib/time'

export const defaultValues = (
	department: string,
	publication?: Publication
) => ({
	name: publication?.name || '',
	pubType: publication?.pubType || '',
	pubSubType: publication?.pubSubType || '',
	speciality: publication?.speciality || '',
	educationForm: publication?.educationForm || '',
	plannedAmount: publication?.plannedAmount || 0,
	plannedDueDate: publication?.plannedDueDate || '',
	authors: publication?.authors || [],
	department: department,
	dateAdded: publication?.dateAdded || formatDateWithTime(new Date()),
})
