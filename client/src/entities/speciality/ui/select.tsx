import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui'
import { useGetAllSpecialityQuery } from '../api'

type Props = {
	onValueChange: (value: string) => void
	defaultValue: string
}

export const SpecialitySelect = ({ onValueChange, defaultValue }: Props) => {
	const { data } = useGetAllSpecialityQuery()
	return (
		<Select onValueChange={onValueChange} defaultValue={defaultValue}>
			<SelectTrigger className='text-md rounded-none'>
				<SelectValue placeholder='Выберите специальность' />
			</SelectTrigger>
			<SelectContent className='px-1 py-1 rounded-none'>
				{data?.map(item => (
					<SelectItem key={item.id} value={item.name} className='text-md'>
						{item.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
