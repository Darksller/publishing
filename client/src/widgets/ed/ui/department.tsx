import { Button } from '@/shared/ui'
import { ConfirmDialog } from '@/shared/ui/confirm'
import {
	ChevronDownIcon,
	ChevronUpIcon,
	Cross1Icon,
	GearIcon,
	PlusIcon,
} from '@radix-ui/react-icons'
import { useState } from 'react'
import { AddPubButton } from '@/features/add-note/ui/add-button'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { Publication } from './publication'
import { fromDbSelector } from '@/features/add-note/model/selectors'
import { cn } from '@/shared/lib/utils'

type DepartmentProps = {
	name: string
	onRemove: (name: string) => void
}

export const Department = ({ name, onRemove }: DepartmentProps) => {
	const [isOpen, setIsOpen] = useState(true)
	const publications = useSelector((state: RootState) =>
		state.publication.publications.filter(item => item.department === name)
	)
	const fromDb = useSelector(fromDbSelector)
	return (
		<div className='border-2 px-4 py-4 shadow-md flex flex-col justify-center gap-4'>
			<div className='flex justify-between items-center gap-4'>
				<div className='border-2 px-4 py-4 shadow-md items-center justify-center'>
					<Button size={'icon'} onClick={() => setIsOpen(!isOpen)}>
						{isOpen ? (
							<ChevronDownIcon className='size-6' />
						) : (
							<ChevronUpIcon className='size-6' />
						)}
					</Button>
				</div>
				{isOpen && !fromDb && (
					<div className='flex gap-4'>
						<AddPubButton
							content={
								<div className='border-2 px-4 py-4 shadow-md items-center flex justify-center w-fit'>
									<div className='bg-primary p-1 rounded-3xl'>
										<PlusIcon className='size-6 text-secondary' />
									</div>
								</div>
							}
							department={name}
						/>
					</div>
				)}
				<div className='border-2 px-4 py-4 shadow-md flex items-center uppercase font-bold tracking-wide text-lg w-full mx-4'>
					<div className='flex-grow text-center'>Кафедра {name}</div>
				</div>
				{!fromDb && (
					<div className='border-2  px-4 py-4 shadow-md items-center justify-center'>
						<ConfirmDialog
							trigger={
								<Button size={'icon'}>
									<Cross1Icon className='size-6' />
								</Button>
							}
							onClick={() => onRemove(name)}
							desc={'Вы уверены что хотите убрать кафедру?'}
						/>
					</div>
				)}
			</div>

			<div className={cn('flex flex-col', !isOpen && 'hidden')}>
				<div
					className={cn(
						'p-2 grid grid-cols-16 gap-1 h-full border-b-2 border-primary',
						fromDb && 'grid-cols-15'
					)}
				>
					<div className='border-2 shadow-md p-2 flex break-all	'>
						Тип издания
					</div>
					<div className='border-2 shadow-md p-2 flex col-span-2 break-all'>
						Авторы
					</div>

					<div className='border-2 shadow-md p-2 flex col-span-2'>
						Полное наименование издания
					</div>
					<div className='border-2 shadow-md p-2 flex break-all col-span-3'>
						Вид издания
					</div>
					<div className='border-2 shadow-md p-2 flex break-all col-span-2'>
						Специальность
					</div>
					<div className='border-2 shadow-md p-2 col-span-2 break-all'>
						Форма обучения
					</div>
					<div className='border-2 shadow-md p-2 flex break-all '>
						Объем у.и.л
					</div>
					<div className='border-2 shadow-md p-2 flex col-span-2 break-all'>
						Срок сдачи
					</div>
					{!fromDb && (
						<div className='flex justify-center items-center flex-col gap-2 border-2 shadow-md p-2'>
							<GearIcon className='size-8' />
						</div>
					)}
				</div>

				{publications.map((pub, index) => (
					<Publication key={index} data={pub} />
				))}
			</div>
		</div>
	)
}
