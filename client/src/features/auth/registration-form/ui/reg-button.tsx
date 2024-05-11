import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui'
import { RegistrationForm } from '..'
import { cn } from '@/shared/lib/utils'
import { User } from '@/entities/user'

type RegButtonProps = {
	className?: string
	content: JSX.Element
	oldUser?: User
}

export const RegButton = ({ className, content, oldUser }: RegButtonProps) => {
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
			<DialogContent className='w-[400px] max-w-[97%] border-4'>
				<DialogHeader>
					<DialogTitle className='m-auto'>
						{!oldUser ? 'Добавление пользователя' : 'Обновление пользователя'}
					</DialogTitle>
				</DialogHeader>
				<RegistrationForm oldUser={oldUser} />
			</DialogContent>
		</Dialog>
	)
}
