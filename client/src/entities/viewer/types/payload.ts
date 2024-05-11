import { Role } from '@/entities/role/types/role.type'

export type ViewerPayload = {
	id: string
	email: string
	role: Role
}

export type TokenPayload = {
	accessToken: string
	refreshToken: string
}
