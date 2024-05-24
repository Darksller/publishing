import express from 'express'
import { isEdOrAdmin } from '../middlewares'
import { getAll } from '../controllers/editor.c'

export const editorRouter = (router: express.Router) => {
	router.get('/editor/getall', isEdOrAdmin, getAll)
}
