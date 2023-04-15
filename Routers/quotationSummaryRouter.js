const express = require('express')
const router = express.Router()
const { QuotationSummaryController } = require('../Controllers')
const { QuotationSummaryService } = require('../Services')
const { QuotationSummaryRepository } = require('../Data Access')
const { QuotationSummaryModel } = require('../Models')

// Dependency injection
const quotationSummaryRepository = new QuotationSummaryRepository(
  QuotationSummaryModel
)
const quotationSummaryService = new QuotationSummaryService(
  quotationSummaryRepository
)
const quotationSummaryController = new QuotationSummaryController(
  quotationSummaryService
)

// get all quotations
router.get(
  '/api/v2/quotations',
  quotationSummaryController.getAllQuotationSummaries
)

// get single quotation
router.get(
  '/api/v2/quotations/:id',
  quotationSummaryController.getSingleQuotation
)

// create single quotation
router.post('/api/v2/quotations', quotationSummaryController.createQuotation)

// update single quotation
router.patch(
  '/api/v2/quotations',
  quotationSummaryController.updateSingleQuotation
)

// update quotation status as draft
router.patch(
  '/api/v2/quotations/:id/status/draft',
  quotationSummaryController.updateQuotationStatusDraft
)

// update quotation status as accepted
router.patch(
  '/api/v2/quotations/:id/status/accepted',
  quotationSummaryController.updateQuotationStatusAccepted
)

// update quotation status as Reject
router.patch(
  '/api/v2/quotations/:id/status/rejected',
  quotationSummaryController.updateQuotationStatusRejected
)

// send quotation
router.patch(
  '/api/v2/quotations/:id/send',
  quotationSummaryController.sendQuotation
)

module.exports = router
