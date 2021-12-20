const express = require('express')
const {
  registerUser,
  fetchUsersCtrl,
  loginUserCtrl,

  updateUserCtrl,
} = require('../../controller/user/userCtrl')
const authMiddleware = require('../../middleware/authMiddleware')

const userRoute = express.Router()

userRoute.post('/register', registerUser)
userRoute.put('/update', authMiddleware, updateUserCtrl)
userRoute.post('/login', loginUserCtrl)
userRoute.get('/', fetchUsersCtrl)

module.exports = userRoute
