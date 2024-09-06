import {Router} from 'express'
import { validateAddProductRequest, validateProductById } from '../validations/product.validation'
import { add_New_Product, category_Filter, featured_Products, product_By_Id, seller_Products } from '../controllers/product.controller'
import multer from 'multer'


const router = Router()

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
})

// 1- '/add-product' should have a middleware for verifying cookies
// 2- add rate-blocker functionality in '/add-product'


router.post(
  "/add-product",
  upload.array("imageInfo", 5),
  validateAddProductRequest,
  add_New_Product
);


router.get('/seller-products', seller_Products)

router.get('/category', category_Filter)

router.get('/featured', featured_Products)

router.get('/:productId', validateProductById, product_By_Id)



export default router
