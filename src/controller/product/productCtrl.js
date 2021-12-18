const expressAsyncHandler = require('express-async-handler')
const Product = require('../../models/product')

const createProductCtrl = expressAsyncHandler(async (req, res) => {
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

module.exports = { createProductCtrl, getProductCtrl }
