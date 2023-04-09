const mongoose = require('mongoose')
const { Schema } = mongoose

const customerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  emailId: { type: String },
  contactNumber: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
})

const customerModel = mongoose.model('customer', customerSchema)

module.exports = { customerModel }
