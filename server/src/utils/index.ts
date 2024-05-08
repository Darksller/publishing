import bcrypt from 'bcrypt'

export const generateSalt = async () => await bcrypt.genSalt()

export const generatePasswordHash = async (data: string): Promise<string> => {
	const salt = await bcrypt.genSalt()
	return bcrypt.hash(data, salt)
}

export const compare = async (
	data: string,
	encrypted: string
): Promise<boolean> => {
	return await bcrypt.compare(data, encrypted)
}
