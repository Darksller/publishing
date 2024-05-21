export type User = {
	id: number
	email: string
	name: string
	password: string
	phoneNumber: string
	lastLoginDate?: string
	createdAt: string
	role: {
		id: number
		name: string
	}
	faculty?: {
		id: number
		name: string
	}
}
