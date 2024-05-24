import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { defaultValues } from '../model/defaultValues'
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
import { Publication } from '@/entities/publication/types'
import { Schema } from '../model/schema'
import { PubSubTypeSelect } from '@/entities/pubSubType'
import { PubTypeSelect } from '@/entities/pubType'
import { SpecialitySelect } from '@/entities/speciality'
import { EducationFormSelect } from '@/entities/educationForm'
import { useDispatch, useSelector } from 'react-redux'
import { add, update } from '@/entities/publication/model/publicationSlice'
import { AuthorMultiSelect } from '@/entities/author'
import { getCalendarDate } from '@/shared/lib/time'
import { selectYear } from '@/entities/plan/model/selectors'

type Props = {
	publication?: Publication
	department: string
}

export function AddPublicationForm({ publication, department }: Props) {
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')
	const dispatch = useDispatch()
	const year = useSelector(selectYear)

	const form = useForm<z.infer<typeof Schema>>({
		resolver: zodResolver(Schema),
		defaultValues: defaultValues(department, publication),
	})

	const onSubmit = async (values: z.infer<typeof Schema>) => {
		try {
			if (!publication) {
				setSuccess('Издание добавлено!')
				dispatch(add(values))
			} else {
				dispatch(update({ data: values, key: publication.dateAdded }))
				setSuccess('Издание обновлено!')
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
				<div className='grid grid-cols-3 gap-4'>
					<FormField
						control={form.control}
						name='pubType'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Тип издания</FormLabel>
								<FormControl>
									<PubTypeSelect
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
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Полное наименование издания</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder='Линейная алгебра'
										type='text'
										className='rounded-none text-md'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='pubSubType'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Вид издания</FormLabel>
								<FormControl>
									<PubSubTypeSelect
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
						name='speciality'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Специальность</FormLabel>
								<FormControl>
									<SpecialitySelect
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
						name='educationForm'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Форма обучения</FormLabel>
								<FormControl>
									<EducationFormSelect
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
						name='plannedAmount'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Плановый объем, у.и.л.</FormLabel>
								<FormControl>
									<Input
										{...field}
										type='number'
										className='rounded-none text-md'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='copies'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Тираж, экз</FormLabel>
								<FormControl>
									<Input
										{...field}
										type='number'
										className='rounded-none text-md'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='authors'
						render={({ field }) => (
							<FormItem className='col-span-2'>
								<FormLabel>Авторы:</FormLabel>
								<FormControl>
									<AuthorMultiSelect field={field} department={department} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='plannedDueDate'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Плановый срок сдачи</FormLabel>
								<FormControl>
									<Input
										{...field}
										value={getCalendarDate(new Date(field.value))}
										type='date'
										className='rounded-none text-md'
										min={`${year ?? new Date().getFullYear()}-09-01`}
										max={`${(year ?? new Date().getFullYear()) + 1}-05-31`}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormError message={error} />
				<FormSuccess message={success} />
				<Button type='submit' className='w-full'>
					{!publication ? 'Добавить' : 'Обновить'}
				</Button>
			</form>
		</Form>
	)
}
