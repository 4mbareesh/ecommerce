// feedbackController.js
import feedbackModel from '../models/feedbackModel.js' // Adjust the path based on your project structure
import authModel from '../models/authModel.js'
import orderModel from '../models/orderModel.js'

// Controller function for handling feedback submission
export const submitFeedback = async (req, res) => {
  try {
    const { userId, productId, rating, feedback } = req.body

    // Validate required fields
    if (!userId || !productId || !rating || !feedback) {
      return res.status(400).json({ error: 'All fields are required.' })
    }

    // Create a new feedback instance
    const newFeedback = new feedbackModel({
      userId,
      productId,
      rating,
      feedback,
    })

    // Save the feedback to the database
    await newFeedback.save()

    return res
      .status(201)
      .json({ message: 'feedbackModel submitted successfully.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Controller function to fetch user feedback for a specific product
export const fetchUserFeedback = async (req, res) => {
  try {
    const { userId, productId } = req.params

    // Find feedback for the specified user and product
    const userFeedback = await feedbackModel.findOne({ userId, productId })

    return res.status(200).json({ feedback: userFeedback })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Controller function to edit user feedback for a specific product
export const editFeedback = async (req, res) => {
  try {
    const { userId } = req.body
    const productId = req.params.productId
    const { rating, feedback } = req.body

    // Find and update the feedback for the specified user and product
    const userFeedback = await feedbackModel.findOneAndUpdate(
      { userId, productId },
      { rating, feedback },
      { new: true }
    )

    if (!userFeedback) {
      return res.status(404).json({ error: 'Feedback not found' })
    }

    return res.status(200).json({ message: 'Feedback updated successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const totalRatingsController = async (req, res) => {
  try {
    const { productId } = req.params
    const totalRatings = await feedbackModel
      .find({ productId: productId })
      .populate({
        path: 'userId',
        model: 'User', // Use the model name 'User' that you provided in authModel.js
        select: 'name email', // Specify the fields you want to select from the User model
      })

    res.status(200).send({
      success: true,
      totalRatings,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error while fetching ratings',
      error,
    })
  }
}

export const isfeedbackTrueController = async (req, res) => {
  try {
    if (!req.user.id) {
      console.log('not done')
    } else {
      const orders = await orderModel
        .find({ buyer: req.user.id })
        .select('products')
        .exec()
      res.json(orders)
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in fetching orders',
      error,
    })
  }
}
