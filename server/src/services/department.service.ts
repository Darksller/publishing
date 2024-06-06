import { getDepartmentsByFaculty } from '../repositories/department.repository'

export const getByFacultyNameService = async (name: string) => {
	return await getDepartmentsByFaculty(name)
}
