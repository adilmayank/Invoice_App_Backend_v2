const express = require('express')
const router = express.Router()
const { ProductController } = require('../Controllers')
const { ProductService } = require('../Services')
const { ProductRepository } = require('../Data Access')
const { ProductModel } = require('../Models')

// Dependency injection
const productRepository = new ProductRepository(ProductModel)
const productService = new ProductService(productRepository)
const productController = new ProductController(productService)

// get all products
router.get('/api/v2/products', productController.getAllProducts)

// get single product
router.get('/api/v2/products/:productId', productController.getSingleProduct)

// create new product
router.post('/api/v2/products', productController.addProduct)

// update single product
router.patch('/api/v2/products/:productId', productController.updateProduct)

// activate single product
router.patch(
  '/api/v2/products/:productId/activate',
  productController.activateProduct
)

// deactivate single product
router.patch(
  '/api/v2/products/:productId/deactivate',
  productController.deactivateProduct
)

// hard delete contact agent
router.delete('/api/v2/products/:productId', productController.removeProduct)

module.exports = router
