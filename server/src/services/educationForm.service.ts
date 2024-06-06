import { getAllRepository } from '../repositories/educationForm.repository'

export const getAllService = async () => {
	return await getAllRepository()
}
