import express from 'express'
import {
  editFeedback,
  fetchUserFeedback,
  isfeedbackTrueController,
  submitFeedback,
  totalRatingsController,
} from '../controllers/feedbackController.js'
import { requireSignin } from './../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/feedback', submitFeedback)
router.get('/feedback/user/:userId/:productId', fetchUserFeedback)
router.put('/feedback/:productId', editFeedback)
router.get('/ratings/:productId', totalRatingsController)
router.get('/isfeedbacktrue', requireSignin, isfeedbackTrueController)

export default router
