import { getAllRepository } from '../repositories/mark.repository'

export const getAllService = async () => {
	return await getAllRepository()
}
