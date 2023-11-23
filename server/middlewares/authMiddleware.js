import jwt from 'jsonwebtoken'
import User from '../models/authModel.js'

// Middleware to require user authentication
export const requireSignin = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode
    next()
    // const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    // req.user = decode
    // next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Unauthorized', error })
  }
}

// Middleware to check if the user has the 'admin' role
export const roleAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    // console.log(user)
    if (user.role !== 'admin') {
      return res.status(401).send({
        success: false,
        message: 'Access denied',
      })
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(401).send({
      success: false,
      error,
      message: 'Error in admin middleware',
    })
  }
}
