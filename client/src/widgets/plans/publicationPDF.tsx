import {
	Document,
	Page,
	View,
	Text,
	StyleSheet,
	Font,
} from '@react-pdf/renderer'
import { Publication as PubType } from '@/entities/publication'
import { getCalendarDate, getMonthYear, getQuarter } from '@/shared/lib/time'
import { Roles } from '@/shared/lib/constantRoles'

Font.register({
	family: 'Roboto',
	src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
})

const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		fontFamily: 'Roboto',
		fontSize: '10px',
		padding: '4px',
	},
	header: {
		fontSize: 16,
		marginBottom: 10,
	},
	ё: {
		flexDirection: 'column',
		gap: '32px',
	},
	q: {
		flexDirection: 'column',
		border: '1px',
		paddingTop: '4px',
		paddingBottom: '4px',
		gap: '4px',
		flexGrow: 1, // Добавлено для расширения блока под содержимое
		flexShrink: 1, // Добавлено для сжатия блока при необходимости
		flexBasis: 'auto', // Добавлено для установки начального размера на основе содержимого
	},
	flex: {
		flexDirection: 'row',
	},
	flexCol: {
		flexDirection: 'column',
		flexGrow: 1, // Добавлено для расширения блока под содержимое
		flexShrink: 1, // Добавлено для сжатия блока при необходимости
		flexBasis: 'auto', // Добавлено для установки начального размера на основе содержимого
	},
	px2: {
		paddingLeft: '4px',
		paddingRight: '4px',
	},
	fontBold: {
		fontWeight: 'bold',
	},
	border2: {
		border: '2px',
	},
	border: {
		border: '1px',
	},
	textCenter: {
		textAlign: 'center',
		flexWrap: 'wrap', // Добавлено для переноса текста на новую строку
		wordBreak: 'break-word', // Добавлено для разрыва слов при необходимости
	},
	mAuto: {
		margin: 'auto',
	},
	gap2: {
		gap: '8px',
	},
	gap1: {
		gap: '4px',
	},
	py1: {
		paddingVertical: '4px',
	},
	flexGrow: {
		flexGrow: 1,
	},
})

const PdfPublication = ({ data }: { data: PubType }) => (
	<View style={[styles.ё]}>
		<View style={styles.flex}>
			<View style={styles.q}>
				<View style={[styles.px2, styles.fontBold]}>
					<Text>Дата добавления</Text>
				</View>
				<View style={styles.border2} />
				<View style={[styles.px2, styles.textCenter]}>
					<Text>{getCalendarDate(new Date(data.dateAdded))}</Text>
				</View>
			</View>
			<View style={[styles.flexCol, styles.mAuto, styles.fontBold]}>
				<View>
					<Text>Фиолетовый фон - работа сдана в срок</Text>
				</View>
				<View>
					<Text>Без фона - работа не сдана</Text>
				</View>
				<View>
					<Text>Красный фон - работа сдана, но не в срок</Text>
				</View>
			</View>
		</View>

		<View style={[styles.flex, styles.gap2]}>
			<View style={[styles.flexCol, styles.border, styles.py1, styles.gap1]}>
				<View style={[styles.px2, styles.fontBold]}>
					<Text>№ Заказа</Text>
				</View>
				<View style={[styles.border2]} />
				<View style={[styles.px2, styles.textCenter]}>
					<Text>{data.id}</Text>
				</View>
			</View>
			<View style={[styles.flexCol, styles.border, styles.py1, styles.gap1]}>
				<View style={[styles.px2, styles.fontBold]}>
					<Text>Вид издания</Text>
				</View>
				<View style={[styles.border2]} />
				<View style={[styles.px2, styles.textCenter]}>
					<Text>{data.pubSubType}</Text>
				</View>
			</View>
			<View style={[styles.flexCol, styles.border, styles.py1, styles.gap1]}>
				<View style={[styles.px2, styles.fontBold]}>
					<Text>Авторы</Text>
				</View>
				<View style={[styles.border2]} />
				<View style={[styles.px2, styles.textCenter, styles.flexCol]}>
					{data.authors.map((item, index) => (
						<Text key={index}>
							{item}
							{index !== data.authors.length - 1 ? ', ' : ''}
						</Text>
					))}
				</View>
			</View>
			<View style={[styles.flexCol, styles.border, styles.py1, styles.gap1]}>
				<View style={[styles.px2, styles.fontBold]}>
					<Text>Наименование</Text>
				</View>
				<View style={[styles.border2]} />
				<View style={[styles.px2, styles.textCenter]}>
					<Text>{data.name}</Text>
				</View>
			</View>
			<View style={[styles.flexCol, styles.border, styles.py1, styles.gap1]}>
				<View style={[styles.px2, styles.fontBold]}>
					<Text>Специальность</Text>
				</View>
				<View style={[styles.border2]} />
				<View style={[styles.px2, styles.textCenter]}>
					<Text>{data.speciality}</Text>
				</View>
			</View>
			<View
				style={[
					styles.flexCol,
					styles.border,
					styles.py1,
					styles.gap1,
					styles.flexGrow,
				]}
			>
				<View style={[styles.px2, styles.fontBold]}>
					<Text>Форма обучения</Text>
				</View>
				<View style={[styles.border2]} />
				<View style={[styles.px2, styles.textCenter]}>
					<Text>{data.educationForm}</Text>
				</View>
			</View>
		</View>
	</View>
)

type PdfGeneratorProps = {
	faculties: { name: string; departments: string[] }[]
	publications: PubType[]
}

export const PdfGenerator = ({
	faculties,
	publications,
}: PdfGeneratorProps) => (
	<Document>
		{faculties.map(faculty =>
			faculty.departments.map(department => {
				const departmentPublications = publications.filter(
					pub => pub.department === department
				)
				return departmentPublications.map((publication, index) => (
					<Page
						size='LETTER'
						orientation='landscape'
						style={styles.page}
						key={`${faculty.name}-${department}-${index}`}
					>
						<View>
							<Text style={styles.header}>
								{faculty.name} - Кафедра {department}
							</Text>
							<PdfPublication data={publication} />
						</View>
					</Page>
				))
			})
		)}
	</Document>
)
