const { CustomerRepository } = require('./customerRepository')
const { ContactAgentRepository } = require('./contactAgentRepository')
const { PaymentTermRepository } = require('./paymentTermRepository')
const { ProductRepository } = require('./productRepository')
const { QuotationSummaryRepository } = require('./quotationSummaryRepository')
const { TaxRepository } = require('./taxRepository')

module.exports = {
  CustomerRepository,
  ContactAgentRepository,
  PaymentTermRepository,
  ProductRepository,
  QuotationSummaryRepository,
  TaxRepository,
}
