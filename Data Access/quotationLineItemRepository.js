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
      return removedLineItems
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateLineItems(lineItemsArray) {
    try {
      const updateOperation = lineItemsArray.map((lineItem) => {
        const lineItemId = lineItem.lineItemId
        const dataToUpdate = lineItem.dataToUpdate
        return {
          updateOne: {
            filter: {
              _id: lineItemId,
            },
            update: {
              $set: {
                unitPrice: dataToUpdate.unitPrice,
                quantity: dataToUpdate.quantity,
                total: dataToUpdate.quantity * dataToUpdate.unitPrice,
              },
            },
          },
        }
      })
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
