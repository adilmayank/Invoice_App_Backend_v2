class QuotationSummaryController {
  constructor(quotationSummaryService) {
    this.quotationSummaryService = quotationSummaryService
  }

  getAllQuotations = async (req, res) => {
    try {
      const allQuotations =
        await this.quotationSummaryService.getAllQuotations()
      res.formattedJson(null, true, 'Fetched all quotations', allQuotations)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  getSingleQuotation = async (req, res) => {
    try {
      const { id } = req.params
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
    try {
      const { data } = req.body
      // controller level validation steps which will either return validated data or throw an error
      // const validatedData = someValidationFunction(data)
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
    try {
      const { id, data } = req.body
      // controller level validation steps which will either return validated data or throw an error
      // const validatedData = someValidationFunction(data)
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

  updateQuotationStatus = async (req, res) => {
    try {
      const { id } = req.params
      const { status } = req.body.data
      let updatedQuotation
      if (status === 'draft') {
        updatedQuotation =
          await this.quotationSummaryService.updateQuotationStatusDraft(id)
      } else if (status === 'accepted') {
        updatedQuotation =
          await this.quotationSummaryService.updateQuotationStatusAccepted(id)
      } else if (status === 'rejected') {
        updatedQuotation =
          await this.quotationSummaryService.updateQuotationStatusRejected(id)
      }
      res.formattedJson(
        null,
        true,
        `Quotation status marked as ${status}`,
        updatedQuotation
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  sendQuotation = async (req, res) => {
    try {
      const { id } = req.params
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
}

module.exports = { QuotationSummaryController }
