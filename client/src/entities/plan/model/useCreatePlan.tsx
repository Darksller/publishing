import { useDispatch, useSelector } from 'react-redux'
import { selectPublications, selectYear } from './selectors'
import { useNavigate } from '@tanstack/react-router'
import { useToast } from '@/shared/ui'
import { useCreatePlanMutation } from '../api'
import { clear } from '@/entities/publication'

export const useCreatePlan = () => {
	const publications = useSelector(selectPublications)
	const year = useSelector(selectYear)
	const navigate = useNavigate()
	const { toast } = useToast()
	const [cratePlan] = useCreatePlanMutation()
	const dispatch = useDispatch()

	const onCreateClick = async () => {
		try {
			await cratePlan({ year, publications }).unwrap()
			navigate({ to: '/success' })
			dispatch(clear())
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Ошибка',
				description: error as string,
			})
		}
	}
	return { onCreateClick, year, publications }
}
