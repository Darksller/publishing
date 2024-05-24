import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui'
import { useGetAllMarksQuery } from '../api'

type Props = {
	onValueChange: (value: string) => void
}

export const MarkSelect = ({ onValueChange }: Props) => {
	const { data } = useGetAllMarksQuery()
	return (
		<Select onValueChange={onValueChange}>
			<SelectTrigger className='text-md rounded-none'>
				<SelectValue placeholder='Выберите гриф' />
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
