import { AuthButton } from '@/features/auth'
import { ToggleThemeButton } from '@/features/toggle-theme'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const GuestPage = () => {
	return (
		<motion.div
			initial={{ opacity: 0.0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{
				delay: 0.3,
				duration: 0.8,
				ease: 'easeInOut',
			}}
			className='relative flex flex-col gap-4 items-center justify-center px-4'
		>
			<div className='h-dvh flex flex-col '>
				<div className='flex justify-between px-1 md:px-24 py-6 items-center'>
					<Link to='/' className='flex'>
						<img src='logo.png' className='h-10 sm:h-16 pr-4' />
						<div className='font-black sm:text-2xl uppercase tracking-wide'>
							<div>Издательский</div>
							<div>Учет</div>
						</div>
					</Link>
					<div className='flex sm:gap-6 sm:text-xl font-semibold tracking-widest uppercase'>
						<Link className='hover:bg-primary hover:text-secondary transition-all duration-500 py-1 h-fit px-2 sm:px-4 border-primary rounded-2xl'>
							О нас
						</Link>
						<Link className='hover:bg-primary hover:text-secondary transition-all duration-500 py-1 h-fit px-2 sm:px-4 border-primary rounded-2xl'>
							Контакты
						</Link>
						<ToggleThemeButton />
					</div>
				</div>

				<div className='grid lg:grid-cols-2 h-full '>
					<div className='flex flex-col justify-center gap-10 lg:h-2/3 sm:px-12 font-bold'>
						<div className='z-10 text-6xl md:text-7xl xl:text-8xl 2xl:text-9xl max-lg:text-center'>
							Добро Пожаловать.
						</div>
						<AuthButton className='font-bold tracking-wide text-4xl py-8 text-secondary bg-primary hover:bg-secondary hover:text-primary transition-all duration-700 ' />
					</div>

					<div className='md:bg-guest-page bg-cover flex justify-center items-center flex-col mx-14'>
						<img src='logo.png' className='h-10 sm:h-16' />
						<div className='mx-8 flex flex-col h-2/5 items-center'>
							<div className='font-bold text-4xl bg-white/90 dark:bg-gray-600/20 backdrop-blur px-4 py-2 rounded-t-2xl text-center'>
								Учет учебно-методической литературы
							</div>
							<div className=' bg-white/90 dark:bg-gray-600/20 text-xl tracking-wider backdrop-blur px-1 py-2 rounded-2xl text-center'>
								Данный веб-сайт представляет собой интегрированную систему для
								отслеживания и учета издания учебно-методической литературы в
								университете имени П. О. Сухого. С его помощью можно легко вести
								учет публикаций, просматривать каталог изданий, контролировать
								списки должников и многое другое!
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
}
