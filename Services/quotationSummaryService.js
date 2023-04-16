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

  async createQuotation(data) {
    try {
      const { quotationData, lineItemData } = data
      const newQuotation =
        await this.quotationSummaryRepository.createQuotation(quotationData)

      // at this point quotation is created
      const quotationId = newQuotation._id.toString()

      await this.addProductsToQuotationLineItem(quotationId, lineItemData)

      return quotationId
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateSingleQuotation(quotationId, data) {
    try {
      const {
        productsToAdd,
        productsToRemove,
        productsToUpdate,
        dataToUpdate,
      } = data
      if (productsToRemove) {
        await this.removeProductsFromQuotationLineItem(productsToRemove)
      }
      if (productsToUpdate) {
        await this.updateProductsInQuotationLineItem(productsToUpdate)
      }
      if (productsToAdd) {
        await this.addProductsToQuotationLineItem(quotationId, productsToAdd)
      }

      const updatedQuotation =
        await this.quotationSummaryRepository.updateSingleQuotation(
          quotationId,
          dataToUpdate
        )
      if (updatedQuotation === null) {
        throw new Error('No record found with this quotation id.')
      }
      return updatedQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateQuotationStatusDraft(quotationId) {
    try {
      const updatedQuotation =
        await this.quotationSummaryRepository.updateQuotationStatus(
          quotationId,
          'draft'
        )
      return updatedQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateQuotationStatusAccepted(quotationId) {
    try {
      const updatedQuotation =
        await this.quotationSummaryRepository.updateQuotationStatus(
          quotationId,
          'accepted'
        )
      return updatedQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateQuotationStatusRejected(quotationId) {
    try {
      const updatedQuotation =
        await this.quotationSummaryRepository.updateQuotationStatus(
          quotationId,
          'rejected'
        )
      return updatedQuotation
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateQuotationStatusSent(quotationId) {
    try {
      const updatedQuotation =
        await this.quotationSummaryRepository.updateQuotationStatus(
          quotationId,
          'sent'
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
      const productsToInsert = await this.getProductsToInsert(lineItemData)
      // return null
      // if lineItemData is present, then add then to the quotation line collection
      if (lineItemData) {
        const lineItems = await this.quotationLineItemRepository.addLineItems(
          updatedLineItemData
        )
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async removeProductsFromQuotationLineItem(productsToRemove) {
    try {
      await this.quotationLineItemRepository.removeLineItems(productsToRemove)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateProductsInQuotationLineItem(productsToUpdate) {
    try {
      const productsToInsert = await this.getProductsToInsert(productsToUpdate)
      console.log(productsToInsert)
      const updateOperation = productsToInsert.map((lineItem) => {
        return {
          updateOne: {
            filter: {
              _id: lineItem.lineItemId,
            },
            update: {
              $set: {
                unitPrice: lineItem.unitPrice,
                quantity: lineItem.quantity,
                total: lineItem.total,
              },
            },
          },
        }
      })

      await this.quotationLineItemRepository.updateLineItems(updateOperation)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getProductsToInsert(lineItemData) {
    try {
      const productIds = lineItemData.map((lineItem) => {
        return lineItem.productId
      })
      const filterOptions = { name: '_id', values: productIds }
      const productsData = await this.productRepository.getFilteredProducts(
        filterOptions
      )
      // adding quotationId and total to each object in the array
      const updatedLineItemData = lineItemData.map((lineItem) => {
        productsData.map((productItem) => {
          const pId = productItem._id.toString()
          if (pId === lineItem.productId) {
            if (lineItem.quotationId) {
              lineItem.quotationId = quotationId
            }
            lineItem.code = productItem.code
            lineItem.description = productItem.description
            lineItem.unitPrice = productItem.unitPrice
            lineItem.total = lineItem.quantity * productItem.unitPrice
          }
        })
        return lineItem
      })
      return updatedLineItemData
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = { QuotationSummary }
