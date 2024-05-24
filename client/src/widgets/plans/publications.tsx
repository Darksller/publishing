import { RootState } from '@/app/store'
import { publicationsByDepartmentSelector } from '@/features/planning/department'
import { useSelector } from 'react-redux'
import { Publication } from './publication'

type DepartmentProps = {
	name: string
}

export const Publications = ({ name }: DepartmentProps) => {
	const publications = useSelector((state: RootState) =>
		publicationsByDepartmentSelector(state, name)
	)
	return (
		<div className='flex flex-col gap-4 '>
			{publications.map((item, index) => (
				<Publication key={index} data={item} />
			))}
		</div>
	)
}
