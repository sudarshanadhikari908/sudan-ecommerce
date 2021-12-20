const expressAsyncHandler = require('express-async-handler')
const Product = require('../../models/product')

const createProductCtrl = expressAsyncHandler(async (req, res) => {
  if (!req?.user) {
    throw new Error('Login first')
  }
  const { name, image, description, price, color, countInStock, size } =
    req.body
  try {
    if (req?.user.isAdmin) {
      const product = await Product.create({
        user: req?.user?._id,
        name,
        image,
        description,
        price,
        color,
        countInStock,
        size,
      })
      res.json(product)
    } else {
      res.send('You are not an admin')
    }
  } catch (error) {
    res.json(error)
  }
})

const getProductCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const products = await Product.find()

    res.send(products).status(200)
  } catch (e) {
    res.send(e)
  }
})

const fetchProductDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params
  try {
    const product = await Product.findById(id)
    res.json(product)
  } catch (error) {
    res.json(error)
  }
})

// update
const updateProductCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params
  const { name, image, description, price, color, countInStock, size } =
    req.body
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        image,
        description,
        price,
        color,
        countInStock,
        size,
      },
      { new: true }
    )
    res.json(product)
  } catch (error) {
    res.json(error)
  }
})

// delete single income

const deleteProductCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params
  try {
    const product = await Product.findByIdAndDelete(id)
    res.json(product)
  } catch (error) {
    res.json(error)
  }
})

module.exports = {
  createProductCtrl,
  getProductCtrl,
  fetchProductDetailsCtrl,
  updateProductCtrl,
  deleteProductCtrl,
}
