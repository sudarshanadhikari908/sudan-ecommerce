const express = require('express')

const {
  createProductCtrl,
  getProductCtrl,
  fetchProductDetailsCtrl,
  updateProductCtrl,
  deleteProductCtrl,
} = require('../../controller/product/productCtrl')
const authMiddleware = require('../../middleware/authMiddleware')

const productRoute = express.Router()

productRoute.post('/', authMiddleware, createProductCtrl)
productRoute.get('/', authMiddleware, getProductCtrl)
productRoute.get('/:id', authMiddleware, fetchProductDetailsCtrl)
productRoute.put('/:id', authMiddleware, updateProductCtrl)
productRoute.delete('/:id', authMiddleware, deleteProductCtrl)

module.exports = productRoute
