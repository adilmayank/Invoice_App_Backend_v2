class ProductController {
  constructor(productService) {
    this.productService = productService
  }

  getAllProducts = async (req, res) => {
    try {
      const allProducts = await this.productService.getAllProducts()
      res.formattedJson(
        null,
        true,
        'Products Fetched successfully',
        allProducts
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  getSingleProduct = async (req, res) => {
    const { productId } = req.params
    try {
      const singleProduct = await this.productService.getSingleProduct(
        productId
      )
      res.formattedJson(
        null,
        true,
        'Product Fetched successfully',
        singleProduct
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  addProduct = async (req, res) => {
    try {
      const { code, description, unitPrice } = req.body
      // some validation step which will return the validated data or throw an error
      const validatedData = { code, description, unitPrice }

      const newProduct = await this.productService.addProduct(validatedData)
      res.formattedJson(null, true, 'Product Created successfully', newProduct)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  updateProduct = async (req, res) => {
    try {
      const { productId } = req.params
      const { name, description, unitPrice } = req.body
      // some validation step which will return the validated data or throw an error
      const validatedData = { name, description, unitPrice }
      const updatedProduct = await this.productService.updateProduct(
        productId,
        validatedData
      )

      if (updatedProduct instanceof Error) {
        throw new Error(updatedProduct.message)
      } else {
        res.formattedJson(
          null,
          true,
          'Product Updated Successfully',
          updatedProduct
        )
      }
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  removeProduct = async (req, res) => {
    try {
      const { productId } = req.body
      const removedProduct = await this.productService.removeProduct(productId)
      if (removedProduct instanceof Error) {
        throw new Error(removedProduct.message)
      } else {
        res.formattedJson(
          null,
          true,
          'Product Removed Successfully',
          removedProduct
        )
      }
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  activateProduct = async (req, res) => {
    try {
      const { productId } = req.params
      const activatedProduct = await this.productService.activateProduct(
        productId
      )
      if (activatedProduct instanceof Error) {
        throw new Error(activatedProduct.message)
      } else {
        res.formattedJson(
          null,
          true,
          'Product activated successfully.',
          activatedProduct
        )
      }
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  deactivateProduct = async (req, res) => {
    try {
      const { productId } = req.params
      const deactivatedProduct = await this.productService.deactivateProduct(
        productId
      )
      if (deactivatedProduct instanceof Error) {
        throw new Error(deactivatedProduct.message)
      } else {
        res.formattedJson(
          null,
          true,
          'Product deactivated successfully.',
          deactivatedProduct
        )
      }
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }
}

module.exports = { ProductController }
