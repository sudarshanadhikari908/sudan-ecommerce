const expressAsyncHandler = require('express-async-handler')
const generateToken = require('../../middleware/generateToken')
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

//login user
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req?.body
  //Find the user in db
  const userFound = await User.findOne({ email })

  //check if the user password match

  if (userFound && (await userFound?.isPasswordMatch(password))) {
    res.json({
      _id: userFound?._id,
      firstname: userFound?.firstname,
      lastname: userFound?.lastname,
      email: userFound?.email,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid Login credentials')
  }
})

// update user
const updateUserCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const profile = await User.findByIdAndUpdate(
      req?.user?._id,
      // name,
      // email,
      // password,
      // phone,
      // address,
      // isAdmin,
      {
        name: req?.body?.name,
        email: req?.body?.email,
        password: req?.body?.password,
        phone: req?.body?.phone,
        address: req?.body?.address,
        isAdmin: req?.body?.isAdmin,
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
