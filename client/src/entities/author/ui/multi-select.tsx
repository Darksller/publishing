import { ControllerRenderProps } from 'react-hook-form'
import { useGetAuthorsByDepartmentQuery } from '../api'
import Select from 'react-select'

type Props = {
	field: ControllerRenderProps<
		{
			authors: string[]
			name: string
			pubType: string
			pubSubType: string
			speciality: string
			educationForm: string
			plannedAmount: number
			plannedDueDate: string
			department: string
			dateAdded: string
			copies: number
		},
		'authors'
	>
	department: string
}
export const AuthorMultiSelect = ({ field, department }: Props) => {
	const { data } = useGetAuthorsByDepartmentQuery(department)
	const options = data?.map(item => ({
		value: item.name,
		label: item.name,
	}))
	return (
		<Select
			placeholder={'Выберите авторов'}
			value={field.value.map(item => ({
				value: item,
				label: item,
			}))}
			onChange={value => field.onChange(value.map(item => item.value))}
			isMulti
			options={options}
		/>
	)
}
