import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { Schema } from './schema'

export const onAddNote = (form: UseFormReturn<z.infer<typeof Schema>>) => {
	form.setValue('notes', [...form.getValues('notes'), ''])
}
export const onRemoveNote = (
	index: number,
	form: UseFormReturn<z.infer<typeof Schema>>
) => {
	const notes = form.getValues('notes')
	if (notes.length > 0) {
		notes.splice(index, 1)
		form.setValue('notes', notes)
	}
}
