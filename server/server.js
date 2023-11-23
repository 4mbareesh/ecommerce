import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

// Create an Express app
dotenv.config()
const app = express()
const port = process.env.PORT || 8086

// Import routes
import authRoute from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import feedbackRoute from './routes/feedbackRoute.js'

// Use middlewares and routes
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))

// Connect to MongoDB using process.env.MONGO_URL
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

// Define routes
app.use('/api', authRoute, categoryRoute, productRoute, feedbackRoute)

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running ${port}`)
})
