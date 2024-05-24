import { api } from '@/shared/api'
import { Editor } from '../types'

export const editorApi = api.injectEndpoints({
	endpoints: build => ({
		getAllEditors: build.query<Editor[], void>({
			query: () => `/editor/getAll`,
		}),
	}),
})

export const { useGetAllEditorsQuery } = editorApi
