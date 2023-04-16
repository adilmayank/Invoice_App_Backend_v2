class QuotationLineItemRepository {
  constructor(quotationLineItemModel) {
    this.quotationLineItemModel = quotationLineItemModel
  }

  async addLineItems(lineItemsArray) {
    // lineItemsArray is an array of objects with this structure
    // {
    //   quotationId: null,
    //   productId: null,
    //   productCode: null,
    //   productDescription: null,
    //   unitPrice: null,
    //   quantity: null,
    //   total: number,
    // }
    try {
      const result = await this.quotationLineItemModel.create(lineItemsArray)
      return true
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async removeLineItems(lineItemsIdArray) {
    try {
      const removedLineItems = await this.quotationLineItemModel.deleteMany({
        _id: { $in: lineItemsIdArray },
      })
      console.log(removedLineItems)
      return removedLineItems
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateLineItems(updateOperation) {
    try {
      const updatedLineItems = await this.quotationLineItemModel.bulkWrite(
        updateOperation
      )
      return updatedLineItems
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = { QuotationLineItemRepository }
