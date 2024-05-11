import { prisma } from '../../prisma'

export const createToken = async (token: string, userId: number) => {
	return await prisma.token.create({
		data: { refreshToken: token, userId: userId },
	})
}

export const updateToken = async (token: string, userId: number) => {
	return await prisma.token.update({
		where: { userId: userId },
		data: { refreshToken: token },
	})
}
