import { useLazyGetLineQuery } from '@/features/graphs/api'
import { LineChart } from '@/features/graphs/line'
import { Line } from '@/features/graphs/types'
import { Loading } from '@/shared/ui/loading'
import { useEffect, useState } from 'react'

type LineProps = {
	faculty?: string
}

export const MarksChart = ({ faculty }: LineProps) => {
	const [get] = useLazyGetLineQuery()
	const [data, setData] = useState<Line>()
	useEffect(() => {
		const fetch = async () => {
			const response = await get(faculty ?? 'all')
			setData(response.data)
		}
		fetch()
	}, [faculty, get])
	if (!data) return <Loading />
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex justify-center'>
				Статистика изменения количества изданий с грифом
				{faculty ? ' по кафедрам факультета' : ' за все время'}
			</div>
			<div className='flex justify-center'>{faculty}</div>
			<LineChart data={data} />
		</div>
	)
}
