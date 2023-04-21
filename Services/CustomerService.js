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

  async getSingleCustomer(customerId) {
    try {
      const customerRecord =
        await this.customersRepository.getSingleCustomerByProperty({
          property: '_id',
          value: customerId,
        })
      return customerRecord
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateCustomer(customerId, data) {
    try {
      const updatedCustomer = await this.customersRepository.updateCustomer(
        customerId,
        data
      )
      return updatedCustomer
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateActivatedStatus(customerId, isActiveStatus) {
    try {
      const updatedCustomer =
        await this.customersRepository.updateActivationStatus(
          customerId,
          isActiveStatus
        )
      return updatedCustomer
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createNewCustomer(data) {
    try {
      if (this.contactAgentsRepository) {
        // create contact agent and get its _id
      }
      const newCustomerData = await this.customersRepository.createNewCustomer(
        data
      )
      return newCustomerData
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addContactAgent(customerId, contactAgentId) {
    try {
      const isAgentIdValid = await this.checkIfContactAgentExist(contactAgentId)
      if (isAgentIdValid instanceof Error) {
        throw new Error(isAgentIdValid.message)
      }
      const updatedCustomer =
        await this.customersRepository.addOrRemoveContactAgent(
          'add',
          customerId,
          contactAgentId
        )
      if (updatedCustomer instanceof Error) {
        throw new Error(updatedCustomer.message)
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async removeContactAgent(customerId, contactAgentId) {
    try {
      const isAgentIdValid = await this.checkIfContactAgentExist(contactAgentId)
      if (isAgentIdValid instanceof Error) {
        throw new Error(isAgentIdValid.message)
      }
      const updatedCustomer =
        await this.customersRepository.addOrRemoveContactAgent(
          'remove',
          customerId,
          contactAgentId
        )
      if (updatedCustomer instanceof Error) {
        throw new Error(updatedCustomer.message)
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async checkIfContactAgentExist(contactAgentId) {
    try {
      const contactAgentDetail =
        await this.contactAgentsRepository.getSingleContactAgent(contactAgentId)
      if (contactAgentDetail instanceof Error) {
        return new Error(contactAgentDetail.message)
      }
      return true
    } catch (error) {}
  }
}

module.exports = { Customer }
