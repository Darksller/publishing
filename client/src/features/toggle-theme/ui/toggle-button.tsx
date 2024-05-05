import { useTheme } from '@/app/providers/theme-provider'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

type ToggleThemeButtonProps = {
	className?: string
}

export function ToggleThemeButton({ className }: ToggleThemeButtonProps) {
	const { theme, setTheme } = useTheme()

	function switchTheme(): void {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}
	return (
		<Button
			variant='ghost'
			size={'icon'}
			aria-label='Toggle Theme'
			onClick={switchTheme}
			className={cn(className)}
		>
			<SunIcon className='absolute h-6 w-6 rotate-0 scale-100  transition-all dark:-rotate-90 dark:scale-0 ' />
			<MoonIcon className='absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
		</Button>
	)
}
