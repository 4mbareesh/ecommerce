import User from '../models/authModel.js'
import orderModel from '../models/orderModel.js'
import { hashPassword, comparePassword } from '../helpers/authHelper.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

// Register endpoint controller
export const signupController = async (req, res) => {
  try {
    const { name, email, contact, password, address } = req.body
    if (!name || !password || !email || !contact || !address) {
      return res.json({
        success: false,
        error: 'Field(s) are empty',
      })
    }

    const exists = await User.findOne({ email: email })

    if (exists?.email === email) {
      return res.json({
        success: false,
        error: 'Man email already exists!',
      })
    }

    if (password.length < 4) {
      return res.json({
        success: false,
        error: 'Use a 4+ character password.',
      })
    }

    const hashedPassword = await hashPassword(password)
    const user = await User.create({
      name,
      email,
      contact,
      address,
      password: hashedPassword,
    })
    res.status(201).send({
      success: true,
      message: 'Wow, Success!',
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in registration',
      error,
    })
  }
}

// Login endpoint controller
export const signinController = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({
        error: 'No user found',
      })
    }
    if (!password) {
      return res.json({
        error: 'Type password',
      })
    }

    const match = await comparePassword(password, user.password)
    if (!match) {
      return res.status(200).send({
        error: "Passwords don't match",
      })
    }
    if (match) {
      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      })
      res.status(200).send({
        success: true,
        message: 'Login success',
        user,
        token,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Login',
      error,
    })
  }
}

//view user controller
export const fetchUserController = async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).send({
      success: true,
      message: 'fetch done',
      users,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Failed to fetch user',
      error,
    })
  }
}

// Delete endpoint controller
export const deleteuserController = async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.deleteOne({ _id: id })
    if (user.deletedCount === 1) {
      res.json('Deleted successful')
    } else {
      res.json('Delete failed')
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Deletion',
      error,
    })
  }
}

// Test endpoint controller
export const testController = (req, res) => {
  res.send('Protected missile')
}

//update-user

export const updateUserController = async (req, res) => {
  try {
    const { name, email, contact, password, address } = req.body
    const user = await User.findById(req.user.id)
    // console.log(user)
    if (password && password.length < 4) {
      return res.json({ error: 'Password is too short' })
    }
    const hashedPassword = password ? await hashPassword(password) : undefined
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: name || user.name,
        email: email || user.email,
        contact: contact || user.contact,
        address: address || user.address,
        password: hashedPassword || user.password,
      },
      { new: true }
    )
    // console.log(updatedUser)
    res.status(200).send({
      success: true,
      message: 'User Updated Successfully',
      updatedUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Updation',
      error,
    })
  }
}

export const fetchOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user.id })
      .populate('products', '-image')
      .populate('buyer', 'name')
    res.json(orders)
    // res.status(200).send({
    //   success: true,
    //   message: "Fetched Success",
    //   orders
    // })
    // console.log(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in fetching orders',
      error,
    })
  }
}

export const fetchOrderDetailsController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate('products', '-image')
      .populate('buyer', 'name')
      .sort({ createdAt: '-1' })
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in fetching order Details',
      error,
    })
  }
}

export const fetchOrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params
    const { status } = req.body
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    )
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in fetching order status',
      error,
    })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    if (!email || typeof email !== 'string') {
      return res.json({
        success: false,
        message: 'Invalid or empty email address',
      })
    }
    const user = await User.findOne({ email }).exec()
    if (!user) {
      return res.json({
        success: false,
        message: 'No User Found',
      })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '5m',
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SEC_EMAIL,
        pass: process.env.SEC_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.SEC_EMAIL,
      to: email,
      subject: 'Password Reset',
      text: `Hey Sweetie, \n\nIt's look like you forgot the password and looking for a way to recover. Don't worry here's your link. The link will expire within 5mins. So do ASAP or you need to request for the mail again! \n\n ${process.env.FRONTEND_URL}/${user._id}/${token} \n\n By the way, don't share the link to any one!`,
    }

    await transporter.sendMail(mailOptions)
    res.status(200).send({
      success: true,
      promise: 'Yo please wait shipping',
      message: 'Wohoo! Check your mail.',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in sending password reset email',
    })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params
    const { password } = req.body

    if (password == null || password === undefined || !password) {
      return res.json({
        success: false,
        message: 'Password is empty',
      })
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'error with token',
        })
      } else {
        try {
          const hashedPassword = await hashPassword(password)
          const updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            { password: hashedPassword },
            { new: true } // to get the updated user
          )

          res.status(202).send({
            success: true,
            message: 'Successfully updated',
            updatedUser,
          })
        } catch (updateError) {
          console.error('Error updating user:', updateError)
          res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: updateError,
          })
        }
      }
    })
  } catch (error) {
    console.log('Error:', error)
    res.status(500).send({
      success: false,
      message: 'Internal server error',
      error,
    })
  }
}
