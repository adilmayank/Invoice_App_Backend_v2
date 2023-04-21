const express = require('express')
const router = express.Router()
const { CustomerController } = require('../Controllers')
const { CustomerService } = require('../Services')
const { CustomerRepository, ContactAgentRepository } = require('../Data Access')
const { CustomerModel, ContactAgentModel } = require('../Models')

// Dependency injection
const customerRepository = new CustomerRepository(CustomerModel)
const contactAgentRepository = new ContactAgentRepository(ContactAgentModel)

const customerService = new CustomerService(customerRepository, contactAgentRepository)
const customerController = new CustomerController(customerService)

// get all customer
router.get('/api/v2/customers', customerController.getAllCustomers)

// create new customer
router.post('/api/v2/customers', customerController.createNewCustomer)

// get single customer
router.get('/api/v2/customers/:id', customerController.getSingleCustomer)

// update single customer
router.patch('/api/v2/customers', customerController.updateSingleCustomer)

// add a contact agent for a customer
router.patch('/api/v2/customers/:id/contact-agents', customerController.addContactAgent)

// remove a contact agent for a customer
router.patch('/api/v2/customers/:id/contact-agents/:agentId', customerController.removeContactAgent)

// change isActive Flag
router.patch(
  '/api/v2/customers/change-activation-status',
  customerController.updateActivatedStatus
)

module.exports = router
