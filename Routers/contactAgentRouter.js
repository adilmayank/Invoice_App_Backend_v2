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


// create new contact agent
router.post('/api/v2/contact-agents', contactAgentController.addContactAgent)

// update single contact agent
router.patch('/api/v2/contact-agents', contactAgentController.updateContactAgent)

// hard delete contact agent 
router.delete(
  '/api/v2/contact-agents',
  contactAgentController.removeContactAgent
)

module.exports = router