import { YearSelect } from '@/entities/plan'
import { AccordionWrapper } from '@/features/accordion'
import { useFaculty } from '@/features/planning/faculty'
import { Publications } from '@/widgets/plans/publications'

export const Plans = () => {
	const { faculties } = useFaculty()
	return (
		<div className='flex flex-col'>
			<div className='border-b pb-4 border-primary/50'>
				<div className='text-3xl tracking-widest ml-auto text-center'>
					Главная
				</div>
				<div className='ml-auto w-fit'>
					<YearSelect toAdd={false} />
				</div>
			</div>
			<div className='flex flex-col'>
				{faculties.map((faculty, index) => (
					<AccordionWrapper
						key={index}
						trigger={
							<div className='m-auto text-lg tracking-widest'>
								{faculty.name}
							</div>
						}
						content={faculty.departments.map((item, index) => (
							<AccordionWrapper
								key={index}
								trigger={
									<div className='m-auto text-md tracking-widest'>{item}</div>
								}
								content={<Publications name={item} />}
								value={item}
							/>
						))}
						value={faculty.name}
					/>
				))}
			</div>
		</div>
	)
}
