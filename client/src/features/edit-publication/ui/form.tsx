import { Publication as PubType } from '@/entities/publication'
import { getCalendarDate, getMonthYear } from '@/shared/lib/time'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Schema } from '../model/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { defaultValues } from '../model/defaultValues'
import {
	Button,
	Form,
	FormControl,
	FormError,
	FormField,
	FormItem,
	FormMessage,
	FormSuccess,
	Input,
} from '@/shared/ui'
import { MarkSelect } from '@/entities/mark'
import { EditorSelect } from '@/entities/editor'
import { useUpdatePublicationMutation } from '@/entities/plan'
import { DynamicInputs } from './dynamic-inputs'
import { onAddNote } from '../model/utils'
import { PlusCircledIcon } from '@radix-ui/react-icons'

type PublicationProps = {
	data: PubType
}
export const PublicationEditForm = ({ data }: PublicationProps) => {
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')
	const [update] = useUpdatePublicationMutation()
	const form = useForm<z.infer<typeof Schema>>({
		resolver: zodResolver(Schema),
		defaultValues: defaultValues(data),
	})

	const onSubmit = async (values: z.infer<typeof Schema>) => {
		try {
			await update(values).unwrap()
			window.location.reload()
			setSuccess('Успешно обновлено!')
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
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-4  p-4 '>
					<div className='flex'>
						<div className='flex flex-col border py-1 gap-1 w-fit'>
							<div className='px-2 font-bold'>Дата добавления</div>
							<div className='border-2' />
							<div className='px-2 text-center'>
								{getCalendarDate(new Date(data.dateAdded))}
							</div>
						</div>
						<Button
							type='submit'
							variant={'ghost'}
							className='ml-auto flex justify-center items-center border px-3 hover:bg-primary hover:text-secondary duration-300 cursor-pointer text-xl border-primary hover:border-secondary py-4'
						>
							Сохранить
						</Button>
					</div>
					<div className='flex gap-2'>
						<div className='flex flex-col border py-1 gap-1'>
							<div className='px-2 font-bold'>№ Заказа</div>
							<div className='border-2' />
							<div className='text-center px-2'>{data.id}</div>
						</div>
						<div className='flex flex-col border py-1 gap-1'>
							<div className='px-2 font-bold'>Вид издания</div>
							<div className='border-2' />
							<div className='text-center px-2'>{data.pubSubType}</div>
						</div>
						<div className='flex flex-col border py-1 gap-1'>
							<div className='px-2 font-bold'>Авторы</div>
							<div className='border-2' />
							<div className='text-center px-2 flex'>
								{data.authors.map((item, index) => (
									<div key={index}>
										{item}
										{index !== data.authors.length - 1 ? ', ' : ''}
									</div>
								))}
							</div>
						</div>
						<div className='flex flex-col border py-1 gap-1'>
							<div className='px-2 font-bold'>Наименование</div>
							<div className='border-2' />
							<div className='text-center px-2'>{data.name}</div>
						</div>
						<div className='flex flex-col border py-1 gap-1'>
							<div className='px-2 font-bold'>Специальность</div>
							<div className='border-2' />
							<div className='text-center px-2'>{data.speciality}</div>
						</div>
						<div className='flex flex-col border py-1 gap-1 flex-grow'>
							<div className='px-2 font-bold'>Форма обучения</div>
							<div className='border-2' />
							<div className='px-2'>{data.educationForm}</div>
						</div>
					</div>

					<div className='grid grid-cols-8 grid-rows-3 gap-0 text-center'>
						<div className='col-span-2 row-span-1 border p-4 font-bold flex justify-center items-center'>
							Объём, уч.-изд.л.
						</div>
						<div className='col-span-1 row-span-2 border p-4 font-bold flex items-center justify-center'>
							Тираж, экз
						</div>
						<div className='col-span-1 row-span-1 row-start-2 border p-4'>
							План
						</div>
						<div className='col-span-1 row-span-1 row-start-2 col-start-2 border p-4'>
							Факт
						</div>
						<div className='col-span-1 row-span-1 row-start-3 border p-4'>
							<FormField
								control={form.control}
								name='plannedAmount'
								render={({ field }) => (
									<FormItem>
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
						</div>
						<div className='col-span-1 row-span-1 row-start-3 col-start-2 border p-4'>
							<FormField
								control={form.control}
								name='actualAmount'
								render={({ field }) => (
									<FormItem>
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
						</div>
						<div className='col-span-1 row-span-1 row-start-3 col-start-3 border p-4'>
							{data.copies}
						</div>
						<div className='col-span-2 row-span-2 col-start-4 border p-4 font-bold items-center flex justify-center'>
							Дата регистрации
						</div>
						<div className='col-span-2 row-span-1 row-start-3 col-start-4 border p-4'>
							{getMonthYear(data.dateAdded)}
						</div>
						<div className='col-span-2 row-span-1 col-start-6 border p-4 font-bold flex justify-center items-center'>
							Срок сдачи
						</div>
						<div className='col-span-1 row-span-1 row-start-2 col-start-6 border p-4'>
							План
						</div>
						<div className='col-span-1 row-span-1 row-start-2 col-start-7 border p-4'>
							Факт
						</div>
						<div className='col-span-1 row-span-1 row-start-3 col-start-6 border p-4'>
							<FormField
								control={form.control}
								name='plannedDueDate'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												value={getCalendarDate(new Date(field.value))}
												type='date'
												className='rounded-none text-md'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='col-span-1 row-span-1 row-start-3 col-start-7 border p-4'>
							<FormField
								control={form.control}
								name='actualDueDate'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												value={getCalendarDate(new Date(field.value))}
												type='date'
												className='rounded-none text-md'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='col-span-1 row-span-2 col-start-8 border p-4 flex justify-center items-center font-bold'>
							Гриф
						</div>
						<div className='col-span-1 row-span-1 row-start-3 col-start-8 border p-4'>
							<FormField
								control={form.control}
								name='mark'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<MarkSelect onValueChange={field.onChange} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-x-12'>
						<div className='text-base flex flex-col '>
							<div className='flex gap-2'>
								<div className='font-bold mt-[3px]'>Примечания</div>
								<Button
									variant='ghost'
									type='button'
									size={'icon'}
									onClick={() => onAddNote(form)}
								>
									<PlusCircledIcon className='size-5' />
								</Button>
							</div>
							<DynamicInputs form={form} />
						</div>
						<div className='grid grid-cols-4 grid-rows-3 text-center'>
							<div className='col-span-2 row-span-2 border p-4 flex items-center justify-center font-bold'>
								Редактор
							</div>
							<div className='col-span-2 row-span-1 border p-4 row-start-3'>
								<FormField
									control={form.control}
									name='editor'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<EditorSelect onValueChange={field.onChange} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='col-span-2 row-span-1 border p-4 col-start-3 font-bold text-center'>
								Правка автора
							</div>
							<div className='col-span-1 row-span-1 border p-4 col-start-3 row-start-2'>
								Получил
							</div>
							<div className='col-span-1 row-span-1 border p-4 col-start-4 row-start-2'>
								Вернул
							</div>
							<div className='col-span-1 row-span-1 border p-4 col-start-3 row-start-3'>
								<FormField
									control={form.control}
									name='startDate'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													value={getCalendarDate(new Date(field.value || ''))}
													type='date'
													className='rounded-none text-md'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='col-span-1 row-span-1 border p-4 col-start-4 row-start-3'>
								<FormField
									control={form.control}
									name='finishDate'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													value={getCalendarDate(new Date(field.value || ''))}
													type='date'
													className='rounded-none text-md'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					</div>

					<div className='grid grid-cols-6 grid-rows-2 gap-x-4 text-center'>
						<div className='col-span-2 row-span-1 border p-4 font-bold'>
							Дата подписания в печать
						</div>
						<div className='col-span-2 row-span-1 border p-4 row-start-2'>
							<FormField
								control={form.control}
								name='signatureDate'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												value={getCalendarDate(new Date(field.value || ''))}
												type='date'
												className='rounded-none text-md'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='col-span-2 row-span-1 border p-4 col-start-3 font-bold'>
							Выход в свет
						</div>
						<div className='col-span-2 row-span-1 border p-4 col-start-3 row-start-2'>
							<FormField
								control={form.control}
								name='releaseDate'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												value={getCalendarDate(new Date(field.value || ''))}
												type='date'
												className='rounded-none text-md'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='col-span-2 row-span-1 border p-4 col-start-5 font-bold'>
							Дата передачи в библиотеку
						</div>
						<div className='col-span-2 row-span-1 border p-4 col-start-5 row-start-2'>
							<FormField
								control={form.control}
								name='transferDate'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												value={getCalendarDate(new Date(field.value || ''))}
												type='date'
												className='rounded-none text-md'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
				</div>
			</form>
		</Form>
	)
}
