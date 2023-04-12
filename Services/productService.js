class Product {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  // data validation logic here
  validation(type) {}

  async getSingleProduct(productId) {
    try {
      const singleProduct = await this.productRepository.getSingleProduct(
        productId
      )
      return singleProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getAllProducts() {
    try {
      const allProducts = await this.productRepository.getAllProducts()
      return allProducts
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addProduct(data) {
    try {
      const newProduct = await this.productRepository.addProduct(data)
      return newProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateProduct(id, data) {
    try {
      const updatedProduct = await this.productRepository.updateProduct(
        id,
        data
      )
      return updatedProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async removeProduct(id) {
    try {
      const removedProduct = await this.productRepository.removeProduct(id)
      return removedProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async activateProduct(id) {
    try {
      const activatedProduct =
        await this.productRepository.activateOrDeactivateProduct(id, 'activate')
      return activatedProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deactivateProduct(id) {
    try {
      const deactivatedProduct =
        await this.productRepository.activateOrDeactivateProduct(
          id,
          'deactivate'
        )
      return deactivatedProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = { Product }
