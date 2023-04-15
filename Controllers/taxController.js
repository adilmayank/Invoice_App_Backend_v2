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
    const { data } = req.body

    try {
      const newTax = await this.taxService.createTax(data)
      res.formattedJson(null, true, 'Tax Created successfully', newTax)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  updateTax = async (req, res) => {
    try {
      const { id, data } = req.body
      const updatedTax = await this.taxService.updateTax(id, data)
      res.formattedJson(null, true, 'Tax updated successfully', updatedTax)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  removeTax = async (req, res) => {
    const { id } = req.body.data

    try {
      const removedTax = await this.taxService.removeTax(id)
      res.formattedJson(null, true, 'Tax item removed successfully', removedTax)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }
}

module.exports = { TaxController }
