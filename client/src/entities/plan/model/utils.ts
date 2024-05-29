import { useDispatch } from 'react-redux'
import { useLazyGetByYearQuery } from '../api'
import { clear, set, setYear } from '@/entities/publication'

export const getUniqueYears = (
	data: number[],
	toAdd: boolean,
	dispatch: ReturnType<typeof useDispatch>,
	getPublications: ReturnType<typeof useLazyGetByYearQuery>[0]
) => {
	const uniqueYears = new Set(data)
	const currentYear = new Date().getFullYear()

	if (toAdd) {
		uniqueYears.add(currentYear)
		const lastYear = Math.max(...Array.from(uniqueYears))
		const yearAfterLast = lastYear + 1
		uniqueYears.add(yearAfterLast)
	}

	if (Math.max(...Array.from(uniqueYears)) !== -Infinity)
		handleValueChange(
			Math.max(...Array.from(uniqueYears)).toString(),
			getPublications,
			dispatch
		)

	return uniqueYears
}

export const handleValueChange = async (
	event: string,
	getPublications: ReturnType<typeof useLazyGetByYearQuery>[0],
	dispatch: ReturnType<typeof useDispatch>
) => {
	try {
		const response = await getPublications(event).unwrap()
		if (response) dispatch(set(response))
		else dispatch(clear())
		dispatch(setYear(Number(event)))
	} catch (error) {
		dispatch(clear())
	}
}
