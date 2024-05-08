import { RootState } from '@/app/store'
import { Header } from '@/widgets/header'
import { Outlet } from '@tanstack/react-router'
import Headroom from 'react-headroom'
import { useDispatch, useSelector } from 'react-redux'
import { GuestPage } from '../../guest'
import { useEffect } from 'react'
import { useLazyFetchMeQuery } from '@/entities/viewer'
import { signIn, setViewer } from '@/entities/viewer'

export const Root = () => {
	const { viewer } = useSelector((state: RootState) => state)
	const [fetchMe] = useLazyFetchMeQuery()
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchMeAsync = async () => {
			try {
				const response = await fetchMe().unwrap()
				dispatch(
					signIn({
						refreshToken: response.refreshToken,
						accessToken: response.accessToken,
					})
				)
				dispatch(setViewer({ user: response.viewer }))
			} catch (error) {
				console.log(error)
			}
		}
		fetchMeAsync()
	}, [])

	if (!viewer.isAuthenticated) return <GuestPage />
	return (
		<div className='font-inter'>
			<Headroom className='mt-1'>
				<Header />
			</Headroom>
			<Outlet />
		</div>
	)
}
