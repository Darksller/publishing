import { useGetLineQuery } from './api'
import { Line } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Loading } from '@/shared/ui/loading'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

export const LineChart = () => {
	const { data } = useGetLineQuery()
	if (!data) return <Loading />
	return <Line data={data} />
}
