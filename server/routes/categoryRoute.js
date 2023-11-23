import express from 'express'
import { requireSignin, roleAdmin } from '../middlewares/authMiddleware.js'
import {
  categoriesController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from '../controllers/categoryController.js'

const router = express.Router()

//routes
router.post(
  '/create-category',
  requireSignin,
  roleAdmin,
  createCategoryController
)
router.put(
  '/update-category/:id',
  requireSignin,
  roleAdmin,
  updateCategoryController
)
router.get('/categories', categoriesController)
router.get('/single-category/:slug', singleCategoryController)
router.delete(
  '/delete-category/:id',
  requireSignin,
  roleAdmin,
  deleteCategoryController
)

export default router
