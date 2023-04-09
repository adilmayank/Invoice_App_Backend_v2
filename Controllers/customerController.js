class CustomerController {
  constructor(customerService) {
    this.customerService = customerService
  }

  getAllCustomers = (req, res) => {
    try {
      const allCustomer = this.customerService.getAllCustomers()
      res.formattedJson(null, true, 'Done', allCustomer)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  getSingleCustomer = (req, res) => {
    const { id } = req.params

    try {
      const singleCustomer = this.customerService.getSingleCustomer(id)
      res.formattedJson(null, true, 'done', singleCustomer)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  updateSingleCustomer = (req, res) => {
    const { id, data } = req.body

    try {
      const updatedCustomer = this.customerService.updateCustomer(id, data)
      res.formattedJson(null, true, 'done', updatedCustomer)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  updateActivatedStatus = (req, res) => {
    const { id, activatedStatus } = req.body

    try {
      const updateStatus = this.customerService.updateActivatedStatus(id, activatedStatus)
      res.formattedJson(null, true, 'Status updated successfully', updateStatus)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  createNewCustomer = (req, res) => {
    const { data } = req.body

    try {
      const newCustomer = this.customerService.createNewCustomer(data)
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
}

module.exports = {
  CustomerController
}
