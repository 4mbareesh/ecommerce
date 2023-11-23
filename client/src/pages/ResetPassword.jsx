import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

function ResetPassword() {
  const { id, token } = useParams()
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleResetPassword = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`/reset-password/${id}/${token}`, {
        password: password,
      })
      console.log(data)
      if (data?.success) {
        toast.success(data.message)
        navigate('/signin')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center'>
      <form
        onSubmit={handleResetPassword}
        className='py-12 px-12 bg-white rounded-2xl shadow-xl z-20'>
        <div>
          <h1 className='text-3xl font-bold text-center mb-4 cursor-pointer'>
            Reset your Password!
          </h1>
          <p className='w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer'>
            It&apos;s looks like you got the mail. Any way do your thing ASAP!
            and please don&apos;t forgot again.
          </p>
        </div>
        <div className='space-y-4'>
          <input
            type='password'
            placeholder='Password'
            className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='text-center mt-6'>
          <button
            className='py-3 w-64 text-xl text-white bg-gray-700 hover:bg-gray-600 rounded-2xl'
            type='submit'>
            Reset My Password
          </button>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword
