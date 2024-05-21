import { createSlice } from '@reduxjs/toolkit'
import { Publication } from '../types'
import { FacultiesPayload } from '../types/facultiesPayload'

export type viewerStateType = {
	fromDb: boolean
	year: number | null
	faculties: FacultiesPayload[]
	publications: Publication[]
}

const initialState: viewerStateType = {
	fromDb: false,
	year: null,
	publications: [],
	faculties: [],
}

const publicationSlice = createSlice({
	name: 'publication',
	initialState,
	reducers: {
		add: (state, action: { payload: Publication }) => {
			state.publications.push(action.payload)
		},
		remove: (state, action: { payload: string }) => {
			const index = state.publications.findIndex(
				pub => pub.dateAdded === action.payload
			)
			if (index !== -1) {
				state.publications.splice(index, 1)
			}
		},
		update: (
			state,
			action: { payload: { key: string; data: Publication } }
		) => {
			const index = state.publications.findIndex(
				pub => pub.dateAdded === action.payload.key
			)
			if (index !== -1) {
				state.publications[index] = action.payload.data
			}
		},
		setYear: (state, action: { payload: number }) => {
			state.year = action.payload
		},
		addFaculty: (state, action: { payload: string }) => {
			state.faculties.push({ name: action.payload, departments: [] })
		},
		removeFaculty: (state, action: { payload: string }) => {
			const index = state.faculties.findIndex(
				item => item.name === action.payload
			)
			if (index !== -1) {
				state.faculties.splice(index, 1)
			}
		},
		addDepartment: (
			state,
			action: { payload: { faculty: string; department: string } }
		) => {
			state.faculties
				.filter(item => item.name === action.payload.faculty)[0]
				.departments.push(action.payload.department)
		},
		removeDepartment: (state, action: { payload: string }) => {
			const updatedFaculties = state.faculties.map(faculty => {
				const updatedDepartments = faculty.departments.filter(
					department => department !== action.payload
				)
				return { ...faculty, departments: updatedDepartments }
			})
			return { ...state, faculties: updatedFaculties }
		},
		clear: state => {
			state.faculties = []
			state.fromDb = false
			state.publications = []
		},
		set: (
			state,
			action: {
				payload: { faculties: FacultiesPayload[]; publications: Publication[] }
			}
		) => {
			state.faculties = action.payload.faculties
			state.fromDb = true
			state.publications = action.payload.publications
		},
	},
})

export const {
	set,
	add,
	clear,
	remove,
	update,
	setYear,
	addFaculty,
	removeFaculty,
	addDepartment,
	removeDepartment,
} = publicationSlice.actions
export const publicationReducer = publicationSlice.reducer
