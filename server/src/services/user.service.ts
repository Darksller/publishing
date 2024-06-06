import { getAllUsers } from '../repositories/user.repository'

export const getAllService = async () => {
	return await getAllUsers()
}
