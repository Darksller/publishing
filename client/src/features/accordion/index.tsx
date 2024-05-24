import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/ui'

type AccordionWrapperProps = {
	trigger: React.ReactNode
	content: React.ReactNode
	value: string
	type?: 'single' | 'multiple'
	className?: string
}

export function AccordionWrapper({
	trigger,
	content,
	value,
	type = 'multiple',
	className,
}: AccordionWrapperProps) {
	return (
		<Accordion type={type} className={className}>
			<AccordionItem value={value}>
				<AccordionTrigger>{trigger}</AccordionTrigger>
				<AccordionContent>{content}</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
