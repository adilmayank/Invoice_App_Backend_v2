const mongoose = require('mongoose')
const { Schema } = mongoose

const contactAgentSchema = new Schema({
  name: { type: String, required: true },
  emailId: { type: String, required: true },
  phoneNumber: { type: String, required: true },
})

const ContactAgentModel = mongoose.model('contactAgent', contactAgentSchema)

module.exports = { ContactAgentModel }
