const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      required: true,
      type: String,
    },
    image: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],

    description: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    color: {
      type: String,
    },
    countInStock: {
      required: true,
      type: Number,
      min: 0,
      max: 250,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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

productSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

productSchema.set('toJSON', {
  virtuals: true,
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product
