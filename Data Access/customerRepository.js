class CustomerRepository {
  constructor(customerModel) {
    this.customerModel = customerModel
  }

  async getAllCustomers() {
    const allCustomers = await this.customerModel.find({}).lean()
    return allCustomers
  }

  async createNewCustomer(data) {
    try {
      const newCustomer = await this.customerModel({ ...data }).save()
      return newCustomer
    } catch (error) {
      return new Error(error.message)
    }
  }

  async getSingleCustomerByProperty({ property, value }) {
    try {
      const filter = {}
      filter[property] = value
      const customerRecord = await this.customerModel.findOne(filter).lean()
      if (customerRecord === null) {
        return new Error('No records found.')
      }
      return customerRecord
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateCustomer(id, data) {
    try {
      const updatedCustomer = await this.customerModel
        .findByIdAndUpdate(id, { ...data }, { new: true })
        .lean()
      return updatedCustomer
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateActivationStatus(id, isActiveStatus) {
    try {
      const updateCustomer = await this.customerModel
        .findByIdAndUpdate(id, { isActive: isActiveStatus }, { new: true })
        .lean()
      return updateCustomer
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = { CustomerRepository }
