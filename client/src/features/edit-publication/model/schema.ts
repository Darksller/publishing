import * as z from 'zod'

export const Schema = z.object({
	id: z.number(),
	plannedAmount: z.coerce
		.number()
		.min(1, { message: 'Плановый объем должен быть больше 0' }),
	actualAmount: z.coerce.number(),
	plannedDueDate: z.string().min(1, { message: 'Выберите дату' }),
	actualDueDate: z.string(),
	mark: z.string().nullable().optional(),
	editor: z.string().nullable().optional(),
	startDate: z.string().nullable().optional(),
	finishDate: z.string().nullable().optional(),
	signatureDate: z.string().nullable().optional(),
	releaseDate: z.string().nullable().optional(),
	transferDate: z.string().nullable().optional(),
	notes: z.array(z.string()),
})
