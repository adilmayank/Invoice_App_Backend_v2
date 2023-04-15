class QuotationSummary {
  constructor(quotationSummaryRepository, quotationLineItemRepository = null) {
    this.quotationSummaryRepository = quotationSummaryRepository
  }

  async getAllQuotationSummaries() {
    try {
      const allQuotations = this.quotationSummaryRepository.getAllQuotations()
      return allQuotations
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getSingleQuotation(quotationId) {
    try {
      const singleQuotation =
        await this.quotationSummaryRepository.getSingleQuotation(quotationId)
      return singleQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createQuotation (data){
    try {
      const newQuotation =
        await this.quotationSummaryRepository.createQuotation(data)
      return newQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateSingleQuotation(quotationId, data) {
    try {
      const updatedQuotation =
        await this.quotationSummaryRepository.updateSingleQuotation(
          quotationId,
          data
        )
        if (updatedQuotation === null) {
          throw new Error("No record found with this quotation id.")
        }
      return updatedQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateQuotationStatus(quotationId, status) {
    try {
      const updatedQuotation =
        await this.quotationSummaryRepository.updateQuotationStatus(
          quotationId,
          status
        )
      return updatedQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async sendQuotation(quotationId) {
    try {
      // send quotation through a mailing service
      // if email sent successfully then
      const sentQuotation = await this.updateQuotationStatus(
        quotationId,
        'sent'
      )
      return sentQuotation

      // else
      // throw new Error("Error while sending email.")
    } catch (error) {
      throw new Error(error.message)
    }
  }

}

module.exports = { QuotationSummary }
