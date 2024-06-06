import { getAllSpecialities } from '../repositories/speciality.repository'

export const getAllService = async () => {
	return await getAllSpecialities()
}
