import { Faculty } from '@/widgets/ed'
import { useFaculty } from '@/features/planning/faculty/'
import { AddFaculty } from '@/features/add-note/'
import { CreatePlan } from '@/features/add-note/ui/create-plan-block'
import { useSelector } from 'react-redux'
import { fromDbSelector } from '@/features/add-note/model/selectors'

export const Planning = () => {
	const { faculties } = useFaculty()
	const fromDb = useSelector(fromDbSelector)
	return (
		<div className='flex flex-col gap-4'>
			<CreatePlan />
			<AddFaculty className={fromDb && 'hidden'} />
			{faculties.map((faculty, index) => (
				<Faculty key={index} name={faculty.name} />
			))}
		</div>
	)
}
