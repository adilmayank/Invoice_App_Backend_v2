class QuotationSummary {
  constructor(
    quotationSummaryRepository,
    quotationLineItemRepository = null,
    productRepository = null
  ) {
    this.quotationSummaryRepository = quotationSummaryRepository
    this.quotationLineItemRepository = quotationLineItemRepository
    this.productRepository = productRepository
  }

  async getAllQuotations() {
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
      //adding sub total field
      singleQuotation.subTotal = singleQuotation.products.reduce(
        (intialValue, product) => {
          return intialValue + product.total
        },
        0
      )
      // calculate tax
      // calculate grand total
      return singleQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createQuotation(quotationData, lineItemData) {
    try {
      const newQuotation =
        await this.quotationSummaryRepository.createQuotation(quotationData)

      const quotationId = newQuotation._id.toString()

      await this.addProductsToQuotationLineItem(quotationId, lineItemData)

      const createdQuotation = await this.getSingleQuotation(quotationId)

      return createdQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateSingleQuotation(
    quotationId,
    quotationData,
    itemsToAdd = null,
    itemsToRemove = null,
    itemsToUpdate = null
  ) {
    try {
      const updatedQuotation =
        await this.quotationSummaryRepository.updateSingleQuotation(
          quotationId,
          quotationData
        )
      if (updatedQuotation === null) {
        throw new Error('No record found with this quotation id.')
      }

      if (itemsToRemove.length > 0) {
        await this.removeProductsFromQuotationLineItem(itemsToRemove)
      }
      if (itemsToUpdate.length > 0) {
        await this.updateProductsInQuotationLineItem(itemsToUpdate)
      }
      if (itemsToAdd.length > 0) {
        await this.addProductsToQuotationLineItem(quotationId, itemsToAdd)
      }

      return updatedQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateQuotationStatusDraft(quotationId) {
    try {
      const statusObject = { status: 'draft' }
      const updatedQuotation =
        await this.quotationSummaryRepository.updateSingleQuotation(
          quotationId,
          statusObject
        )
      return updatedQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateQuotationStatusAccepted(quotationId) {
    try {
      const statusObject = { status: 'accepted' }
      const updatedQuotation =
        await this.quotationSummaryRepository.updateSingleQuotation(
          quotationId,
          statusObject
        )
      return updatedQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateQuotationStatusRejected(quotationId) {
    try {
      const statusObject = { status: 'rejected' }
      const updatedQuotation =
        await this.quotationSummaryRepository.updateSingleQuotation(
          quotationId,
          statusObject
        )
      return updatedQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateQuotationStatusSent(quotationId) {
    try {
      const statusObject = { status: 'sent' }
      const updatedQuotation =
        await this.quotationSummaryRepository.updateSingleQuotation(
          quotationId,
          statusObject
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
      const sentQuotation = await this.updateQuotationStatusSent(quotationId)
      return sentQuotation

      // else
      // throw new Error("Error while sending email.")
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addProductsToQuotationLineItem(quotationId, lineItemData) {
    try {
      const productIds = lineItemData.map((lineItem) => {
        return lineItem.productId
      })
      const productsData = await this.getProductsToInsert(productIds)
      // adding quotationId and total to each object in the array
      const updatedLineItemData = lineItemData.map((lineItem) => {
        productsData.map((productItem) => {
          const pId = productItem._id.toString()
          if (pId === lineItem.productId) {
            lineItem.quotationId = quotationId
            lineItem.code = productItem.code
            lineItem.description = productItem.description
            lineItem.unitPrice = productItem.unitPrice
            lineItem.total = lineItem.quantity * productItem.unitPrice
          }
        })
        return lineItem
      })

      if (!updatedLineItemData) {
        // remove quotation
        throw new Error('Line Items Could not be generated')
      }
      await this.quotationLineItemRepository.addLineItems(updatedLineItemData)

      return true
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async removeProductsFromQuotationLineItem(productsToRemove) {
    try {
      const lineItemIds = [...productsToRemove]
      const removedLineItems =
        await this.quotationLineItemRepository.removeLineItems(lineItemIds)
      const message = `${removedLineItems.deleteCount} records deleted.`
      return message
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateProductsInQuotationLineItem(productsToUpdate) {
    try {
      await this.quotationLineItemRepository.updateLineItems(productsToUpdate)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getProductsToInsert(productIds) {
    try {
      const filterOptions = { name: '_id', values: productIds }
      const productsData = await this.productRepository.getFilteredProducts(
        filterOptions
      )
      return productsData
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = { QuotationSummary }
