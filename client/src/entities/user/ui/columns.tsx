import { User } from '@/entities/user/'
import { RegButton } from '@/features/auth'
import { ArrowUpIcon, GearIcon } from '@radix-ui/react-icons'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { DeleteButton } from './delete-button'
import { Button } from '@/shared/ui'

const columnHelper = createColumnHelper<User>()

export const columns = [
	columnHelper.accessor('name', {
		header: ({ column }) => {
			return (
				<Button
					className='font-extrabold tracking-wider'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Имя
					<ArrowUpIcon className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: data => <div className='pl-4'>{data.getValue()}</div>,
	}),
	columnHelper.accessor('email', {
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					className='font-extrabold tracking-wider'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Email
					<ArrowUpIcon className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: data => <div className='pl-4'>{data.getValue()}</div>,
	}),
	columnHelper.accessor('phoneNumber', {
		header: () => (
			<div className='font-extrabold tracking-wider'>Номер телефона</div>
		),
	}),
	columnHelper.accessor('role.name', {
		id: 'role.name',
		header: ({ column }) => {
			return (
				<Button
					className='font-extrabold tracking-wider'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Должность
					<ArrowUpIcon className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: data => <div className='pl-4'>{data.getValue()}</div>,
	}),
	columnHelper.accessor('createdAt', {
		header: ({ column }) => {
			return (
				<Button
					className='font-extrabold tracking-wider'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Дата добавления
					<ArrowUpIcon className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: data => (
			<div className='pl-4'>
				{new Date(data.getValue()).toLocaleDateString()}
			</div>
		),
	}),
	columnHelper.accessor('lastLoginDate', {
		header: ({ column }) => {
			return (
				<Button
					className='font-extrabold tracking-wider'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Дата последнего входа
					<ArrowUpIcon className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: data => {
			const value = data.getValue()
			return (
				<div className='pl-4'>
					{value ? new Date(value).toLocaleDateString() : '-'}
				</div>
			)
		},
	}),
	columnHelper.display({
		id: 'settings',
		header: () => <GearIcon />,
		cell: ({ row }) => (
			<div className='flex gap-2'>
				<RegButton content={<GearIcon />} oldUser={row.original} />
				<DeleteButton user={row.original} />
			</div>
		),
	}),
] as ColumnDef<User, unknown>[]
