import { ToggleThemeButton } from '@/features/toggle-theme'
import Logo from '/logo.png'
import { Link } from '@tanstack/react-router'
import { SearchBar } from '@/features/search'
import { NavPanel } from './nav-panel'

export function Header() {
	return (
		<header className='z-[99] m-auto flex justify-between rounded-full bg-secondary/30 px-4 py-[6px] shadow-lg backdrop-blur-xl md:max-w-[750px] items-center'>
			<Link to='/' className='flex items-center'>
				<img src={Logo} className='h-[24px] pr-2' />
				<h1 className='text-2xl font-bold'>Издательский учет</h1>
			</Link>
			<NavPanel />
			<div className='flex items-center justify-center md:gap-4'>
				<SearchBar className='hidden sm:flex' variant='hideable' />
				<ToggleThemeButton />
			</div>
		</header>
	)
}
