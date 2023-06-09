class PaymentTerm {
  constructor(paymentTermRepository) {
    this.paymentTermRepository = paymentTermRepository
  }

  async getAllPaymentTerms() {
    try {
      const allPaymentTerms = this.paymentTermRepository.getAllPaymentTerms()
      return allPaymentTerms
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addPaymentTerm(data) {
    try {
      const { name, description } = data
      const validatedData = { name, description }
      const newPaymentTerm = await this.paymentTermRepository.addPaymentTerm(
        validatedData
      )
      return newPaymentTerm
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async removePaymentTerm(paymentTermId) {
    try {
      const removedPaymentTerm =
        await this.paymentTermRepository.removePaymentTerm(paymentTermId)
      return removedPaymentTerm
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = { PaymentTerm }
