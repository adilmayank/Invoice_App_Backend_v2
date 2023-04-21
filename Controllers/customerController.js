const { customerInputFields } = require('../Utils/InputFields')

class CustomerController {
  constructor(customerService) {
    this.customerService = customerService
  }

  validation(type) {
    if (type === 'create') {
      if (!this.name) {
        throw new Error('Customer name is mandatory')
      }
      if (!this.email) {
        throw new Error('Customer email is mandatory')
      }
      if (!this.phone) {
        throw new Error('Customer phone is mandatory')
      }
      if (!this.uniqueBusinessIdentifier) {
        throw new Error('Customer Unique Business Identifier is mandatory')
      }
      if (!this.address) {
        throw new Error('Customer address is mandatory')
      }
      return this
    }

    if (type === 'update') {
      // wait
      if (
        this.firstName === '' ||
        this.firstName === null ||
        this.contactNumber === '' ||
        this.contactNumber === null
      ) {
        throw new Error(
          'First name or contact number can not be null or empty values'
        )
      }
      return this
    }
  }

  getAllCustomers = async (req, res) => {
    try {
      const allCustomer = await this.customerService.getAllCustomers()
      res.formattedJson(null, true, 'Done', allCustomer)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  getSingleCustomer = async (req, res) => {
    try {
      const { customerId } = req.params
      const singleCustomer = await this.customerService.getSingleCustomer(
        customerId
      )

      if (!singleCustomer) {
        res.formattedJson(null, true, 'no record found', singleCustomer)
      } else {
        res.formattedJson(null, true, 'done', singleCustomer)
      }
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  updateSingleCustomer = async (req, res) => {
    try {
      const { customerId } = req.params
      const data = req.body
      const transformedData = transformIncomingData(data)
      const validatedData = this.validation.call(transformedData, 'update')
      // some controller validation steps that will either return an validated data or throw an error
      const updatedCustomer = await this.customerService.updateCustomer(
        customerId,
        validatedData
      )
      res.formattedJson(null, true, 'done', updatedCustomer)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  activateCustomer = async (req, res) => {
    try {
      const { customerId } = req.params
      // some controller validation steps that will either check whether isActiveStatus is boolean or throw an error
      const updatedCustomer = await this.customerService.updateActivatedStatus(
        customerId,
        true
      )
      res.formattedJson(
        null,
        true,
        'Status updated successfully',
        updatedCustomer
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  deactivateCustomer = async (req, res) => {
    try {
      const { customerId } = req.params
      // some controller validation steps that will either check whether isActiveStatus is boolean or throw an error
      const updatedCustomer = await this.customerService.updateActivatedStatus(
        customerId,
        false
      )
      res.formattedJson(
        null,
        true,
        'Status updated successfully',
        updatedCustomer
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  createNewCustomer = async (req, res) => {
    try {
      const  data  = req.body

      const transformedData = transformIncomingData(data)
      for (let field of customerInputFields) {
        this[field] = transformedData[field]
      }

      // some controller validation steps that will either return an validated data or throw an error
      const validatedData = this.validation.call(transformedData, 'create')
      const newCustomer = await this.customerService.createNewCustomer(
        validatedData
      )
      res.formattedJson(
        null,
        true,
        'Customer created successfully',
        newCustomer
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  addContactAgent = async (req, res) => {
    try {
      const { contactAgentId } = req.body
      const { customerId } = req.params
      const updatedCustomer = await this.customerService.addContactAgent(
        customerId,
        contactAgentId
      )
      res.formattedJson(
        null,
        true,
        'Contact agent added successfully',
        updatedCustomer
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  removeContactAgent = async (req, res) => {
    try {
      const { customerId, contactAgentId } = req.params
      const updatedCustomer = await this.customerService.removeContactAgent(
        customerId,
        contactAgentId
      )
      res.formattedJson(
        null,
        true,
        'Contact agent removed successfully',
        updatedCustomer
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }
}

const transformIncomingData = (incomingData) => {
  const transformedData = {}

  for (let field of customerInputFields) {
    if (incomingData.hasOwnProperty(field)) {
      transformedData[field] = incomingData[field]
    }
  }

  return transformedData
}

module.exports = {
  CustomerController,
}
