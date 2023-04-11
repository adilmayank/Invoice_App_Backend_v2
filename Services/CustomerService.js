const { customerInputFields } = require('../Utils/InputFields')

class Customer {
  constructor(customersRepository, contactAgentsRepository = null) {
    this.customersRepository = customersRepository
    this.contactAgentsRepository = contactAgentsRepository
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

  async getAllCustomers() {
    try {
      const allCustomersData = await this.customersRepository.getAllCustomers()
      return allCustomersData
    } catch (error) {
      return new Error('An error occured')
    }
  }

  async getSingleCustomer(id) {
    try {
      const customerRecord =
        await this.customersRepository.getSingleCustomerByProperty({
          property: '_id',
          value: id,
        })
      return customerRecord
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateCustomer(id, data) {
    const transformedData = transformIncomingData(data)

    try {
      const validatedData = this.validation.call(transformedData, 'update')
      const updatedCustomer = await this.customersRepository.updateCustomer(
        id,
        validatedData
      )
      return updatedCustomer
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateActivatedStatus(id, isActiveStatus) {
    try {
      const updatedCustomer =
        await this.customersRepository.updateActivationStatus(
          id,
          isActiveStatus
        )
      return updatedCustomer
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createNewCustomer(data) {
    const transformedData = transformIncomingData(data)
    for (let field of customerInputFields) {
      this[field] = transformedData[field]
    }
    try {
      if (this.contactAgentsRepository) {
        // create contact agent and get its _id
      }

      const validatedData = this.validation.call(transformedData, 'create')
      const newCustomerData = await this.customersRepository.createNewCustomer(
        validatedData
      )
      return newCustomerData
    } catch (error) {
      return new Error(error.message)
    }
  }

  async addContactAgent(id, data) {
    try {
      const { contactAgentId } = data
      const isAgentIdValid = await this.checkIfContactAgentExist(contactAgentId)
      if (isAgentIdValid instanceof Error) {
        throw new Error(isAgentIdValid.message)
      }
      const updatedCustomer =
        await this.customersRepository.addOrRemoveContactAgent(
          'add',
          id,
          contactAgentId
        )
      if (updatedCustomer instanceof Error) {
        throw new Error(updatedCustomer.message)
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async removeContactAgent(id, agentId) {
    try {
      const isAgentIdValid = await this.checkIfContactAgentExist(agentId)
      if (isAgentIdValid instanceof Error) {
        throw new Error(isAgentIdValid.message)
      }
      const updatedCustomer =
        await this.customersRepository.addOrRemoveContactAgent(
          'remove',
          id,
          agentId
        )
      if (updatedCustomer instanceof Error) {
        throw new Error(updatedCustomer.message)
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async checkIfContactAgentExist(agentId) {
    try {
      const contactAgentDetail =
        await this.contactAgentsRepository.getSingleContactAgent(agentId)
      if (contactAgentDetail instanceof Error) {
        return new Error(contactAgentDetail.message)
      }
      return true
    } catch (error) {}
  }
}

const transformIncomingData = (incomingData) => {
  const transformedData = {}
  console.log(incomingData)

  for (let field of customerInputFields) {
    if (incomingData.hasOwnProperty(field)) {
      transformedData[field] = incomingData[field]
    }
  }

  return transformedData
}

module.exports = { Customer }
