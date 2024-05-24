import { RootState } from '@/app/store'
import { Publication as PubType } from '@/entities/publication'
import { PublicationEditForm } from '@/features/edit-publication/ui/form'
import { Roles } from '@/shared/lib/constantRoles'
import { getCalendarDate, getMonthYear, getQuarter } from '@/shared/lib/time'
import { DialogWrapper } from '@/shared/ui/dialog-wrapper'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { useSelector } from 'react-redux'

type PublicationProps = {
	data: PubType
}
export const Publication = ({ data }: PublicationProps) => {
	const role = useSelector((state: RootState) => state.viewer.user?.role.name)
	return (
		<div className='flex flex-col gap-8 border border-primary p-4 '>
			<div className='flex'>
				<div className='flex flex-col border py-1 gap-1 w-fit'>
					<div className='px-2 font-bold'>Дата добавления</div>
					<div className='border-2' />
					<div className='px-2 text-center'>
						{getCalendarDate(new Date(data.dateAdded))}
					</div>
				</div>
				{(role === Roles.ED || role === Roles.ADMIN) && (
					<DialogWrapper
						className='ml-auto flex justify-center items-center border px-3 hover:bg-primary hover:text-secondary duration-300 cursor-pointer'
						content={<PublicationEditForm data={data} />}
						trigger={<Pencil1Icon className='size-6' />}
					/>
				)}
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
				<div className='col-span-2 row-span-1 border p-4 font-bold'>
					Объём, уч.-изд.л.
				</div>
				<div className='col-span-1 row-span-2 border p-4 font-bold flex items-center justify-center'>
					Тираж, экз
				</div>
				<div className='col-span-1 row-span-1 row-start-2 border p-4'>План</div>
				<div className='col-span-1 row-span-1 row-start-2 col-start-2 border p-4'>
					Факт
				</div>
				<div className='col-span-1 row-span-1 row-start-3 border p-4'>
					{data.plannedAmount}
				</div>
				<div className='col-span-1 row-span-1 row-start-3 col-start-2 border p-4'>
					{data.actualAmount}
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
				<div className='col-span-2 row-span-1 col-start-6 border p-4 font-bold'>
					Срок сдачи
				</div>
				<div className='col-span-1 row-span-1 row-start-2 col-start-6 border p-4'>
					План
				</div>
				<div className='col-span-1 row-span-1 row-start-2 col-start-7 border p-4'>
					Факт
				</div>
				<div className='col-span-1 row-span-1 row-start-3 col-start-6 border p-4'>
					{getQuarter(data.plannedDueDate)}
				</div>
				<div className='col-span-1 row-span-1 row-start-3 col-start-7 border p-4'>
					{data.actualDueDate && getQuarter(data.actualDueDate)}
				</div>
				<div className='col-span-1 row-span-2 col-start-8 border p-4 flex justify-center items-center font-bold'>
					Гриф
				</div>
				<div className='col-span-1 row-span-1 row-start-3 col-start-8 border p-4'>
					{data.mark}
				</div>
			</div>

			<div className='grid grid-cols-2 gap-x-12'>
				<div className='p-4 text-base flex flex-col gap-4'>
					<div className='font-bold'>Примечания</div>
					{data.notes?.map((item, index) => (
						<div>
							{index + 1}. {item}
						</div>
					))}
				</div>
				<div className='grid grid-cols-4 grid-rows-3 text-center'>
					<div className='col-span-2 row-span-2 border p-4 flex items-center justify-center font-bold'>
						Редактор
					</div>
					<div className='col-span-2 row-span-1 border p-4 row-start-3'>
						{data.edit?.editor}
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
						{data.edit?.startDate}
					</div>
					<div className='col-span-1 row-span-1 border p-4 col-start-4 row-start-3'>
						{data.edit?.finishDate}
					</div>
				</div>
			</div>

			<div className='grid grid-cols-6 grid-rows-2 gap-x-4 text-center'>
				<div className='col-span-2 row-span-1 border p-4 font-bold'>
					Дата подписания в печать
				</div>
				<div className='col-span-2 row-span-1 border p-4 row-start-2'>
					{data.signatureDate}
				</div>
				<div className='col-span-2 row-span-1 border p-4 col-start-3 font-bold'>
					Выход в свет
				</div>
				<div className='col-span-2 row-span-1 border p-4 col-start-3 row-start-2'>
					{data.releaseDate}
				</div>
				<div className='col-span-2 row-span-1 border p-4 col-start-5 font-bold'>
					Дата передачи в библиотеку
				</div>
				<div className='col-span-2 row-span-1 border p-4 col-start-5 row-start-2'>
					{data.transferDate}
				</div>
			</div>
		</div>
	)
}
