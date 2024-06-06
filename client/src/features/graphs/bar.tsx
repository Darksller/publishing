import { Bar } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
} from 'chart.js'
import { Pie } from './types'

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement)

type Props = {
	data: Pie
}

export const BarChart = ({ data }: Props) => {
	return <Bar data={data} />
}
