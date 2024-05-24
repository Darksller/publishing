import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui'
import { useGetAllYearsQuery, useLazyGetByYearQuery } from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { getUniqueYears, handleValueChange } from '../model/utils'
import { useMemo } from 'react'

type YearSelectProps = {
	toAdd?: boolean
}

export const YearSelect = ({ toAdd = true }: YearSelectProps) => {
	const { data } = useGetAllYearsQuery()
	const [getPublications] = useLazyGetByYearQuery()
	const dispatch = useDispatch()
	const year = useSelector((state: RootState) => state.publication.year)

	const uniqueYears = useMemo(
		() => getUniqueYears(data || [], toAdd, dispatch, getPublications),
		[data, toAdd, dispatch, getPublications]
	)

	return (
		<Select
			onValueChange={event =>
				handleValueChange(event, getPublications, dispatch)
			}
			value={year?.toString()}
		>
			<SelectTrigger className='w-[200px] text-md'>
				<SelectValue placeholder='Выберите год' />
			</SelectTrigger>
			<SelectContent className='px-1 py-1'>
				{Array.from(uniqueYears).map(year => (
					<SelectItem key={year} value={year.toString()} className='text-md'>
						{year}/{year + 1}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
