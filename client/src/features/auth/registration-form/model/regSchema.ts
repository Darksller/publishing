import * as z from 'zod'

export const regSchema = z.object({
	id: z.number(),
	email: z
		.string()
		.min(1, {
			message: 'Email обязателен',
		})
		.email(),
	password: z.string().min(1, {
		message: 'Пароль обязателен',
	}),
	name: z.string().min(1, {
		message: 'Имя обязательно',
	}),
	phoneNumber: z.string().min(1, {
		message: 'Номер телефона обязателен',
	}),
	role: z.string().min(1, {
		message: 'Роль обязательна',
	}),
})
