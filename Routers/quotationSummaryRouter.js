const express = require('express')
const router = express.Router()
const { QuotationSummaryController } = require('../Controllers')
const { QuotationSummaryService } = require('../Services')
const {
  QuotationSummaryRepository,
  QuotationLineItemRepository,
  ProductRepository,
} = require('../Data Access')
const {
  QuotationSummaryModel,
  QuotationLineItemModel,
  ProductModel,
} = require('../Models')

// Dependency injection
const quotationSummaryRepository = new QuotationSummaryRepository(
  QuotationSummaryModel
)
const quotationLineItemRepository = new QuotationLineItemRepository(
  QuotationLineItemModel
)
const productRepository = new ProductRepository(ProductModel)
const quotationSummaryService = new QuotationSummaryService(
  quotationSummaryRepository,
  quotationLineItemRepository,
  productRepository
)
const quotationSummaryController = new QuotationSummaryController(
  quotationSummaryService
)

// get all quotations
router.get('/api/v2/quotations', quotationSummaryController.getAllQuotations)

// get single quotation
router.get(
  '/api/v2/quotations/:quotationId',
  quotationSummaryController.getSingleQuotation
)

// create single quotation
router.post('/api/v2/quotations', quotationSummaryController.createQuotation)

// update single quotation
router.patch(
  '/api/v2/quotations/:quotationId',
  quotationSummaryController.updateSingleQuotation
)

// update quotation status
router.patch(
  '/api/v2/quotations/:quotationId/status',
  quotationSummaryController.updateQuotationStatus
)

// send quotation
router.patch(
  '/api/v2/quotations/:quotationId/send',
  quotationSummaryController.sendQuotation
)

module.exports = router
