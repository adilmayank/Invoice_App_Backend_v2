const { Customer } = require('./customerService')
const { ContactAgent } = require('./contactAgentService')
const { PaymentTerm } = require('./paymentTermService')
const { Product } = require('./productService')

module.exports = {
  CustomerService: Customer,
  ContactAgentService: ContactAgent,
  PaymentTermService: PaymentTerm,
  ProductService: Product,
}
