import express from 'express'

export const credentials = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	res.header('Access-Control-Allow-Origin', 'true')
	next()
}
