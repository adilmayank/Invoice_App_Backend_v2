class TaxRepository {
  constructor(taxModel) {
    this.taxModel = taxModel
  }

  async getAllTaxes() {
    try {
      const allTaxes = await this.taxModel.find({}).lean()
      return allTaxes
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createTax(data) {
    const { name, rate } = data
    try {
      const newTax = await this.taxModel({
        name,
        rate,
      }).save()
      return newTax._id
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateTax(taxId, data) {
    const { name, rate } = data
    try {
      const updatedTax = await this.taxModel
        .findByIdAndUpdate(taxId, { name, rate }, { new: true })
        .lean()
      return updatedTax
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async removeTax(taxId) {
    try {
      const removedTax = await this.taxModel.findByIdAndRemove(taxId)
      if (removedTax === null) {
        return new Error('No record found with the provided id.')
      }
      return removedTax
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = { TaxRepository }
