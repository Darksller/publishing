import { RootState } from '@/app/store'
import { addDepartment, removeDepartment } from '@/entities/publication'
import { useToast } from '@/shared/ui'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useDepartment = (faculty: string) => {
	const { toast } = useToast()
	const dispatch = useDispatch()
	const [department, setDepartment] = useState<string>('')

	const departments = useSelector((state: RootState) =>
		state.publication.faculties.filter(item => item.name === faculty)
	)[0].departments

	const handleSetDepartment = (value: string) => {
		setDepartment(value)
	}

	const handleRemoveDepartment = (depName: string) => {
		dispatch(removeDepartment(depName))
	}

	const handleAddDepartment = () => {
		if (!departments.includes(department)) {
			dispatch(addDepartment({ faculty, department }))
			setDepartment('')
		} else {
			toast({
				variant: 'destructive',
				title: 'Ошибка',
				description: 'Данный факультет уже был добавлен!',
			})
		}
	}
	return {
		handleAddDepartment,
		department,
		departments,
		handleRemoveDepartment,
		handleSetDepartment,
	}
}
