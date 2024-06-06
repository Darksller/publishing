import { getAllRepository } from '../repositories/editor.repository'

export const getAllService = async () => {
	return await getAllRepository()
}
