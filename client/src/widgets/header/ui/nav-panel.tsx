import { RootState } from '@/app/store'
import { Roles } from '@/shared/lib/constantRoles'
import { cn } from '@/shared/lib/utils'
import { Link } from '@tanstack/react-router'
import { useSelector } from 'react-redux'

type NavPanelProps = {
	className?: string
}
export const NavPanel = ({ className }: NavPanelProps) => {
	const { viewer } = useSelector((state: RootState) => state)
	return (
		<div
			className={cn(
				'transition-all flex justify-center items-center gap-4',
				className
			)}
		>
			{viewer.user?.role.name === Roles.ADMIN && (
				<Link to={'/dashboard'} className='hover:text-primary/70 duration-300'>
					Пользователи
				</Link>
			)}
			{(viewer.user?.role.name === Roles.ED ||
				viewer.user?.role.name === Roles.ADMIN) && (
				<Link to={'/planning'} className='hover:text-primary/70 duration-300'>
					Составление
				</Link>
			)}
		</div>
	)
}
