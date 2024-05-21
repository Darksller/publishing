import { DepartmentSelect } from '@/entities/department/'
import { Button } from '@/shared/ui'
import { ConfirmDialog } from '@/shared/ui/confirm'
import {
	ChevronDownIcon,
	ChevronUpIcon,
	Cross1Icon,
} from '@radix-ui/react-icons'
import { useState } from 'react'
import { Department } from './department'
import { useDepartment } from '@/features/planning/department'
import { useFaculty } from '@/features/planning/faculty'
import { useSelector } from 'react-redux'
import { fromDbSelector } from '@/features/add-note/model/selectors'
import { cn } from '@/shared/lib/utils'

type FacultyProps = {
	name: string
}

export const Faculty = ({ name }: FacultyProps) => {
	const [isOpen, setIsOpen] = useState(true)
	const fromDb = useSelector(fromDbSelector)
	const {
		department,
		departments,
		handleAddDepartment,
		handleRemoveDepartment,
		handleSetDepartment,
	} = useDepartment(name)
	const { handleRemoveFaculty } = useFaculty()
	return (
		<div className='border-2 px-4 py-4 shadow-md flex flex-col justify-center gap-4 border-black dark:border-white'>
			<div className='flex justify-between items-center'>
				<div className='border-2 px-4 py-4 shadow-md items-center justify-center'>
					<Button size={'icon'} onClick={() => setIsOpen(!isOpen)}>
						{isOpen ? (
							<ChevronDownIcon className='size-6' />
						) : (
							<ChevronUpIcon className='size-6' />
						)}
					</Button>
				</div>
				<div className='border-2 px-4 py-4 shadow-md flex items-center uppercase font-bold tracking-wide w-full mx-4'>
					<div className='flex-grow text-center text-xl'>{name}</div>
				</div>
				<div
					className={cn(
						'border-2  px-4 py-4 shadow-md items-center justify-center',
						fromDb && 'hidden'
					)}
				>
					<ConfirmDialog
						trigger={
							<Button size={'icon'}>
								<Cross1Icon className='size-6' />
							</Button>
						}
						onClick={() => handleRemoveFaculty(name)}
						desc={'Вы уверены что хотите убрать факультет?'}
					/>
				</div>
			</div>

			{isOpen && (
				<div className='flex flex-col gap-4'>
					<div className={cn('flex gap-4', fromDb && 'hidden')}>
						<div className='border-2 px-4 py-4 shadow-md'>
							<Button disabled={!department} onClick={handleAddDepartment}>
								Добавить кафедру
							</Button>
						</div>
						<div className='border-2 px-4 py-4 shadow-md w-full'>
							<DepartmentSelect
								faculty={name}
								onValueChange={handleSetDepartment}
								defaultValue={department}
							/>
						</div>
					</div>

					{departments.map((depName, index) => (
						<Department
							key={index}
							name={depName}
							onRemove={handleRemoveDepartment}
						/>
					))}
				</div>
			)}
		</div>
	)
}
