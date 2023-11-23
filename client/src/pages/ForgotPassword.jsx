import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const handleResetPassword = async (e) => {
    e.preventDefault()
    const loadingToast = toast.loading('Sending email...')
    try {
      const { data } = await axios.post('/forgot-password', {
        email: email,
      })

      if (data.success) {
        toast.success(data.message, { id: loadingToast })
      } else {
        toast.error(data.message || 'An error occurred', { id: loadingToast })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center'>
      <form
        onSubmit={handleResetPassword}
        className='py-12 px-12 bg-white rounded-2xl shadow-xl z-20'>
        <div>
          <h1 className='text-3xl font-bold text-center mb-4 cursor-pointer'>
            Forgot Password?
          </h1>
          <p className='w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer'>
            Oh no, but don&apos;t worry. We got this covered! Please Enter your
            email address.
          </p>
        </div>
        <div className='space-y-4'>
          <input
            type='email'
            placeholder='Email Address'
            className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='text-center mt-6'>
          <button
            className='py-3 w-64 text-xl text-white bg-gray-700 hover:bg-gray-600 rounded-2xl'
            type='submit'>
            Confirm
          </button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
