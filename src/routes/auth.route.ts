import {Router} from 'express'
import { register_User } from '../controllers/auth.controller'
import { validateRegisterRequest } from '../validations/auth.validation'


const router = Router()


router.post("/register", validateRegisterRequest, register_User);


export default router



