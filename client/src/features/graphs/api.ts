import { api } from '@/shared/api'
import { Line, Pie } from './types'

export const graphApi = api.injectEndpoints({
	endpoints: build => ({
		getLine: build.query<Line, void>({
			query: () => '/mark/line',
		}),
		getPie: build.query<Pie, void>({
			query: () => '/mark/pie',
		}),
		getBar: build.query<Pie, void>({
			query: () => '/mark/bar',
		}),
	}),
})

export const { useGetLineQuery, useGetPieQuery, useGetBarQuery } = graphApi
