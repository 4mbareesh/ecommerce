import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: {
      type: Number,
    },
    feedback: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Feedback', feedbackSchema)
