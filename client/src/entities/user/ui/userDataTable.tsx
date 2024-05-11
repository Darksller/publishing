import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import {
	Button,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/ui'
import { useState } from 'react'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [sortingField, setSortingField] = useState('email')
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	})
	return (
		<div className='rounded-2xl border shadow-xl px-2 '>
			<div className='flex items-center border-b justify-center'>
				<Input
					placeholder='Сортировка...'
					value={
						(table.getColumn(sortingField)?.getFilterValue() as string) ?? ''
					}
					onChange={event => {
						table.getColumn(sortingField)?.setFilterValue(event.target.value)
					}}
					className='max-w-[300px]'
				/>
				<Select defaultValue={sortingField} onValueChange={setSortingField}>
					<SelectTrigger className='w-[200px] border-none shadow-none'>
						<SelectValue />
					</SelectTrigger>
					<SelectContent className='py-1 px-1'>
						<SelectItem value='email'>Email</SelectItem>
						<SelectItem value='name'>Имя</SelectItem>
						<SelectItem value='role.name'>Должность</SelectItem>
						<SelectItem value='phoneNumber'>Номер телефона</SelectItem>
					</SelectContent>
				</Select>
				<div className='flex items-center justify-end space-x-2 py-4 ml-auto'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Назад
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Вперед
					</Button>
				</div>
			</div>

			<Table>
				<TableHeader>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map(row => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map(cell => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className='h-24 text-center'>
								Пользователи не найдены
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
