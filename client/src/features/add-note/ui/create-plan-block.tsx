import { YearSelect, useCreatePlan } from '@/entities/plan'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { useSelector } from 'react-redux'
import { fromDbSelector } from '../model/selectors'

export const CreatePlan = () => {
	const { publications, onCreateClick } = useCreatePlan()
	const fromDb = useSelector(fromDbSelector)
	return (
		<div className='border-2 px-4 py-4 shadow-md grid grid-cols-3 items-center'>
			<YearSelect />
			<div className='font-extrabold tracking-wider text-2xl m-auto'>
				Составление сводного плана
			</div>
			<Button
				disabled={!publications.length}
				className={cn('text-md w-fit ml-auto', fromDb && 'hidden')}
				onClick={onCreateClick}
			>
				Создать план
			</Button>
		</div>
	)
}
