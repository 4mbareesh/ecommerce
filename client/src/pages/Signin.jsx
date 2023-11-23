import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/authContext'

function Signin() {
  const [formdata, setFormdata] = useState({
    email: '',
    password: '',
  })
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/signin', formdata)
      if (res && res.data.message) {
        toast.success(`Welcome, ${res.data.user.name}`)
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        })
        localStorage.setItem('auth', JSON.stringify(res.data))
        navigate('/')
      } else {
        toast.error(res.data.error)
        setFormdata({
          email: formdata.email,
          password: formdata.password,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const location = useLocation()
  //eslint-disable-next-line
  const from = location.state?.from || '/'

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='py-12 px-12 bg-white rounded-2xl shadow-xl z-20'>
        <div>
          <h1 className='text-3xl font-bold text-center mb-4 cursor-pointer'>
            Sign in Now!
          </h1>
          <p className='w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer'>
            Login and enjoy the flawless experience!
          </p>
        </div>
        <div className='space-y-4'>
          <input
            type='text'
            placeholder='Email Address'
            className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            name='email'
            value={formdata.email}
            onChange={(e) =>
              setFormdata({ ...formdata, email: e.target.value })
            }
          />
          <input
            type='password'
            placeholder='Password'
            className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            name='password'
            value={formdata.password}
            onChange={(e) =>
              setFormdata({ ...formdata, password: e.target.value })
            }
          />
        </div>
        <div className='text-center mt-6'>
          <button
            className='py-3 w-64 text-xl text-white bg-gray-700 hover:bg-gray-600 rounded-2xl hover:scale-105 transition-all duration-500'
            type='submit'>
            Sign in
          </button>
        </div>
        <div className='flex justify-between mt-7'>
          <Link
            to={'/forgot'}
            className='text-sm underline transition-duration-1000 ease-in-out hover:no-underline'>
            Forgot keys?
          </Link>
          <p className='text-sm'>
            Don&apos;t you have one? {''}
            <Link
              to={'/signup'}
              className='underline transition-duration-1000 ease-in-out hover:no-underline'>
              Signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Signin
