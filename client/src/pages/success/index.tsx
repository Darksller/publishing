import { Link } from '@tanstack/react-router'

export const SuccessPage = () => {
	return (
		<div className='flex flex-col gap-6'>
			<div className='text-6xl tracking-widest m-auto font-semibold'>
				Успех!
			</div>
			<div className='text-4xl tracking-widest m-auto'>
				Сводный план был успешно добавлен
			</div>
			<Link
				to='/'
				className='m-auto border p-2 rounded-full border-primary px-4'
			>
				Вернуться на домашнюю страницу
			</Link>
		</div>
	)
}
