import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui'
import { SignInForm } from '../../sign-in-form'
import { cn } from '@/shared/lib/utils'

type AuthButtonProps = {
	className?: string
}

export const AuthButton = ({ className }: AuthButtonProps) => {
	return (
		<Dialog>
			<DialogTrigger>
				<div
					className={cn(
						'justify-center w-full flex items-center align-middle',
						className
					)}
				>
					Войти в аккаунт
				</div>
			</DialogTrigger>
			<DialogContent className='w-[400px] max-w-[97%] border-4'>
				<DialogHeader>
					<DialogTitle className='m-auto'>Авторизация</DialogTitle>
				</DialogHeader>
				<SignInForm />
			</DialogContent>
		</Dialog>
	)
}
