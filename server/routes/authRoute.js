import express from 'express'
const router = express.Router()

import { requireSignin, roleAdmin } from '../middlewares/authMiddleware.js'
import {
  signupController,
  signinController,
  deleteuserController,
  testController,
  updateUserController,
  fetchOrdersController,
  fetchOrderDetailsController,
  fetchOrderStatusController,
  fetchUserController,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js'

router.post('/signup', signupController)
router.post('/signin', signinController)
router.get('/fetch-users', fetchUserController)
router.delete('/delete-user/:id', deleteuserController)

router.get('/test', requireSignin, roleAdmin, testController)

router.get('/user-auth', requireSignin, (req, res) => {
  res.status(200).send({ ok: true })
})

router.get('/admin-auth', requireSignin, roleAdmin, (req, res) => {
  res.status(200).send({ ok: true })
})

router.put('/update-user', requireSignin, updateUserController)
router.get('/orders', requireSignin, fetchOrdersController)
router.get(
  '/order-details',
  requireSignin,
  roleAdmin,
  fetchOrderDetailsController
)
router.put(
  '/order-status/:orderId',
  requireSignin,
  roleAdmin,
  fetchOrderStatusController
)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:id/:token', resetPassword)

export default router
