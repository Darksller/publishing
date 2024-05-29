import { RootState } from '@/app/store'
import { YearSelect } from '@/entities/plan'
import { AccordionWrapper } from '@/features/accordion'
import { useFaculty } from '@/features/planning/faculty'
import { Button } from '@/shared/ui'
import { Publication } from '@/widgets/plans/publication'
import { Publications } from '@/widgets/plans/publications'
import { DownloadIcon } from '@radix-ui/react-icons'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useSelector } from 'react-redux'

export const Plans = () => {
	const { faculties } = useFaculty()
	const allPublications = useSelector(
		(state: RootState) => state.publication.publications
	)

	const downloadPDF = () => {
		const capture = document.querySelectorAll('.pdf')
		const doc = new jsPDF('landscape', 'pt', 'a4')
		const promises: Promise<void>[] = []

		capture.forEach(
			element => ((element as HTMLElement).style.display = 'flex')
		)

		capture.forEach((element, index) => {
			promises.push(
				html2canvas(element as HTMLElement).then(canvas => {
					const imgData = canvas.toDataURL('image/png')
					const componentWidth = doc.internal.pageSize.getWidth()
					const componentHeight = doc.internal.pageSize.getHeight()
					if (index > 0) {
						doc.addPage()
					}
					doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight)
				})
			)
		})

		Promise.all(promises).then(() => {
			capture.forEach(
				element => ((element as HTMLElement).style.display = 'none')
			)
			doc.save('publications.pdf')
		})
	}

	return (
		<div className='flex flex-col'>
			<div className='border-b pb-4 border-primary/50'>
				<Button
					variant={'ghost'}
					onClick={downloadPDF}
					className='flex px-3 hover:bg-primary hover:text-secondary duration-300 cursor-pointer'
				>
					<DownloadIcon className='size-5' />
				</Button>
				<div className='text-3xl tracking-widest ml-auto text-center'>
					Главная
				</div>
				<div className='ml-auto w-fit flex gap-2 items-center text-lg'>
					Год:
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
			<div className='flex flex-col gap-4 absolute top-[-10000px]'>
				{faculties.map((faculty, facultyIndex) => (
					<div key={facultyIndex} className='flex flex-col gap-4'>
						{faculty.departments.map((department, deptIndex) => {
							const publications = allPublications.filter(
								pub => pub.department === department
							)
							return publications.map((publication, pubIndex) => (
								<div
									key={`${deptIndex}-${pubIndex}`}
									className=' flex-col pdf hidden'
								>
									<div className='font-bold text-xl p-4 border-x-4 border-t-4 border-primary'>
										{faculty.name} - Кафедра {department}
									</div>
									<Publication key={pubIndex} data={publication} hide={true} />
								</div>
							))
						})}
					</div>
				))}
			</div>
		</div>
	)
}
