const express = require('express')
const router = express.Router()
const { ContactAgentController } = require('../Controllers')
const { ContactAgentService } = require('../Services')
const { ContactAgentRepository } = require('../Data Access')
const { ContactAgentModel } = require('../Models')

// Dependency injection
const contactAgentRepository = new ContactAgentRepository(ContactAgentModel)
const contactAgentService = new ContactAgentService(contactAgentRepository)
const contactAgentController = new ContactAgentController(contactAgentService)

// get all contact agent
router.get('/api/v2/contactAgents', contactAgentController.getAllContactAgents)

// create new contact agent
router.post('/api/v2/contactAgents', contactAgentController.addContactAgent)

// update single contact agent
router.patch(
  '/api/v2/contactAgents/:contactAgentId',
  contactAgentController.updateContactAgent
)

// hard delete contact agent
router.delete(
  '/api/v2/contactAgents/:contactAgentId',
  contactAgentController.removeContactAgent
)

module.exports = router
