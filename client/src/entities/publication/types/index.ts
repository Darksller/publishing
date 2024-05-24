export type Publication = {
	id?: number
	name: string
	pubType: string
	pubSubType: string
	speciality: string
	educationForm: string
	authors: string[]
	plannedAmount: number
	actualAmount?: number
	plannedDueDate: string
	actualDueDate?: string
	department: string
	dateAdded: string
	copies: number
	mark?: string
	signatureDate?: string
	releaseDate?: string
	transferDate?: string
	edit?: { editor: string; startDate: string; finishDate: string }
	notes?: string[]
}
