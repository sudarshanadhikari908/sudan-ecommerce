const express = require('express')

const {
  createProductCtrl,
  getProductCtrl,
} = require('../../controller/product/productCtrl')

const productRoute = express.Router()

productRoute.post('/', createProductCtrl)
productRoute.get('/', getProductCtrl)

module.exports = productRoute
