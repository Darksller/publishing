import { Header } from '@/widgets/header'
import { Outlet } from '@tanstack/react-router'
import Headroom from 'react-headroom'

export const Root = () => {
	return (
		<div className='font-inter'>
			<Headroom className='mt-1'>
				<Header />
			</Headroom>
			<Outlet />
		</div>
	)
}
