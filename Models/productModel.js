const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  code: { type: String, required: true },
  description: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  isActive: { type: Boolean, required: true, default: true },
})

const ProductModel = mongoose.model('product', productSchema)

module.exports = { ProductModel }
