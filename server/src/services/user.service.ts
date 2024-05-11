import { prisma } from '../../prisma'
import { UserDTO } from '../dto/user.dto'
import { generatePasswordHash } from '../utils'
import { getByNameRole } from './role.service'

export const getUserByEmail = async (email: string) => {
	return await prisma.user.findFirst({
		where: { email: email },
		include: { role: true, Token: true },
	})
}

export const createUser = async (user: UserDTO) => {
	const hashPassword = await generatePasswordHash(user.password)
	const role = await getByNameRole(user.role)
	return await prisma.user.create({
		data: {
			email: user.email,
			password: hashPassword,
			name: user.name,
			roleId: role!.id,
			phoneNumber: user.phoneNumber,
		},
		include: { role: true },
	})
}

export const updateUser = async (user: UserDTO) => {
	const hashPassword = await generatePasswordHash(user.password)
	const role = await getByNameRole(user.role)
	return await prisma.user.update({
		where: { id: user.id },
		data: {
			email: user.email,
			password: hashPassword,
			name: user.name,
			roleId: role!.id,
			phoneNumber: user.phoneNumber,
		},
		include: { role: true, Token: true },
	})
}
export const deleteUser = async (user: UserDTO) => {
	await prisma.user.delete({ where: { email: user.email } })
}

export const getAllUsers = async () => {
	return await prisma.user.findMany({ include: { role: true } })
}
