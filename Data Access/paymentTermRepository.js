class PaymentTermRepository {
  constructor(paymentTermModel) {
    this.paymentTermModel = paymentTermModel
  }

  async getAllPaymentTerms() {
    try {
      const allPaymentTerms = await this.paymentTermModel.find({}).lean()
      return allPaymentTerms
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addPaymentTerm(data) {
    const { name, description } = data
    try {
      const newPaymentTerm = await this.paymentTermModel({
        name,
        description,
      }).save()
      return newPaymentTerm._id
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async removePaymentTerm(id) {
    try {
      const removedPaymentTerm = await this.paymentTermModel.findByIdAndRemove(
        id
      )
      if (removedPaymentTerm === null) {
        return new Error('No record found with the provided id.')
      }
      return removedPaymentTerm
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = { PaymentTermRepository }
