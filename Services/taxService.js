class Tax {
  constructor(taxRepository) {
    this.taxRepository = taxRepository
  }

  async getAllTaxes() {
    try {
      const allTaxes = this.taxRepository.getAllTaxes()
      return allTaxes
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async createTax(taxCreationData) {
    try {
      const {name, rate} = taxCreationData
      const validatedData = {name, rate} // later this data will be validated according to some business rule
      const newTax = await this.taxRepository.createTax(
        validatedData
      )
      return newTax
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateTax(id, taxUpdationData) {
    try {
      const {name, rate} = taxUpdationData
      const validatedData = {name, rate} // later this data will be validated according to some business rule
      const updatedTax = await this.taxRepository.updateTax(
        id, validatedData
      )
      return updatedTax
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async removeTax(id) {
    try {
      const removedTax =
        await this.taxRepository.removeTax(id)
      return removedTax
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = { Tax }
