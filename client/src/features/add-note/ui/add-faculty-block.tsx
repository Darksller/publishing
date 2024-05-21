import { Button } from '@/shared/ui'
import { FacultySelect } from '@/entities/faculty/'
import { useFaculty } from '@/features/planning/faculty'
import { useCreatePlan } from '@/entities/plan/'
import { cn } from '@/shared/lib/utils'

type AddFacultyProps = {
	className?: string | boolean
}

export const AddFaculty = ({ className }: AddFacultyProps) => {
	const { faculty, handleAddFaculty, handleSetFaculty } = useFaculty()
	const { year } = useCreatePlan()

	return (
		<div className={cn('flex gap-4', className)}>
			<div className='border-2 px-4 py-4 shadow-md'>
				<Button
					disabled={!faculty}
					onClick={handleAddFaculty}
					className='text-md'
				>
					Добавить факультет
				</Button>
			</div>
			<div className='border-2 px-4 py-4 shadow-md w-full'>
				<FacultySelect
					onValueChange={handleSetFaculty}
					defaultValue={faculty}
					disabled={!year}
				/>
			</div>
		</div>
	)
}
