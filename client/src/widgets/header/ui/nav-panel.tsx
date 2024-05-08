import { cn } from '@/shared/lib/utils'
import { Link } from '@tanstack/react-router'

type NavPanelProps = {
	className?: string
}
export const NavPanel = ({ className }: NavPanelProps) => {
	return (
		<div
			className={cn(
				'transition-all flex justify-center items-center',
				className
			)}
		>
			<Link to={'/dashboard'} className='hover:text-primary/70 duration-300'>
				Dashboard
			</Link>
		</div>
	)
}
