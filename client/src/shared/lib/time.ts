export function formatDateTime(dateTime: string | Date): string {
	const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime

	if (isNaN(date.getTime())) {
		return '-'
	}

	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false,
	}

	return new Intl.DateTimeFormat('ru-RU', options).format(date)
}

export function getQuarter(dateString: string): string {
	const date = new Date(dateString)
	const quarter = Math.floor((date.getMonth() + 3) / 3)
	const year = date.getFullYear()
	return `${quarter} кв. ${year}`
}

export const getCalendarDate = (date: Date) => {
	if (!(date instanceof Date)) return ''

	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')

	return `${year}-${month}-${day}`
}

export const formatDateWithTime = (date: Date) => {
	if (!(date instanceof Date)) return ''

	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	const seconds = String(date.getSeconds()).padStart(2, '0')

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}
