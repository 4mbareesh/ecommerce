import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    contact: Number,
    address: {
      type: {},
    },
    password: String,
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true }
)

const signupModel = mongoose.model('User', userSchema, 'customers')

export default signupModel
