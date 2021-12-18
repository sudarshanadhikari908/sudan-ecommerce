const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    color: {
      type: String,
    },
    countInStock: {
      required: true,
      type: Number,
    },
    size: {
      required: true,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product
