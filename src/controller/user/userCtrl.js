const expressAsyncHandler = require('express-async-handler')
const User = require('../../models/user')

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, phone, address, isAdmin } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    throw new Error('User already exists!')
  }
  try {
    // if user exists

    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
      isAdmin,
    })
    res.status(200).json(user)
  } catch (error) {
    res.json(error)
  }
})

module.exports = { registerUser }
