const mongoose = require('mongoose')
const { Schema } = mongoose

const taxSchema = new Schema({
  name: { type: String, required: true },
  rate: { type: Number, required: true },
})

const TaxModel = mongoose.model('tax', taxSchema)

module.exports = { TaxModel }
