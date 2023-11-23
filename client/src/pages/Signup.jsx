import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

function Signup() {
  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/signup', formdata)
      console.log(data)
      if (data.success) {
        toast.success(data.message)
        navigate('/signin')
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center py-12'>
      <form
        onSubmit={handleSubmit}
        className='py-12 px-12 bg-white rounded-2xl shadow-xl z-20'>
        <div>
          <h1 className='text-3xl font-bold text-center mb-4 cursor-pointer'>
            Create An Account
          </h1>
          <p className='w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer'>
            Create an account to enjoy all the services without any ads for
            free!
          </p>
        </div>
        <div className='space-y-4'>
          <input
            type='text'
            placeholder='Your Name'
            className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            name='name'
            value={formdata.name}
            onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
          />
          <input
            type='email'
            placeholder='Email Address'
            className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            name='email'
            value={formdata.email}
            onChange={(e) =>
              setFormdata({ ...formdata, email: e.target.value })
            }
          />
          <input
            type='tel'
            placeholder='Phone Number'
            className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            name='contact'
            value={formdata.contact}
            onChange={(e) =>
              setFormdata({ ...formdata, contact: e.target.value })
            }
          />
          <textarea
            placeholder='Your Address'
            className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            name='address'
            defaultValue={formdata.address}
            onChange={(e) =>
              setFormdata({ ...formdata, address: e.target.value })
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
            className='py-3 w-64 text-xl text-white bg-gray-700 rounded-2xl'
            type='submit'>
            Sign Up
          </button>
          <p className='mt-4 text-sm'>
            Already Have An Account?{' '}
            <Link
              to={'/signin'}
              className='underline hover:no-underline transition duration-1000'>
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Signup
