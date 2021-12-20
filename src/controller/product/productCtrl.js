const expressAsyncHandler = require('express-async-handler')
const Product = require('../../models/product')

const createProductCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req)
  const { name, image, description, price, color, countInStock, size } =
    req.body
  try {
    const product = await Product.create({
      name,
      image,
      description,
      price,
      color,
      countInStock,
      size,
    })
    res.json(product)
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
