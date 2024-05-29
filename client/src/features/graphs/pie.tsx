import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js'
import { useGetPieQuery } from './api'
import { Loading } from '@/shared/ui/loading'

ChartJS.register(Tooltip, Legend, ArcElement)
export const PieChart = () => {
	const { data } = useGetPieQuery()
	if (!data) return <Loading />
	return <Pie data={data} className='max-w-[600px] max-h-[600px]' />
}
