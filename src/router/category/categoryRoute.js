const express = require('express')
const {
  createCategoryCtrl,
  getCategoryCtrl,
  fetchCategoryDetailsCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
} = require('../../controller/category/categoryCtrl')

const categoryRoute = express.Router()

categoryRoute.post('/', createCategoryCtrl)
categoryRoute.get('/', getCategoryCtrl)
categoryRoute.get('/:id', fetchCategoryDetailsCtrl)
categoryRoute.put('/:id', updateCategoryCtrl)
categoryRoute.delete('/:id', deleteCategoryCtrl)

module.exports = categoryRoute
