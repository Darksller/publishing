import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { defaultValues } from '../model/defaultValues'
import { regSchema } from '../model/regSchema'
import {
	Button,
	Form,
	FormControl,
	FormError,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormSuccess,
	Input,
} from '@/shared/ui'
import {
	User,
	useRegisterMutation,
	useUpdateUserMutation,
} from '@/entities/user'
import { RoleSelect } from '@/entities/role'

type RegistrationFormProps = {
	oldUser?: User
}

export function RegistrationForm({ oldUser }: RegistrationFormProps) {
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')
	const [register, isLoading] = useRegisterMutation()
	const [updateUser] = useUpdateUserMutation()

	const form = useForm<z.infer<typeof regSchema>>({
		resolver: zodResolver(regSchema),
		defaultValues: defaultValues(oldUser),
	})

	const onSubmit = async (values: z.infer<typeof regSchema>) => {
		try {
			if (!oldUser) {
				await register(values).unwrap()
				setSuccess('Пользователь добавлен!')
			} else {
				await updateUser(values).unwrap()
				setSuccess('Пользователь обновлен!')
			}
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: (error as { data: string }).data ?? 'Повторите попытку позже'
			)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<div className='space-y-4'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isLoading.isLoading || isLoading.isSuccess}
										placeholder='darksller.sss@gmail.com'
										type='email'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isLoading.isLoading || isLoading.isSuccess}
										placeholder='Семен Остапов'
										type='text'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='phoneNumber'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Номер телефона</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isLoading.isLoading || isLoading.isSuccess}
										placeholder='+37529184563'
										type='text'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='role'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Роль</FormLabel>
								<FormControl>
									<RoleSelect
										onValueChange={field.onChange}
										defaultValue={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Пароль</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder='********'
										type='password'
										disabled={isLoading.isLoading || isLoading.isSuccess}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormError message={error} />
				<FormSuccess message={success} />
				<Button
					type='submit'
					className='w-full'
					disabled={isLoading.isLoading || isLoading.isSuccess}
				>
					{!oldUser ? 'Добавить пользователя' : 'Обновить пользователя'}
				</Button>
			</form>
		</Form>
	)
}
