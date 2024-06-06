import express from 'express'
import {
	addNewDepartments,
	getDepartmentsByFaculty,
} from '../repositories/department.repository'

export const getByFacultyName = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { faculty } = req.params
		const departments = await getDepartmentsByFaculty(faculty)
		return res.status(200).json(departments).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
