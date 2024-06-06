import { prisma } from '../../prisma'

export const addNewService = async () => {
	return await prisma.editor.createMany({
		data: [{ name: 'Шурко А. Ю.' }, { name: 'Юрец Е. С.' }],
	})
}

export const getAllRepository = async () => {
	return await prisma.editor.findMany()
}

export const getEditor = async (name?: string) => {
	if (!name) return undefined
	return await prisma.editor.findFirst({ where: { name } })
}

export async function getEditorId(editorName: string) {
	const editor = await prisma.editor.findFirst({
		where: { name: editorName },
	})
	return editor ? editor.id : null
}
