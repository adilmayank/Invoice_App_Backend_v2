const { Customer } = require('./customerService')
const { ContactAgent } = require('./contactAgentService')
const {PaymentTerm} = require("./paymentTermService")

module.exports = {
  CustomerService: Customer,
  ContactAgentService: ContactAgent,
  PaymentTermService: PaymentTerm
}
