export type PublicationDto = {
	name: string
	pubType: string
	pubSubType: string
	speciality: string
	educationForm: string
	authors: string[]
	plannedAmount: number
	plannedDueDate: string
	department: string
	dateAdded: string
	copies: number
}

export type PublicationUpdateDto = {
	id: number
	plannedAmount: number
	actualAmount?: number
	plannedDueDate: string
	actualDueDate: string | null
	mark?: string | null
	editor?: string
	startDate?: string | null
	finishDate?: string | null
	signatureDate?: string | null
	releaseDate?: string | null
	transferDate?: string | null
	notes?: string[]
}
