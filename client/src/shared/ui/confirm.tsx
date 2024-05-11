import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './alert-dialog'

type ConfirmDialogProps = {
	trigger: JSX.Element
	desc: string
	onClick: () => void
}

export function ConfirmDialog({ trigger, desc, onClick }: ConfirmDialogProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Вы уверены?</AlertDialogTitle>
					<AlertDialogDescription>{desc}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Отменить</AlertDialogCancel>
					<AlertDialogAction onClick={onClick}>Подтвердить</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
