import { Publication } from '@/entities/publication'

type Props = {
	data: Publication
}

const AuthorList = ({ authors }: { authors: string[] }) => (
	<div className='opacity-80'>{authors.join(', ')}</div>
)

const MetaData = ({ label, value }: { label: string; value: string }) => (
	<div className='opacity-50'>
		<span className='block'>{label}</span>
		<span className='block'>{value}</span>
	</div>
)

export const SearchResultItem = ({ data }: Props) => {
	return (
		<div className='border border-gray-300 rounded-md p-4 transition-all duration-300 hover:bg-gray-100 cursor-pointer max-w-[1000px] m-auto flex flex-col gap-2 shadow-xl'>
			<div className='text-lg font-semibold flex gap-2'>
				{data.name}
				<span className='text-gray-500 font-normal text-sm'>({data.id})</span>
			</div>
			<div className='flex justify-between gap-8'>
				<AuthorList authors={data.authors} />
			</div>
			<div className='flex gap-8 justify-between'>
				<MetaData label='Тип' value={data.pubType} />
				<MetaData label='Вид' value={data.pubSubType} />
				<MetaData label='Специальность' value={data.speciality} />
				<MetaData label='Форма обучения' value={data.educationForm} />
			</div>
		</div>
	)
}
