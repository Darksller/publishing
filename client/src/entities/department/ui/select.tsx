import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui'
import { useGetDepartmentByFacultyQuery } from '../api/index'

type DepartmentSelectProps = {
	onValueChange: (value: string) => void
	defaultValue: string
	faculty: string
}
export const DepartmentSelect = ({
	onValueChange,
	defaultValue,
	faculty,
}: DepartmentSelectProps) => {
	const { data } = useGetDepartmentByFacultyQuery(faculty)
	return (
		<Select onValueChange={onValueChange} defaultValue={defaultValue}>
			<SelectTrigger>
				<SelectValue placeholder='Выберите кафедру' />
			</SelectTrigger>
			<SelectContent className='px-1 py-1'>
				{data?.map(role => (
					<SelectItem key={role.id} value={role.name}>
						{role.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
