import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui'

type RegButtonProps = {
	className?: string
	trigger: React.ReactNode
	content: React.ReactNode
	title?: React.ReactNode
}

export const DialogWrapper = ({
	className,
	trigger,
	content,
	title,
}: RegButtonProps) => {
	return (
		<Dialog>
			<DialogTrigger className={className}>{trigger}</DialogTrigger>
			<DialogContent className='max-w-[97%] max-h-[90%] overflow-auto rounded-none w-[1650px] h-fit'>
				{title && (
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
					</DialogHeader>
				)}
				{content}
			</DialogContent>
		</Dialog>
	)
}
