import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui'
import { useGetAllEditorsQuery } from '../api'

type Props = {
	onValueChange: (value: string) => void
}

export const EditorSelect = ({ onValueChange }: Props) => {
	const { data } = useGetAllEditorsQuery()
	return (
		<Select onValueChange={onValueChange}>
			<SelectTrigger className='text-md rounded-none'>
				<SelectValue placeholder='Выберите редактора' />
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
