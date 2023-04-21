class TaxController {
  constructor(taxService) {
    this.taxService = taxService
  }

  getAllTaxes = async (req, res) => {
    try {
      const allTaxes = await this.taxService.getAllTaxes()
      res.formattedJson(null, true, 'Fetched all taxes', allTaxes)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  createTax = async (req, res) => {
    try {
      const { name, rate } = req.body
      // some validation
      const validatedData = { name, rate }
      const newTax = await this.taxService.createTax(validatedData)
      res.formattedJson(null, true, 'Tax Created successfully', newTax)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  updateTax = async (req, res) => {
    try {
      const { taxId } = req.params
      const { name, rate } = req.body
      // some validation
      const validatedData = { name, rate }
      const updatedTax = await this.taxService.updateTax(taxId, validatedData)
      res.formattedJson(null, true, 'Tax updated successfully', updatedTax)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  removeTax = async (req, res) => {
    try {
      const { taxId } = req.params
      const removedTax = await this.taxService.removeTax(taxId)
      res.formattedJson(null, true, 'Tax item removed successfully', removedTax)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }
}

module.exports = { TaxController }
