import { api } from '@/shared/api'
import { Speciality } from '../types'

export const specialityApi = api.injectEndpoints({
	endpoints: build => ({
		getAllSpeciality: build.query<Speciality[], void>({
			query: () => `/speciality/getAll`,
		}),
	}),
})

export const { useGetAllSpecialityQuery } = specialityApi
