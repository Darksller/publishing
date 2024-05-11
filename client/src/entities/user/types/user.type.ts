export type User = {
	id: number
	email: string
	name: string
	password: string
	phoneNumber: string
	lastLoginDate?: string
	createdAt: string
	role:
		| string
		| {
				id: number
				name: string
		  }
}
