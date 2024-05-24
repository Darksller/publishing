import {
	Button,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
} from '@/shared/ui'
import { MinusCircledIcon } from '@radix-ui/react-icons'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { Schema } from '../model/schema'
import { onRemoveNote } from '../model/utils'

type DynamicInputsProps = {
	form: UseFormReturn<z.infer<typeof Schema>>
}

export const DynamicInputs = ({ form }: DynamicInputsProps) => {
	return (
		<div className='grid grid-cols-2 gap-y-4'>
			{form.watch('notes').map((_, index) => (
				<div className='flex items-center'>
					<FormField
						control={form.control}
						name={`notes.${index}`}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input {...field} className='rounded-none text-md' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='button'
						variant='ghost'
						size={'icon'}
						className='ml-1'
						onClick={() => onRemoveNote(index, form)}
					>
						<MinusCircledIcon className='size-5' />
					</Button>
				</div>
			))}
		</div>
	)
}
