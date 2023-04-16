class PaymentTermController {
  constructor(paymentTermService) {
    this.paymentTermService = paymentTermService
  }

  getAllPaymentTerms = async (req, res) => {
    try {
      const allPaymentTerms = await this.paymentTermService.getAllPaymentTerms()
      res.formattedJson(
        null,
        true,
        'Fetched all payment terms',
        allPaymentTerms
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  addPaymentTerm = async (req, res) => {
    try {
      const { data } = req.body
      // some controller validation step that return validated data or throws an error
      const validatedData = { ...data }
      const newPaymentTerm = await this.paymentTermService.addPaymentTerm(
        validatedData
      )
      res.formattedJson(
        null,
        true,
        'Payment Term Created successfully',
        newPaymentTerm
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  removePaymentTerm = async (req, res) => {
    
    try {
      const { id } = req.body
      const removedPaymentTerm =
        await this.paymentTermService.removePaymentTerm(id)
      if (removedPaymentTerm instanceof Error) {
        throw new Error(removedPaymentTerm.message)
      } else {
        res.formattedJson(
          null,
          true,
          'Payment Term Removed Successfully',
          removedPaymentTerm
        )
      }
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }
}

module.exports = { PaymentTermController }
