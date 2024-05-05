import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Separator,
} from '@/shared/ui'
import { SignInForm } from '../../sign-in-form'

export const AuthButton = () => {
	return (
		<Dialog>
			<DialogTrigger className='group flex flex-col justify-center rounded-2xl  bg-transparent from-primary via-primary/70 to-primary px-3 font-bold tracking-wider transition-all hover:bg-gradient-to-r hover:text-secondary focus-visible:ring-1'>
				Войти
				<Separator className='border-primary transition-all duration-300 group-hover:border-secondary' />
			</DialogTrigger>
			<DialogContent className='w-[500px] max-w-[97%] border-4'>
				<DialogHeader>
					<DialogTitle>Авторизация</DialogTitle>
				</DialogHeader>
				<SignInForm />
			</DialogContent>
		</Dialog>
	)
}
