const express = require('express')
const { registerUser } = require('../../controller/user/userCtrl')

const userRoute = express.Router()

userRoute.post('/register', registerUser)

module.exports = userRoute
