//for now there is no need of this file

// import nodemailer from 'nodemailer'
// import jwt from 'jsonwebtoken'

// export const transporter = nodemailer.createTransport({

//   service: 'gmail',
//   auth: {
//     user: process.env.SEC_EMAIL,
//     pass: process.env.SEC_PASSWORD,
//   },
// })

// export const generateToken = (userId) => {
//   const secret = process.env.JWT_SECRET
//   const options = { expiresIn: '1h' }

//   return jwt.sign({ userId }, secret, options)
// }

// export const sendPasswordResetEmail = (email, resetToken) => {
//   const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`

//   const mailOptions = {
//     from: process.env.SEC_EMAIL,
//     to: email,
//     subject: 'Password Reset',
//     html: `<p>Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
//   }

//   return transporter.sendMail(mailOptions)
// }
