const mongoose = require('mongoose')
const { Schema } = mongoose

const paymentTermSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
})

const PaymentTermModel = mongoose.model('paymentTerm', paymentTermSchema)

module.exports = { PaymentTermModel }
