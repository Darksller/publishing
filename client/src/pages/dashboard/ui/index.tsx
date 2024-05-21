import { RegButton } from '@/features/auth'
import { UserTable } from '@/widgets/users-table/ui'

export const Dashboard = () => {
	return (
		<div className='flex flex-col gap-4 '>
			<div className='mx-auto font-bold text-xl'>Менеджмент пользователей</div>
			<div className='ml-auto'>
				<RegButton
					className='border px-3 py-1 rounded-2xl border-primary hover:border-secondary hover:text-secondary hover:bg-primary duration-300'
					content={<div>Добавить пользователя</div>}
				/>
			</div>
			<UserTable />
		</div>
	)
}
