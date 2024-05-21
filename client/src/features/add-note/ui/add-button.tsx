import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import { AddPublicationForm } from './form'
import { Publication } from '@/entities/publication/types'

type RegButtonProps = {
	className?: string
	content: JSX.Element
	publication?: Publication
	department: string
}

export const AddPubButton = ({
	className,
	content,
	publication,
	department,
}: RegButtonProps) => {
	return (
		<Dialog>
			<DialogTrigger>
				<div
					className={cn(
						'justify-center flex items-center align-middle',
						className
					)}
				>
					{content}
				</div>
			</DialogTrigger>
			<DialogContent className='max-w-[97%] w-[800px] border-4'>
				<DialogHeader>
					<DialogTitle className='m-auto'>
						{!publication ? 'Добавление' : 'Обновление'}
					</DialogTitle>
				</DialogHeader>
				<AddPublicationForm publication={publication} department={department} />
			</DialogContent>
		</Dialog>
	)
}
