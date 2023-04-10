const { customerInputFields } = require('../Utils/InputFields')

class Customer {
  constructor(customersRepository) {
    this.customersRepository = customersRepository
  }

  validation(type) {
    if (type === 'create') {
      if (!this.firstName || !this.contactNumber) {
        throw new Error('First name and Contact number is mandatory')
      }
      return this
    }

    if (type === 'update') {
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
        await this.customersRepository.updateActivationStatus(id, isActiveStatus)
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
    this.validation.call(this, 'create')
    try {
      const validatedData = this.validation.call(this, 'create')
      const newCustomerData = await this.customersRepository.createNewCustomer(
        validatedData
      )
      return newCustomerData
    } catch (error) {
      return new Error(error.message)
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

module.exports = { Customer }
