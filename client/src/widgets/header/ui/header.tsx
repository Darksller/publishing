import { AuthButton } from '@/features/authentication'
import Logo from '/logo.svg'
import { SearchBar } from '@/features/header/search'
import { ToggleThemeButton } from '@/features/header/toggle-theme'
import { Link } from '@tanstack/react-router'

export function Header() {
	return (
		<header className='z-[99] m-auto flex justify-between rounded-full bg-secondary/30 px-4 py-[6px] shadow-lg backdrop-blur-xl md:max-w-[750px]'>
			<Link to='/' className='flex items-center'>
				<img src={Logo} className='h-[24px] pr-2' />
				<h1 className='text-2xl font-bold'>Издательский учет</h1>
			</Link>
			<div className='flex items-center justify-center md:gap-4'>
				<div className='flex justify-end'>
					<SearchBar className='hidden sm:flex' variant='hideable' />
					<AuthButton />
				</div>
				<ToggleThemeButton />
			</div>
		</header>
	)
}
