import { RootState } from '@/app/store'
import { Header } from '@/widgets/header'
import { Outlet } from '@tanstack/react-router'
import Headroom from 'react-headroom'
import { useDispatch, useSelector } from 'react-redux'
import { GuestPage } from '../guest'
import { useEffect } from 'react'
import { useLazyFetchMeQuery } from '@/entities/viewer'
import { signIn, setViewer } from '@/entities/viewer'
import { Toaster } from '@/shared/ui/toaster'
import { OverdueBar } from '@/widgets/sidebar/overdue/ui'

export const Root = () => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.viewer.isAuthenticated
	)
	const [fetchMe] = useLazyFetchMeQuery()
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchMeAsync = async () => {
			const response = await fetchMe().unwrap()
			dispatch(
				signIn({
					refreshToken: response.refreshToken,
					accessToken: response.accessToken,
				})
			)
			dispatch(setViewer({ user: response.viewer }))
		}
		fetchMeAsync()
	}, [])

	if (!isAuthenticated) return <GuestPage />
	return (
		<div className='font-inter flex flex-col min-h-screen '>
			<Headroom className='mt-1 '>
				<Header />
			</Headroom>
			<div className='flex flex-grow'>
				<OverdueBar />
				<div className='w-full mx-auto max-w-[1440px] rounded-2xl my-10 border px-4 py-4 shadow-lg dark:shadow-secondary flex-grow'>
					<Outlet />
				</div>
			</div>
			<Toaster />
		</div>
	)
}
