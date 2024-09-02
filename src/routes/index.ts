import {Router} from 'express'
import authRoute from './auth.route'
import userRoute from './user.route'
import cartRoute from './cart.route'
import orderRoute from './order.route'
import productRoute from './product.route'



const router = Router()


const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/cart",
    route: cartRoute,
  },
  {
    path: "/order",
    route: orderRoute,
  },
  {
    path: "/product",
    route: productRoute,
  },
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});



export default router