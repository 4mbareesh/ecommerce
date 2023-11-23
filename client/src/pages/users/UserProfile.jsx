import toast from 'react-hot-toast'
import { useAuth } from '../../context/authContext'
import axios from 'axios'
import { useEffect, useState } from 'react'

function UserProfile() {
  const [auth, setAuth] = useAuth()
  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    password: '',
  })

  useEffect(() => {
    const formdata = auth.user
    setFormdata({ ...formdata, password: '' })
    // console.log(formdata)
  }, [auth?.user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put('/update-user', formdata)
      console.log(data)
      if (data?.success) {
        setAuth({ ...auth, user: data?.updatedUser })
        let ls = localStorage.getItem('auth')
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth', JSON.stringify(ls))
        toast.success('Successfully Updated')
      } else {
        toast.error(data?.error)
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
            Your Profile
          </h1>
          <p className='w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer'>
            Edit your profile details here!
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
            rows={4}
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
          <button className='btn btn-neutral px-10' type='submit'>
            Edit
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserProfile
