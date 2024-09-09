import {Router} from 'express'
import {  login_User, logout, register_User } from '../controllers/auth.controller'
import { validateLoginRequest, validateRegisterRequest } from '../validations/auth.validation'


const router = Router()


router.post("/register", validateRegisterRequest, register_User);
router.post('/login',validateLoginRequest, login_User)
router.post('/logout', logout)


export default router



