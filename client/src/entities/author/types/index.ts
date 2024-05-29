import { Department } from '@/entities/department'

export type Author = {
	id: number
	name: string
	department: Department
}

export type OverDueAuthor = {
	authors: string[]
	name: string
	id: number
}
