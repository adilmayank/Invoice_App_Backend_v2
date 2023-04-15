const express = require('express')
const router = express.Router()
const { TaxController } = require('../Controllers')
const { TaxService } = require('../Services')
const { TaxRepository } = require('../Data Access')
const { TaxModel } = require('../Models')

// Dependency injection
const taxRepository = new TaxRepository(TaxModel)
const taxService = new TaxService(taxRepository)
const taxController = new TaxController(taxService)

// get all taxes
router.get('/api/v2/taxes', taxController.getAllTaxes)

// create new tax
router.post('/api/v2/taxes', taxController.createTax)

// update tax
router.patch('/api/v2/taxes', taxController.updateTax)

// hard delete single tax
router.delete('/api/v2/taxes', taxController.removeTax)

module.exports = router
