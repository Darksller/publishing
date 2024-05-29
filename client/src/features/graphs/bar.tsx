import { Bar } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
} from 'chart.js'
import { useGetBarQuery } from './api'
import { Loading } from '@/shared/ui/loading'

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement)
export const BarChart = () => {
	const { data } = useGetBarQuery()
	if (!data) return <Loading />
	return <Bar data={data} />
}
