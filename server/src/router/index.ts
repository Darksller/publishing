import express from 'express'
import { authRouter } from './auth.router'
import { roleRouter } from './role.router'
import { userRouter } from './user.router'
import { facultyRouter } from './faculty.router'
import { departmentRouter } from './department.router'
import { pubTypeRouter } from './pubType.r'
import { pubSubTypeRouter } from './pubSubType.r'
import { specialityRouter } from './speciality.r'
import { educationFormRouter } from './educationForm.r'
import { authorRouter } from './author.r'
import { planRouter } from './plan.router'

const router = express.Router()

export default (): express.Router => {
	authRouter(router)
	roleRouter(router)
	userRouter(router)
	facultyRouter(router)
	departmentRouter(router)
	pubTypeRouter(router)
	pubSubTypeRouter(router)
	specialityRouter(router)
	planRouter(router)
	educationFormRouter(router)
	authorRouter(router)
	return router
}
