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
	value?: string
	disabled?: boolean
}
export const FacultySelect = ({
	onValueChange,
	defaultValue,
	value,
	disabled,
}: FacultySelectProps) => {
	const { data } = useGetFacultiesQuery()
	return (
		<Select
			value={value}
			onValueChange={onValueChange}
			defaultValue={defaultValue}
			disabled={disabled}
		>
			<SelectTrigger>
				<SelectValue placeholder='Выберите факультет' />
			</SelectTrigger>
			<SelectContent className='px-1 py-1'>
				{data?.map(role => (
					<SelectItem key={role.name} value={role.name}>
						{role.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
