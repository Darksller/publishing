import { BarChart } from '@/features/graphs/bar'
import { LineChart } from '@/features/graphs/line'
import { PieChart } from '@/features/graphs/pie'
import { TabsWrapper } from '@/shared/ui/tabs-wrapper'

export const Stats = () => {
	return (
		<div className='flex flex-col text-xl gap-4'>
			<div className='text-3xl tracking-widest m-auto text-center'>
				Статистика
			</div>
			<TabsWrapper
				labels={['Грифы', 'Авторы', 'Специальности']}
				content={[
					<div className='px-[90px] items-center flex flex-col gap-4'>
						<div>
							Статистика изменения количества изданий с грифом за все время
						</div>
						<LineChart />
					</div>,
					<div className='px-[90px] items-center flex flex-col gap-4 '>
						<div>Количество изданий у каждого автора</div>
						<BarChart />
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
