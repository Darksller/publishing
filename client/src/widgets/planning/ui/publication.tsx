import type { Publication as PubType } from '@/entities/publication'
import { remove } from '@/entities/publication/model/publicationSlice'
import { fromDbSelector } from '@/features/add-note/model/selectors'
import { AddPubButton } from '@/features/add-note/ui/add-button'
import { getQuarter } from '@/shared/lib/time'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { ConfirmDialog } from '@/shared/ui/confirm'
import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons'
import { useDispatch, useSelector } from 'react-redux'

type PublicationProps = {
	data: PubType
	className?: string | boolean
}

export const Publication = ({ data, className }: PublicationProps) => {
	const dispatch = useDispatch()
	const onRemove = () => {
		dispatch(remove(data.dateAdded))
	}
	const fromDb = useSelector(fromDbSelector)

	return (
		<div
			className={cn(
				'p-2 grid grid-cols-16 gap-1 h-full',
				className,
				fromDb && 'grid-cols-15'
			)}
		>
			<div className='border-2 shadow-md p-2 flex break-all	'>
				{data.pubType}
			</div>
			<div className='border-2 shadow-md p-2 col-span-2 break-all'>
				{data.authors.map(item => (
					<div key={item}>{item}</div>
				))}
			</div>
			<div className='border-2 shadow-md p-2 flex col-span-2 break-all'>
				{data.name}
			</div>
			<div className='border-2 shadow-md p-2 flex col-span-2 break-all'>
				{data.pubSubType}
			</div>
			<div className='border-2 shadow-md p-2 flex col-span-2'>
				{data.speciality}
			</div>
			<div className='border-2 shadow-md p-2 flex break-all col-span-2'>
				{data.educationForm}
			</div>
			<div className='border-2 shadow-md p-2 flex break-all'>
				{data.plannedAmount}
			</div>
			<div className='border-2 shadow-md p-2 flex break-all'>{data.copies}</div>
			<div className='border-2 shadow-md p-2 flex break-all col-span-2'>
				{getQuarter(data.plannedDueDate)}
			</div>
			{!fromDb && (
				<div className='flex justify-center items-center flex-col gap-2 border-2 shadow-md p-2'>
					<AddPubButton
						content={
							<div className='border-secondary border bg-secondary group hover:bg-primary p-2 rounded-3xl'>
								<Pencil1Icon className='size-5 text-primary group-hover:text-secondary' />
							</div>
						}
						department={data.department}
						publication={data}
					/>
					<ConfirmDialog
						trigger={
							<Button
								size={'icon'}
								className='border-secondary border bg-secondary group'
							>
								<Cross1Icon className='size-5 text-primary group-hover:text-secondary' />
							</Button>
						}
						onClick={onRemove}
						desc={'Вы уверены что хотите убрать запись?'}
					/>
				</div>
			)}
		</div>
	)
}
