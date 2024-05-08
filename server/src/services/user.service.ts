import { prisma } from '../../prisma'
import { UserDTO } from '../dto/user.dto'
import { generatePasswordHash } from '../utils'
import { getRoleByName } from './role.service'

export const getUserByEmail = async (email: string) => {
	return await prisma.user.findFirst({ where: { email: email } })
}

export const createUser = async (user: UserDTO) => {
	const hashPassword = await generatePasswordHash(user.password)
	const role = await getRoleByName(user.role.name)
	await prisma.user.create({
		data: {
			email: user.email,
			password: hashPassword,
			name: user.name,
			roleId: role!.id,
		},
	})
}
