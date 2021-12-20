const express = require('express')
require('dotenv/config')
const morgan = require('morgan')
const cors = require('cors')

const dbConnect = require('./config/dbConnect')
const categoryRoute = require('./router/category/categoryRoute')
const orderRoute = require('./router/order/order')
const productRoute = require('./router/product/productRoute')
const userRoute = require('./router/user/userRoute')

const api = process.env.API_URL

// use express
const app = express()

// Database Connection
dbConnect()

// Use cors
app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use(morgan('tiny'))

// income route

app.use(`${api}/product`, productRoute)
app.use(`${api}/user`, userRoute)
app.use(`${api}/category`, categoryRoute)
app.use(`${api}/order`, orderRoute)

module.exports = app
