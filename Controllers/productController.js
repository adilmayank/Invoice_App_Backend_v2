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
    const {id} = req.params
    try {
      const singleProduct = await this.productService.getSingleProduct(id)
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
    const { data } = req.body

    try {
      const newProduct = await this.productService.addProduct(data)
      res.formattedJson(null, true, 'Product Created successfully', newProduct)
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  updateProduct = async (req, res) => {
    const { id, data } = req.body

    try {
      const updatedProduct = await this.productService.updateProduct(id, data)

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
    const { id } = req.body

    try {
      const removedProduct = await this.productService.removeProduct(id)
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
    const { id } = req.params
    try {
      const activatedProduct = await this.productService.activateProduct(id)
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
    const { id } = req.params
    try {
      const deactivatedProduct = await this.productService.deactivateProduct(id)
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
