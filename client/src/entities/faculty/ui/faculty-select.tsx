import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui'
import { useGetFacultiesQuery } from '../api/facultyApi'

type FacultySelectProps = {
	onValueChange: (value: string) => void
	defaultValue: string
	disabled?: boolean
}
export const FacultySelect = ({
	onValueChange,
	defaultValue,
	disabled,
}: FacultySelectProps) => {
	const { data } = useGetFacultiesQuery()
	return (
		<Select
			onValueChange={onValueChange}
			defaultValue={defaultValue}
			disabled={disabled}
		>
			<SelectTrigger className='text-md'>
				<SelectValue placeholder='Выберите факультет' />
			</SelectTrigger>
			<SelectContent className='px-1 py-1 text-md'>
				{data?.map(role => (
					<SelectItem key={role.name} value={role.name} className='text-md'>
						{role.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
