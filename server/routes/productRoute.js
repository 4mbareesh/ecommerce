import express from 'express'
import { requireSignin, roleAdmin } from './../middlewares/authMiddleware.js'
import {
  ProductCategoryController,
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  productCountController,
  productFilterController,
  productListController,
  relatedProductsController,
  searchProductController,
  updateProductController,
  viewProductController,
  viewProductImageController,
  viewProductsController,
} from '../controllers/productController.js'
import formidable from 'express-formidable'

const router = express.Router()

router.post(
  '/create-product',
  requireSignin,
  roleAdmin,
  formidable(),
  createProductController
)
router.get('/view-products', viewProductsController)
router.get('/view-product/:slug', viewProductController)
router.get('/view-productimg/:pid', viewProductImageController)
router.delete('/delete-product/:pid', deleteProductController)
router.put(
  '/update-product/:pid',
  requireSignin,
  roleAdmin,
  formidable(),
  updateProductController
)
router.post('/product-filter', productFilterController)
router.get('/product-count', productCountController)
router.get('/product-list/:page', productListController)
router.get('/search/:keyword', searchProductController)
router.get('/related-products/:pid/:cid', relatedProductsController)
router.get('/product-category/:slug', ProductCategoryController)

router.get('/braintree/token', braintreeTokenController)
router.post('/braintree/payment', requireSignin, braintreePaymentController)

export default router
