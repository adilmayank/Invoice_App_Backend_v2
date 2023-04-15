const { CustomerController } = require('./customerController')
const { ContactAgentController } = require('./contactAgentController')
const { PaymentTermController } = require('./paymentTermController')
const { ProductController } = require('./productController')
const { QuotationSummaryController } = require('./quotationSummaryController')
const { TaxController } = require('./taxController')

module.exports = {
  CustomerController,
  ContactAgentController,
  PaymentTermController,
  ProductController,
  QuotationSummaryController,
  TaxController,
}
