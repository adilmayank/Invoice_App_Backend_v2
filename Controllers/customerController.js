class CustomerController {
  constructor(customerService) {
    this.customerService = customerService
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
      const { id } = req.params
      const singleCustomer = await this.customerService.getSingleCustomer(id)

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
      const { id, data } = req.body
      // some controller validation steps that will either return an validated data or throw an error
      const validatedData = { ...data }
      const updatedCustomer = await this.customerService.updateCustomer(
        id,
        validatedData
      )
      res.formattedJson(null, true, 'done', updatedCustomer)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  updateActivatedStatus = async (req, res) => {
    try {
      const { id, isActiveStatus } = req.body
       // some controller validation steps that will either check whether isActiveStatus is boolean or throw an error
      const updatedCustomer = await this.customerService.updateActivatedStatus(
        id,
        isActiveStatus
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
      const { data } = req.body
      // some controller validation steps that will either return an validated data or throw an error
      const newCustomer = await this.customerService.createNewCustomer(data)
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
      const { id: customerId } = req.params
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
      const { id: customerId, agentId: contactAgentId } = req.params
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

module.exports = {
  CustomerController,
}
