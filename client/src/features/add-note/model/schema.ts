import * as z from 'zod'

export const Schema = z.object({
	name: z.string().min(5, { message: 'Название обязательно' }),
	pubType: z.string().min(1, { message: 'Тип издания обязателен' }),
	pubSubType: z.string().min(5, { message: 'Вид издания обязателен' }),
	speciality: z.string().min(5, { message: 'Специальность обязательна' }),
	educationForm: z.string().min(5, { message: 'Форма обучения обязательна' }),
	authors: z
		.string()
		.array()
		.min(1, { message: 'Должен присутствовать хотя бы один автор' }),
	plannedAmount: z.coerce
		.number()
		.min(1, { message: 'Плановый объем должен быть больше 0' }),
	plannedDueDate: z.string().min(1, { message: 'Выберите дату' }),
	department: z.string(),
	dateAdded: z.string(),
	copies: z
		.number()
		.min(1, { message: 'Тираж должен составлять значение больше 0' }),
})
