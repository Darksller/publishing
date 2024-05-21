import { api } from '@/shared/api'
import { Speciality as EducationForm } from '../types'

export const educationFormApi = api.injectEndpoints({
	endpoints: build => ({
		getAllEducationForm: build.query<EducationForm[], void>({
			query: () => `/educationForm/getAll`,
		}),
	}),
})

export const { useGetAllEducationFormQuery } = educationFormApi
