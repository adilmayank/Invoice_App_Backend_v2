const express = require('express')
const router = express.Router()
const { PaymentTermController } = require('../Controllers')
const { PaymentTermService } = require('../Services')
const { PaymentTermRepository } = require('../Data Access')
const { PaymentTermModel } = require('../Models')

// Dependency injection
const paymentTermRepository = new PaymentTermRepository(PaymentTermModel)
const paymentTermService = new PaymentTermService(paymentTermRepository)
const paymentTermController = new PaymentTermController(paymentTermService)

// get all payment terms
router.get('/api/v2/paymentTerms', paymentTermController.getAllPaymentTerms)

// create new payment term
router.post('/api/v2/paymentTerms', paymentTermController.addPaymentTerm)

// hard delete single payment term
router.delete('/api/v2/paymentTerms/:paymentTermId', paymentTermController.removePaymentTerm)

module.exports = router
