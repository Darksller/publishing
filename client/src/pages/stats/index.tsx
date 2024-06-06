import { DepartmentSelect } from '@/entities/department'
import { FacultySelect } from '@/entities/faculty'
import { PieChart } from '@/features/graphs/pie'
import { Button } from '@/shared/ui'
import { TabsWrapper } from '@/shared/ui/tabs-wrapper'
import { AuthorsChart } from '@/widgets/stats/bar/authors'
import { MarksChart } from '@/widgets/stats/line/marks'
import { useState } from 'react'

export const Stats = () => {
	const [faculty, setFaculty] = useState('')
	const [department, setDepartment] = useState('')
	return (
		<div className='flex flex-col text-xl gap-4'>
			<div className='text-3xl tracking-widest m-auto text-center'>
				Статистика
			</div>
			<TabsWrapper
				labels={['Грифы', 'Авторы', 'Специальности']}
				content={[
					<div className='px-[90px] flex flex-col gap-4'>
						<div className='flex gap-4 w-fit'>
							<FacultySelect
								onValueChange={value => setFaculty(value)}
								defaultValue={faculty}
								value={faculty}
							/>
							<Button
								onClick={() => {
									setFaculty('')
								}}
							>
								Сбросить
							</Button>
						</div>
						<MarksChart faculty={faculty} />
					</div>,
					<div className='px-[90px] flex flex-col gap-4'>
						<div className='flex gap-4 w-fit'>
							<FacultySelect
								onValueChange={value => setFaculty(value)}
								defaultValue={faculty}
								value={faculty}
							/>
							{faculty && (
								<DepartmentSelect
									onValueChange={value => setDepartment(value)}
									defaultValue={department}
									faculty={faculty}
								/>
							)}
							<Button
								onClick={() => {
									setFaculty('')
									setDepartment('')
								}}
							>
								Сбросить
							</Button>
						</div>
						<AuthorsChart faculty={faculty} department={department} />
					</div>,
					<div className='px-[82px] items-center flex flex-col gap-4'>
						<div>
							Статистика отражающая количество изданий по специальностям
						</div>
						<PieChart />
					</div>,
				]}
			/>
		</div>
	)
}
