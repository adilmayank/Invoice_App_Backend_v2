const { customerInputFields } = require('../Utils/InputFields')

const demoCustomer = [
  { id: 1, name: 'Customer 1' },
  { id: 2, name: 'Customer 2' },
  { id: 3, name: 'Customer 3' },
  { id: 4, name: 'Customer 4' },
]

class Customer {
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

  getAllCustomers() {
    return demoCustomer
  }

  getSingleCustomer(id) {
    const parsedId = parseInt(id)
    const filteredCustomer = demoCustomer.filter((item) => {
      if (item.id === parsedId) {
        return item
      }
    })
    if (filteredCustomer.length === 0) {
      throw new Error('No customer with this id found.')
    }
    return filteredCustomer
  }

  updateCustomer(id, data) {
    const transformedData = transformIncomingData(data)

    try {
      const validatedData = this.validation.call(transformedData, 'update')
      return validatedData
    } catch (error) {
      throw new Error(error.message)
    }
  }

  updateActivatedStatus(id, activatedStatus) {
    return { id, activatedStatus }
  }

  createNewCustomer(data) {
    const transformedData = transformIncomingData(data)
    for (let field of customerInputFields) {
      this[field] = transformedData[field]
    }
    this.validation.call(this, 'create')
    try {
      const validatedData = this.validation.call(this, 'create')
      return validatedData
    } catch (error) {
      throw new Error(error.message)
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
