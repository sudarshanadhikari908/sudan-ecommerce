const expressAsyncHandler = require('express-async-handler')
const Category = require('../../models/category')

const createCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { name, icon, color } = req.body
  try {
    const category = await Category.create({
      name,
      icon,
      color,
    })
    res.json(category)
  } catch (error) {
    res.json(error).status(404)
  }
})

const getCategoryCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find()

    res.send(categories).status(200)
  } catch (e) {
    res.send(e)
  }
})
const fetchCategoryDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params
  try {
    const category = await Category.findById(id)
    res.json(category)
  } catch (error) {
    res.json(error)
  }
})

// update
const updateCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params
  const { name, icon, color } = req.body
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        icon,
        color,
      },
      { new: true }
    )
    res.json(category)
  } catch (error) {
    res.json(error)
  }
})

const deleteCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params
  try {
    const category = await Category.findByIdAndDelete(id)
    res.json(category).status(200)
  } catch (error) {
    res.json(error).status(500)
  }
})

module.exports = {
  createCategoryCtrl,
  deleteCategoryCtrl,
  getCategoryCtrl,
  fetchCategoryDetailsCtrl,
  updateCategoryCtrl,
}
