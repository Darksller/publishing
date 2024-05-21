import { logout } from '@/entities/viewer'
import { Button } from '@/shared/ui'
import { useNavigate } from '@tanstack/react-router'
import { useDispatch } from 'react-redux'

export const SignOutButton = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	return (
		<Button
			variant={'ghost'}
			onClick={() => {
				dispatch(logout())
				navigate({ to: '/' })
			}}
			className='hover:text-secondary hover:bg-primary duration-300'
		>
			Выход
		</Button>
	)
}
