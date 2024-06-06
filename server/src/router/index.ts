import express from 'express'
import { authRouter } from './auth.router'
import { authorRouter } from './author.router'
import { departmentRouter } from './department.router'
import { editorRouter } from './editor.router'
import { educationFormRouter } from './educationForm.router'
import { facultyRouter } from './faculty.router'
import { markRouter } from './mark.router'
import { planRouter } from './plan.router'
import { pubSubTypeRouter } from './pubSubType.router'
import { pubTypeRouter } from './pubType.router'
import { roleRouter } from './role.router'
import { searchRouter } from './search.router'
import { specialityRouter } from './speciality.router'
import { statsRouter } from './stats.router'
import { userRouter } from './user.router'
const router = express.Router()

export default (): express.Router => {
	statsRouter(router)
	authRouter(router)
	roleRouter(router)
	userRouter(router)
	facultyRouter(router)
	searchRouter(router)
	departmentRouter(router)
	pubTypeRouter(router)
	pubSubTypeRouter(router)
	specialityRouter(router)
	planRouter(router)
	editorRouter(router)
	educationFormRouter(router)
	markRouter(router)
	authorRouter(router)
	return router
}
