import {Router} from 'express'
import { check_Cart_Status, create_New_Cart, update_User_Cart } from '../controllers/cart.controller'
import { validateUpdateCart } from '../validations/cart.validation'


const router = Router()

// 1- Create a middleware for extracting userId from jwt token

router.get('/status', check_Cart_Status)
router.post("/create", create_New_Cart)
router.put('/update', validateUpdateCart,  update_User_Cart)
router.put("/remove-product")
router.delete("/delete-cart")



export default router


