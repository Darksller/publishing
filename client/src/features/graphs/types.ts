export type Line = {
	labels: string[]
	datasets: { label: string; data: number[]; borderColor?: string }[]
}

export type Pie = {
	labels: string[]
	datasets: {
		label: string
		data: number[]
		backgroundColor?: string[]
		hoverOffset: number
	}[]
}
