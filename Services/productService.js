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

  async updateProduct(productId, data) {
    try {
      const updatedProduct = await this.productRepository.updateProduct(
        productId,
        data
      )
      return updatedProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async removeProduct(productId) {
    try {
      const removedProduct = await this.productRepository.removeProduct(
        productId
      )
      return removedProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async activateProduct(productId) {
    try {
      const activatedProduct =
        await this.productRepository.activateOrDeactivateProduct(
          productId,
          'activate'
        )
      return activatedProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deactivateProduct(productId) {
    try {
      const deactivatedProduct =
        await this.productRepository.activateOrDeactivateProduct(
          productId,
          'deactivate'
        )
      return deactivatedProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = { Product }
