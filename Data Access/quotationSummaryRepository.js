class QuotationSummaryRepository {
  constructor(quotationSummaryModel) {
    this.quotationSummaryModel = quotationSummaryModel
  }

  async getAllQuotations() {
    try {
      const allQuotationSummaries = await this.quotationSummaryModel
        .find({})
        .lean()
      return allQuotationSummaries
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getSingleQuotation(quotationId) {
    try {
      const singleQuotation = await this.quotationSummaryModel
        .findById(quotationId)
        .populate({ path: 'customerId', select: '-_id' })
        .populate({ path: 'tax', select: 'name rate -_id' })
        .lean()
      return singleQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createQuotation(data) {
    try {
      const newQuotation = await this.quotationSummaryModel(data).save()

      if (newQuotation === null) {
        throw new Error(newQuotation.message)
      }
      return newQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateSingleQuotation(quotationId, data) {
    try {
      console.log(data)
      const updatedQuotation = await this.quotationSummaryModel
        .findByIdAndUpdate(quotationId, data, { new: true })
        .lean()
      return updatedQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateQuotationStatus(quotationId, status) {
    try {
      const updatedQuotation = await this.quotationSummaryModel
        .findByIdAndUpdate(quotationId, { status: status }, { new: true })
        .lean()
      return updatedQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = { QuotationSummaryRepository }
