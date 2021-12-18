const express = require('express')

const {
  createProductCtrl,
  getProductCtrl,
  fetchProductDetailsCtrl,
  updateProductCtrl,
  deleteProductCtrl,
} = require('../../controller/product/productCtrl')

const productRoute = express.Router()

productRoute.post('/', createProductCtrl)
productRoute.get('/', getProductCtrl)
productRoute.get('/:id', fetchProductDetailsCtrl)
productRoute.put('/:id', updateProductCtrl)
productRoute.delete('/:id', deleteProductCtrl)

module.exports = productRoute
