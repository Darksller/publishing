import { Cross1Icon } from '@radix-ui/react-icons'
import { User } from '../types/user.type'
import { useDeleteUserMutation } from '../api/userApi'
import { ConfirmDialog } from '@/shared/ui/confirm'

type DeleteButtonProps = {
	user: User
}
export const DeleteButton = ({ user }: DeleteButtonProps) => {
	const [deleteUser] = useDeleteUserMutation()
	const onClick = async () => {
		await deleteUser(user)
	}
	return (
		<ConfirmDialog
			trigger={
				<Cross1Icon className='text-destructive group-hover:text-white cursor-pointer hover:bg-destructive hover:text-white rounded-2xl' />
			}
			desc={'Вы уверены что хотите удалить этого пользователя?'}
			onClick={onClick}
		/>
	)
}
