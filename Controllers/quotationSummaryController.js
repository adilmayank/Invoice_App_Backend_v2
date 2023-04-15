class QuotationSummaryController {
  constructor(quotationSummaryService) {
    this.quotationSummaryService = quotationSummaryService
  }

  getAllQuotationSummaries = async (req, res) => {
    try {
      const allQuotationSummaries =
        await this.quotationSummaryService.getAllQuotationSummaries()
      res.formattedJson(
        null,
        true,
        'Fetched all quotation summaries',
        allQuotationSummaries
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  getSingleQuotation = async (req, res) => {
    const { id } = req.params

    try {
      const singleQuotation =
        await this.quotationSummaryService.getSingleQuotation(id)
      res.formattedJson(
        null,
        true,
        'Quotation fetched successfully',
        singleQuotation
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  createQuotation = async (req, res) => {
    const { data } = req.body

    try {
      // some validations
      const newQuotation = await this.quotationSummaryService.createQuotation(
        data
      )
      res.formattedJson(
        null,
        true,
        'Quotation created successfully',
        newQuotation
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  updateSingleQuotation = async (req, res) => {
    const { id, data } = req.body

    try {
      // some validation before sending data to service to process
      // ...validation steps
      const updatedQuotation =
        await this.quotationSummaryService.updateSingleQuotation(id, data)
      res.formattedJson(
        null,
        true,
        'Quotation summary updated successfully',
        updatedQuotation
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  updateQuotationStatusDraft = async (req, res) => {
    const { id } = req.params
    try {
      const updatedQuotation =
        await this.quotationSummaryService.updateQuotationStatus(id, 'draft')
      res.formattedJson(
        null,
        true,
        'Quotation status marked as draft',
        updatedQuotation
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  sendQuotation = async (req, res) => {
    const { id } = req.params
    try {
      const updatedQuotation = await this.quotationSummaryService.sendQuotation(
        id
      )
      res.formattedJson(
        null,
        true,
        'Quotation successfully sent',
        updatedQuotation
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  updateQuotationStatusAccepted = async (req, res) => {
    const { id } = req.params
    try {
      const updatedQuotation =
        await this.quotationSummaryService.updateQuotationStatus(id, 'accepted')
      res.formattedJson(
        null,
        true,
        'Quotation status marked as accepted',
        updatedQuotation
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  updateQuotationStatusRejected = async (req, res) => {
    const { id } = req.params
    try {
      const updatedQuotation =
        await this.quotationSummaryService.updateQuotationStatus(id, 'rejected')
      res.formattedJson(
        null,
        true,
        'Quotation status marked as rejected',
        updatedQuotation
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }
}

module.exports = { QuotationSummaryController }
