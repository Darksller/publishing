import { useToast } from '@/shared/ui'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFaculties } from './selectors'
import { addFaculty, removeFaculty } from '@/entities/publication'

export const useFaculty = () => {
	const dispatch = useDispatch()
	const { toast } = useToast()
	const [faculty, setFaculty] = useState<string>('')
	const faculties = useSelector(selectFaculties)

	const handleSetFaculty = (value: string) => {
		setFaculty(value)
	}

	const handleAddFaculty = () => {
		if (!faculties.filter(item => item.name === faculty).length) {
			dispatch(addFaculty(faculty))
			setFaculty('')
		} else {
			toast({
				variant: 'destructive',
				title: 'Ошибка',
				description: 'Данный факультет уже был добавлен!',
			})
		}
	}

	const handleRemoveFaculty = (facultyName: string) => {
		dispatch(removeFaculty(facultyName))
	}

	return {
		handleAddFaculty,
		handleRemoveFaculty,
		faculties,
		faculty,
		handleSetFaculty,
	}
}
