const mongoose = require('mongoose')
const { Schema } = mongoose

const quotationSummarySchema = new Schema({
  customerId: {
    type: mongoose.Types.ObjectId,
    ref: 'customer',
    required: true,
  },
  quotationNumber: {
    type: String,
    required: true,
    unique: true,
    minLength: 1,
    default: Date.now(),
  },
  quotationDate: { type: Date, default: Date.now(), required: true },
  quotationExpiryDate: { type: Date },
  subTotal: { type: Number },
  discount: {
    type: {
      name: String,
      value: Number,
    },
  },
  tax: { type: [mongoose.Types.ObjectId], ref: 'tax' }, // will add taxes later
  total: { type: Number },
  status: {
    type: String,
    enum: ['draft', 'sent', 'accepted', 'rejected'],
    default: 'draft',
    required: true,
  },
  paymentType: {
    type: String,
    enum: ['cash', 'credit card', 'debit card', 'bank transfer'],
    default: 'bank transfer',
  }, // later need to create a separate model for this one too,
  // just like paymentTerm
})

quotationSummarySchema.virtual('products', {
  ref: 'quotationLineItem',
  localField: '_id',
  foreignField: 'quotationId',
})

quotationSummarySchema.pre('save', async function() {
  this.quotationExpiryDate = new Date()
  this.quotationExpiryDate.setMonth(this.quotationDate.getMonth() + 1)
  const quotationNumber = await this.constructor.countDocuments()
  this.quotationNumber = "QOUT-" + 50001 + quotationNumber
})

const QuotationSummaryModel = mongoose.model(
  'quotationSummary',
  quotationSummarySchema
)

module.exports = { QuotationSummaryModel }
