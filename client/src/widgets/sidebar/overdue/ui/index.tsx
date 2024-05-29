import { useState } from 'react'
import { useGetOverdueAuthorsQuery } from '@/entities/author/api'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import {
	DownloadIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from '@radix-ui/react-icons'
import { useNavigate } from '@tanstack/react-router'
import { generatePDF } from '../model/utils'

export const OverdueBar = () => {
	const { data } = useGetOverdueAuthorsQuery()
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(true)

	const onClick = (id: string) => {
		navigate({
			to: '/publications/$publicationId',
			params: { publicationId: id },
		})
	}

	const toggleOpen = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className='fixed right-1 top-48'>
			<Button
				variant={'ghost'}
				className='rounded-md hover:bg-gray-200 group mb-2'
				onClick={toggleOpen}
				size={'icon'}
			>
				{isOpen ? (
					<ChevronUpIcon className='size-4 group-hover:text-primary' />
				) : (
					<ChevronDownIcon className='size-4 group-hover:text-primary' />
				)}
			</Button>
			<div
				className={cn(
					'border rounded-2xl overflow-hidden flex flex-col bg-white dark:bg-secondary transition-all duration-300 ease-in-out scrollbar-none',
					isOpen
						? 'w-56 max-h-[450px] overflow-y-scroll'
						: 'w-0 max-h-0 p-0 m-0'
				)}
				style={{ visibility: isOpen ? 'visible' : 'hidden' }}
			>
				<div className='flex px-2 py-1 justify-between font-bold border-b align-middle items-center'>
					Список должников
					<Button
						variant={'ghost'}
						className='rounded-md hover:bg-gray-200 group'
						onClick={() => data && generatePDF(data)}
						size={'icon'}
					>
						<DownloadIcon className='size-4 group-hover:text-primary' />
					</Button>
				</div>
				{data?.map((item, index) => (
					<div
						key={item.id}
						className={`grid grid-cols-2 gap-2 p-2 text-xs cursor-pointer ${
							index % 2 === 0 ? 'bg-primary/70 text-secondary' : 'text-primary'
						}`}
						onClick={() => onClick(item.id.toString())}
					>
						<div className='col-span-1 flex flex-wrap'>
							{item.authors.map((author, authorIndex) => (
								<span
									key={`${item.id}-${authorIndex}`}
									className={cn(
										'rounded px-2 py-1 mr-1 mb-1 ',
										authorIndex % 2 === 0 && ''
									)}
								>
									{author}
								</span>
							))}
						</div>
						<div className='flex flex-col items-end justify-center'>
							<span className='font-bold break-all'>{item.name}</span>
							<span className='text-gray-400'>({item.id})</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
