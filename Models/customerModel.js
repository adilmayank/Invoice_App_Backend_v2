const mongoose = require('mongoose')
const { Schema } = mongoose

const customerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  uniqueBusinessIdentifier: {
    type: {
      name: { type: String },
      value: { type: String },
    },
    unique: true,
    required: true,
  },
  address: {
    type: {
      line1: { type: String },
      line2: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String },
    },
    required: true,
  },
  contactAgents: {
    type: [{ type: mongoose.Types.ObjectId, ref: 'contactAgent' }],
  },
  paymentType: {
    type: String,
    enum: ['cash', 'credit card', 'debit card', 'bank transfer'],
    default: 'bank transfer',
  },
  paymentTerm: { type: mongoose.Types.ObjectId, ref: 'paymentTerm' },
  isActive: { type: Boolean, required: true, default: true },
})

const CustomerModel = mongoose.model('customer', customerSchema)

module.exports = { CustomerModel }
