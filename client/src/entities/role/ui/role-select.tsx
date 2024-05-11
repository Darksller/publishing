import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui'
import { useGetRolesQuery } from '../api/roleApi'

type RoleSelectProps = {
	onValueChange: () => void
	defaultValue: string
}
export const RoleSelect = ({
	onValueChange,
	defaultValue,
}: RoleSelectProps) => {
	const { data } = useGetRolesQuery()
	return (
		<Select onValueChange={onValueChange} defaultValue={defaultValue}>
			<SelectTrigger>
				<SelectValue placeholder='Выберите роль' />
			</SelectTrigger>
			<SelectContent>
				{data?.map(role => (
					<SelectItem key={role.id} value={role.name}>
						{role.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
