import { Router } from "express";
import {
  add_New_Product_To_Cart,
  check_Cart_Status,
  create_New_Cart,
  delete_Cart,
  remove_Product_From_Cart,
  update_Product_Quantity,
  user_Cart,
} from "../controllers/cart.controller";
import { validateUpdateCart } from "../validations/cart.validation";
import { verify_Token } from "../middlewares/verifyToken";

const router = Router();

// 1- Create a middleware for extracting userId from jwt token

router.get("/status", verify_Token, check_Cart_Status);
router.post("/create", create_New_Cart);
router.put("/add", validateUpdateCart, add_New_Product_To_Cart);
router.put('/update-quantity', verify_Token, update_Product_Quantity)
router.get('/user-cart', verify_Token, user_Cart)

router.put("/remove-product", remove_Product_From_Cart);
router.delete("/", delete_Cart);

export default router;
