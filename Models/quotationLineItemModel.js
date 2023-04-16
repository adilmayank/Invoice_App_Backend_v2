const mongoose = require('mongoose')
const { Schema } = mongoose

const quotationLineItemSchema = new Schema({
  quotationId: { type: mongoose.Types.ObjectId, ref: "quotationSummary", required: true },
  productId: { type: mongoose.Types.ObjectId, ref: "product", required: true },
  code: { type: String, required: true },
  description: {type: String, required: true,},
  unitPrice: {type: Number, required: true},
  quantity: { type: Number, required: true, },
  total: { type: Number, required: true,  },
})

const QuotationLineItemModel = mongoose.model('quotationLineItem', quotationLineItemSchema)

module.exports = { QuotationLineItemModel }
