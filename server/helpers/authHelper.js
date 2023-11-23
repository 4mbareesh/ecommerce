import bcrypt from 'bcrypt'

//old-method

// Function to hash a password
// const hashPassword = (password) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.genSalt(12, (err, salt) => {
//       if (err) {
//         reject(err)
//       }
//       bcrypt.hash(password, salt, (err, hash) => {
//         if (err) {
//           reject(err)
//         }
//         resolve(hash)
//       })
//     })
//   })
// }

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)
    return hash
  } catch (error) {
    throw error
  }
}

// Function to compare a password with a hashed value
const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed)
}

export { hashPassword, comparePassword }
