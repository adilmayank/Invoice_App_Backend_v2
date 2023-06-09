class ProductRepository {
  constructor(productModel) {
    this.productModel = productModel
  }

  async getAllProducts() {
    try {
      const allProducts = await this.productModel.find({}).lean()
      return allProducts
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getSingleProduct(productId) {
    try {
      const singleProduct = await this.productModel
        .findOne({ _id: productId })
        .lean()
      if (!singleProduct) {
        throw new Error('No product found.')
      }
      return singleProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getFilteredProducts(filterOptions) {
    try {
      const filterField = filterOptions.name
      const filterFieldValues = filterOptions.values
      const filteredProducts = await this.productModel
        .find(
          { [filterField]: { $in: filterFieldValues } },
          'code description unitPrice '
        )
        .lean()
      return filteredProducts
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addProduct(data) {
    const { code, description, unitPrice } = data
    try {
      const newProduct = await this.productModel({
        code,
        description,
        unitPrice,
      }).save()
      return newProduct._id
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateProduct(productId, data) {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        productId,
        data,
        { new: true }
      )
      if (updatedProduct === null) {
        return new Error('No record found with the provided id.')
      }
      return updatedProduct._id
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async removeProduct(productId) {
    try {
      const removedProduct = await this.productModel.findByIdAndRemove(productId)
      if (removedProduct === null) {
        return new Error('No record found with the provided id.')
      }
      return removedProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async activateOrDeactivateProduct(productId, operationType) {
    let updatedProduct
    try {
      if (operationType === 'activate') {
        updatedProduct = await this.productModel
          .findByIdAndUpdate(
            productId,
            {
              isActive: true,
            },
            { new: true }
          )
          .lean()
      } else if (operationType === 'deactivate') {
        updatedProduct = await this.productModel
          .findByIdAndUpdate(productId, { isActive: false }, { new: true })
          .lean()
      }
      if (!updatedProduct) {
        return new Error('Product data not found.')
      }
      return updatedProduct
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = { ProductRepository }
