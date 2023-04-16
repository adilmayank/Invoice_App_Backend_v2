class QuotationLineItem {
  constructor(quotationLineItemRepository) {
    this.quotationLineItemRepository = quotationLineItemRepository
  }

  // data validation logic here
  validation(type) {}

  async addLineItem(data) {
    try {
      const result = await this.quotationLineItemRepository.addLineItem(data)
      return result
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = { QuotationLineItem }
