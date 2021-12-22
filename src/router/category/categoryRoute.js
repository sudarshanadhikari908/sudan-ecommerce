const express = require('express')
const {
  createCategoryCtrl,
  getCategoryCtrl,
  fetchCategoryDetailsCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
} = require('../../controller/category/categoryCtrl')
const authMiddleware = require('../../middleware/authMiddleware')

const categoryRoute = express.Router()

categoryRoute.post('/', authMiddleware, createCategoryCtrl)
categoryRoute.get('/', getCategoryCtrl)
categoryRoute.get('/:id', fetchCategoryDetailsCtrl)
categoryRoute.put('/:id', authMiddleware, updateCategoryCtrl)
categoryRoute.delete('/:id', authMiddleware, deleteCategoryCtrl)

module.exports = categoryRoute
