import jsPDF from 'jspdf'
import { OverDueAuthor } from '@/entities/author'
import { font } from '../lib/font'

// TypeScript type for the generatePDF function
type GeneratePDFType = (data: OverDueAuthor[]) => void

const generatePDF: GeneratePDFType = data => {
	const doc = new jsPDF()
	doc.addFileToVFS('Roboto-Regular.ttf', font)
	doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal')
	doc.setFont('Roboto')
	doc.setFontSize(18)
	doc.setTextColor(0, 0, 0) // Set text color to black
	doc.text('Список должников', 10, 20)
	doc.setFontSize(14)

	let yOffset = 30
	const pageHeight = doc.internal.pageSize.getHeight()
	const pageWidth = doc.internal.pageSize.getWidth()
	const lineHeight = doc.getLineHeight() * 0.45

	const splitTextIntoLines = (text: string, maxWidth: number): string[] => {
		const words = text.split(' ')
		const lines: string[] = []
		let currentLine = words[0]

		for (let i = 1; i < words.length; i++) {
			const word = words[i]
			const width =
				doc.getStringUnitWidth(currentLine + ' ' + word) /
				doc.internal.scaleFactor
			if (width > maxWidth) {
				lines.push(currentLine)
				currentLine = word
			} else {
				currentLine += ' ' + word
			}
		}
		lines.push(currentLine)
		return lines
	}

	data.forEach((item, index) => {
		if (yOffset > pageHeight - 50) {
			doc.addPage()
			yOffset = 10
		}

		const itemTitle = `${index + 1}. ${item.name}`
		const itemId = `(${item.id})`
		const lines = splitTextIntoLines(`${itemTitle} ${itemId}`, pageWidth - 20)

		lines.forEach(line => {
			doc.text(line, 10, yOffset)
			yOffset += lineHeight
		})

		item.authors.forEach((author, authorIndex) => {
			doc.text(` ${authorIndex + 1}. ${author}`, 15, yOffset)
			yOffset += lineHeight
		})
		yOffset += lineHeight
	})

	doc.save('overdue_authors.pdf')
}

export { generatePDF }
