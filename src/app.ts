import express, { NextFunction, Request, Response } from 'express'
import { errorHandler } from './middlewares/error.middleware'
import routes from './routes'
import cors from 'cors'
import morgan from 'morgan'



// Initialize express
const app = express()


// 1- Add winston functionality
// Logging middleware
app.use(morgan("dev"))



// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);



// Route middleware
app.use('/api', routes)


// Error middleware
app.use(errorHandler)


export default app