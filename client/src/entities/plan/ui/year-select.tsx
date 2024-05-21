import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui'
import { useGetAllYearsQuery, useLazyGetByYearQuery } from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { clear, set, setYear } from '@/entities/publication/'
import { RootState } from '@/app/store'

export const YearSelect = () => {
	const { data } = useGetAllYearsQuery()
	const [getPublications] = useLazyGetByYearQuery()
	const dispatch = useDispatch()
	const onValueChange = async (event: string) => {
		try {
			const response = await getPublications(event).unwrap()
			if (response) dispatch(set(response))
			else dispatch(clear())
			dispatch(setYear(Number(event)))
		} catch (error) {
			dispatch(clear())
		}
	}

	const year = useSelector((state: RootState) => state.publication.year)
	const currentYear = new Date().getFullYear()
	const nextYear = currentYear + 1
	const uniqueYears = new Set(
		data ? [...data, currentYear, nextYear] : [currentYear, nextYear]
	)

	const lastYear = Math.max(...Array.from(uniqueYears))
	const yearAfterLast = lastYear + 1
	uniqueYears.add(yearAfterLast)

	return (
		<Select onValueChange={onValueChange} value={year?.toString()}>
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
