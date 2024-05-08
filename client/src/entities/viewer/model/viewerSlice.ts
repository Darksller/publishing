import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
	getAuthCookie,
	getRefreshCookie,
	removeAuthCookies,
	setAuthCookies,
} from './authUtils'
import { RootState } from '@/app/store'
import type { ViewerPayload } from '../types/payload'

type StateType = {
	isAuthenticated: boolean
	accessToken: string | undefined
	refreshToken: string | undefined
	user: ViewerPayload | null
}

const initialState: StateType = {
	isAuthenticated: !!getAuthCookie(),
	accessToken: getAuthCookie(),
	refreshToken: getRefreshCookie(),
	user: null,
}

const viewerSlice = createSlice({
	name: 'viewer',
	initialState,
	reducers: {
		logout: state => {
			removeAuthCookies()
			state.isAuthenticated = false
			state.refreshToken = ''
			state.accessToken = ''
			state.user = null
		},
		signIn(
			state,
			{
				payload,
			}: PayloadAction<{
				refreshToken: string
				accessToken: string
			}>
		) {
			setAuthCookies(payload.accessToken, payload.refreshToken)
			state.refreshToken = payload.refreshToken
			state.accessToken = payload.accessToken
			state.isAuthenticated = true
		},
		setViewer(
			state,
			{
				payload,
			}: PayloadAction<{
				user: ViewerPayload
			}>
		) {
			state.user = payload.user
		},
	},
})

export const { logout, signIn, setViewer } = viewerSlice.actions
export const viewerReducer = viewerSlice.reducer

export const selectIsAuthenticated = (state: RootState) =>
	state.viewer.isAuthenticated
