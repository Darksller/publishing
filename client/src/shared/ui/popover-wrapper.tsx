import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

type Props = {
	trigger: React.ReactNode
	content: React.ReactNode
}

export function PopoverWrapper({ trigger, content }: Props) {
	return (
		<Popover>
			<PopoverTrigger asChild>{trigger}</PopoverTrigger>
			<PopoverContent>{content}</PopoverContent>
		</Popover>
	)
}
