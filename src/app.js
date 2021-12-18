const express = require('express')
require('dotenv/config')
const morgan = require('morgan')

const dbConnect = require('./config/dbConnect')
const productRoute = require('./router/product/productRoute')

const api = process.env.API_URL

// use express
const app = express()

// Database Connection
dbConnect()

app.use(express.json())
app.use(morgan('tiny'))

// income route

app.use(`${api}/product`, productRoute)

app.get('/', (req, res) => {
  const products = {
    id: 2,
    name: 'aalu',
    image: 'kaale',
  }
  res.send(products).status(200)
})

app.post('/', (req, res) => {
  const product = req.body
  res.send(product)
})

module.exports = app
