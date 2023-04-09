const express = require('express')
const router = express.Router()
const { CustomerController } = require('../Controllers')
const { Customer } = require('../Entities')

// Dependency injection
const customerService = new Customer()
const customerController = new CustomerController(customerService)

// get all customer
router.get('/api/v2/customers', customerController.getAllCustomers)

// create new customer
router.post('/api/v2/customers', customerController.createNewCustomer)

// get single customer
router.get('/api/v2/customers/:id', customerController.getSingleCustomer)

// update single customer
router.patch('/api/v2/customers', customerController.updateSingleCustomer)

// change isActive Flag
router.patch(
  '/api/v2/customers/change-activation-status',
  customerController.updateActivatedStatus
)

module.exports = router
