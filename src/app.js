const express = require('express')

// use express
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send({ message: 'App is up and running' }).status(200)
})

module.exports = app
