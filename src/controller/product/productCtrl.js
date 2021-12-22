const expressAsyncHandler = require('express-async-handler')
const Category = require('../../models/category')
const Product = require('../../models/product')
const mongoose = require('mongoose')

const createProductCtrl = expressAsyncHandler(async (req, res) => {
  if (!req?.user) {
    throw new Error('Login first')
  }

  const { name, image, description, price, color, countInStock, size } =
    req.body
  try {
    if (req?.user.isAdmin) {
      const category = await Category.findById(req.body.category)

      if (!category) throw new Error('Invalid category')
      const product = await Product.create({
        user: req?.user?._id,
        name,
        image,
        description,
        price,
        color,
        countInStock,
        size,
        category,
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
    let filter = {}
    if (req.query.categories) {
      filter = { category: req.query.categories.split(',') }
    }
    const products = await Product.find(filter).populate('category')

    res.send(products).status(200)
  } catch (e) {
    res.send(e)
  }
})

const productCountCtrl = expressAsyncHandler(async (req, res) => {
  if (!req?.user) {
    throw new Error('Login first')
  }
  try {
    if (req?.user.isAdmin) {
      const productCount = await Product.countDocuments((count) => count)
      if (!productCount) {
        throw new Error('Something went wrong')
      }
      res.send(productCount)
    } else {
      throw new Error('You are not admin')
    }
  } catch (e) {
    res.send(e).status(500)
  }
})

const featuredProductCtrl = expressAsyncHandler(async (req, res) => {})

const fetchProductDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params
  try {
    const product = await Product.findById(id).populate('category')
    res.json(product)
  } catch (error) {
    res.json(error)
  }
})

// update
const updateProductCtrl = expressAsyncHandler(async (req, res) => {
  if (!req?.user) {
    throw new Error('Login first')
  }
  const { id } = req?.params
  const { name, image, description, price, color, countInStock, size } =
    req.body
  try {
    if (req?.user.isAdmin) {
      const category = await Category.findById(req.body.category)

      if (!category) throw new Error('Invalid category')
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
          category,
        },
        { new: true }
      )
      res.json(product)
    } else {
      res.send('You are not an admin')
    }
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
  productCountCtrl,
  fetchProductDetailsCtrl,
  updateProductCtrl,
  deleteProductCtrl,
}
