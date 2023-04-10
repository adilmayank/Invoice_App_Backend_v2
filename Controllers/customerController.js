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
    const { id } = req.params

    try {
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
    const { id, data } = req.body

    try {
      const updatedCustomer = await this.customerService.updateCustomer(
        id,
        data
      )
      res.formattedJson(null, true, 'done', updatedCustomer)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  updateActivatedStatus = async (req, res) => {
    const { id, isActiveStatus } = req.body

    try {
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
    const { data } = req.body

    try {
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
}

module.exports = {
  CustomerController,
}
