import { User } from '@/entities/user'

export const defaultValues = (oldUser?: User) => ({
	id: oldUser?.id || 0,
	name: oldUser?.name || '',
	email: oldUser?.email || '',
	password: '',
	phoneNumber: oldUser?.phoneNumber || '',
	role:
		typeof oldUser?.role === 'string'
			? oldUser.role
			: oldUser?.role?.name || '',
})
