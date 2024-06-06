import {
	useLazyGetBarDepartmentQuery,
	useLazyGetBarFacultyQuery,
} from '@/features/graphs/api'
import { BarChart } from '@/features/graphs/bar'
import { Pie } from '@/features/graphs/types'
import { Loading } from '@/shared/ui/loading'
import { useEffect, useState } from 'react'

type Props = {
	faculty?: string
	department?: string
}

export const AuthorsChart = ({ department, faculty }: Props) => {
	const [data, setData] = useState<Pie>()
	const [getFac] = useLazyGetBarFacultyQuery()
	const [getDep] = useLazyGetBarDepartmentQuery()

	useEffect(() => {
		const fetch = async () => {
			if (department) {
				const response = await getDep(department)
				setData(response.data)
			} else if (faculty) {
				const response = await getFac(faculty)
				setData(response.data)
			}
		}
		fetch()
	}, [department, faculty, getDep, getFac])

	if (!faculty)
		return (
			<div className='m-auto tracking-widest text-3xl'>
				Для отображения статистики выбери факультет.
			</div>
		)
	if (!data) return <Loading />
	if (data.labels.length === 0)
		return <div className='m-auto tracking-widest text-3xl'>Нет данных</div>
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex justify-center'>
				Статистика изменения количества изданий с грифом
				{department ? ' по кафедрам факультета' : ' за все время'}
			</div>
			<div className='flex justify-center'>{department}</div>
			<BarChart data={data} />
		</div>
	)
}
