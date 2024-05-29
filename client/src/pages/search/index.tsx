import { Route } from '@/app/router/routes/search/$searchText'
import { Publication } from '@/entities/publication'
import { useLazyGetSearchQuery } from '@/features/search/api'
import { Loading } from '@/shared/ui/loading'
import { SearchResultItem } from '@/widgets/search/ui/search-result-item'
import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const SearchPage = () => {
	const [data, setData] = useState<Publication[]>()
	const { searchText } = Route.useParams()
	const [get] = useLazyGetSearchQuery()
	console.log('loh')
	useEffect(() => {
		const fetch = async () => {
			const response = await get(searchText).unwrap()
			setData(response)
		}
		fetch()
	}, [searchText])

	if (!data) return <Loading />

	return (
		<div className='flex flex-col gap-4'>
			<div className='m-auto tracking-widest text-3xl '>Поиск</div>
			{data.length === 0 && (
				<div className='m-auto tracking-widest text-3xl'>
					Ничего не найдено по запросу "{searchText}"
				</div>
			)}
			{data.map(item => (
				<Link
					to={`/publications/${item.id}`}
					key={item.id}
					className=' hover:scale-105 transition-all duration-500'
				>
					<SearchResultItem data={item} />
				</Link>
			))}
		</div>
	)
}
