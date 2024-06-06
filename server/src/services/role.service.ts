import { getAllRoles } from '../repositories/role.repository'

export const getAllService = async () => {
	return await getAllRoles()
}
