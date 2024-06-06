import { getAllFaculties } from '../repositories/faculty.repository'

export const getAllService = async () => {
	return await getAllFaculties()
}
