import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui'
import { useGetAllPubTypeQuery } from '../api'

type Props = {
	onValueChange: (value: string) => void
	defaultValue: string
}

export const PubTypeSelect = ({ onValueChange, defaultValue }: Props) => {
	const { data } = useGetAllPubTypeQuery()
	return (
		<Select onValueChange={onValueChange} defaultValue={defaultValue}>
			<SelectTrigger className='text-md rounded-none'>
				<SelectValue placeholder='Выберите тип издания' />
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
