const { Customer } = require('./customerService')
const { ContactAgent } = require('./contactAgentService')
const { PaymentTerm } = require('./paymentTermService')
const { Product } = require('./productService')
const { QuotationSummary } = require('./quotationSummaryService')
const { Tax } = require('./taxService')

module.exports = {
  CustomerService: Customer,
  ContactAgentService: ContactAgent,
  PaymentTermService: PaymentTerm,
  ProductService: Product,
  QuotationSummaryService: QuotationSummary,
  TaxService: Tax,
}
