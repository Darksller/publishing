import { prisma } from '../../prisma'

export const getRoleByName = async (name: string) => {
	return await prisma.role.findFirst({ where: { name } })
}
