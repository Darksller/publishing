import { logout } from '@/entities/viewer'
import { Button } from '@/shared/ui'
import { useDispatch } from 'react-redux'

export const SignOutButton = () => {
	const dispatch = useDispatch()
	return (
		<Button variant={'ghost'} onClick={() => dispatch(logout())}>
			Выход
		</Button>
	)
}
