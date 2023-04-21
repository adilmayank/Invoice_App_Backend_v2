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
      const { quotationId } = req.params
      const singleQuotation =
        await this.quotationSummaryService.getSingleQuotation(quotationId)
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
      const data = req.body
      const { quotationData, lineItemData } = data

      // controller level validation steps which will either return validated data or throw an error
      // const validatedData = someValidationFunction(data)
      const newQuotation = await this.quotationSummaryService.createQuotation(
        quotationData,
        lineItemData
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
      const { quotationId } = req.params
      const data = req.body
      const {
        lineItemData: { toAdd, toRemove, toUpdate },
        quotationData,
      } = data

      // controller level validation steps which will either return validated data or throw an error
      // const validatedData = someValidationFunction(data)
      const updatedQuotation =
        await this.quotationSummaryService.updateSingleQuotation(
          quotationId,
          quotationData,
          toAdd,
          toRemove,
          toUpdate
        )
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
      const { quotationId } = req.params
      const { status } = req.body
      let updatedQuotation
      if (status === 'draft') {
        updatedQuotation =
          await this.quotationSummaryService.updateQuotationStatusDraft(quotationId)
      } else if (status === 'accepted') {
        updatedQuotation =
          await this.quotationSummaryService.updateQuotationStatusAccepted(quotationId)
      } else if (status === 'rejected') {
        updatedQuotation =
          await this.quotationSummaryService.updateQuotationStatusRejected(quotationId)
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
      const { quotationId } = req.params
      const updatedQuotation = await this.quotationSummaryService.sendQuotation(
        quotationId
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
