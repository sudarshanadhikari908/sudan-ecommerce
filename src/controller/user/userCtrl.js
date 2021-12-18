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

const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.json(error)
  }
})
// login users
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req && req.body

  // find user in db
  const userFound = await User.findOne({ email })

  //  check if the user password match
  if (userFound && (await userFound?.isPasswordMatch(password))) {
    res.json({
      _id: userFound?._id,
      name: userFound?.name,
      password: userFound?.password,
      email: userFound?.email,
      isAdmin: userFound?.isAdmin,
      phone: userFound?.phone,
      address: userFound?.address,
    })
  } else {
    res.status(401)
    throw new Error('Invalid login credentials')
  }
})
//user profile
const updateUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params
  try {
    const profile = await User.findByIdAndUpdate(
      id,
      {
        name: userFound?.name,
        password: userFound?.password,
        email: userFound?.email,
        isAdmin: userFound?.isAdmin,
        phone: userFound?.phone,
        address: userFound?.address,
      },
      {
        new: true,
        runValidators: true,
      }
    )
    res.json(profile)
  } catch (error) {
    res.json(error)
  }
})

module.exports = { registerUser, fetchUsersCtrl, loginUserCtrl, updateUserCtrl }
