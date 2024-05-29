import { RootState } from '@/app/store'
import { Roles } from '@/shared/lib/constantRoles'
import { cn } from '@/shared/lib/utils'
import { Link } from '@tanstack/react-router'
import { useSelector } from 'react-redux'

type NavPanelProps = {
	className?: string
}

export const NavPanel = ({ className }: NavPanelProps) => {
	const role = useSelector((state: RootState) => state.viewer.user?.role.name)
	const navLinks = [
		{ to: '/', text: 'Главная' },
		// { to: '/plans', text: 'Планы' },
		...(role === Roles.ED || role === Roles.ADMIN
			? [{ to: '/planning', text: 'Составление' }]
			: []),
		...(role === Roles.ADMIN
			? [{ to: '/dashboard', text: 'Пользователи' }]
			: []),
		{ to: '/stats', text: 'Статистика' },
	]

	return (
		<div
			className={cn(
				'transition-all flex justify-center items-center font-normal',
				className
			)}
		>
			{navLinks.map(({ to, text }, index) => (
				<Link
					key={to}
					to={to}
					className={cn(
						'hover:text-primary/70 duration-300 px-2',
						index !== navLinks.length - 1 && 'border-r border-primary/50'
					)}
				>
					{text}
				</Link>
			))}
		</div>
	)
}
