import { columns } from '../../../entities/user/ui/columns'
import { DataTable } from '@/entities/user/ui/userDataTable'
import { useGetUsersQuery } from '@/entities/user'
import { Loading } from '@/shared/ui/loading'

export const UserTable = () => {
	const { data, isLoading } = useGetUsersQuery()

	return !isLoading ? (
		<div>
			{data && (
				<div className='flex flex-col gap-2 border rounded-2xl pt-2'>
					<div className='mx-auto font-bold bg-primary px-4 py-1 rounded-2xl text-secondary'>
						Пользователи
					</div>
					<DataTable columns={columns} data={data} />
				</div>
			)}
		</div>
	) : (
		<Loading />
	)
}
