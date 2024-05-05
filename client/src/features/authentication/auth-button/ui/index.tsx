import {
	Button,
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
			<DialogTrigger>
				<Button className='group flex flex-col px-6 font-bold tracking-wide text-4xl py-8 justify-center w-full'>
					Войти в аккаунт
					<Separator className='border-primary transition-all duration-300 group-hover:border-secondary border-2' />
				</Button>
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
