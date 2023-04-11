class PaymentTermController {
  constructor(paymentTermService) {
    this.paymentTermService = paymentTermService
  }

  getAllPaymentTerms = async(req, res) => {
    try{
      const allPaymentTerms = await this.paymentTermService.getAllPaymentTerms()
      res.formattedJson(
        null,
        true,
        'Fetched all payment terms',
        allPaymentTerms
      )
    } catch(error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  addPaymentTerm = async (req, res) => {
    const { data } = req.body

    try {
      const newPaymentTerm = await this.paymentTermService.addPaymentTerm(
        data
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
    const { data } = req.body

    try {
      const removedPaymentTerm =
        await this.paymentTermService.removePaymentTerm(data)
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
