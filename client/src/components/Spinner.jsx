import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PropTypes } from 'prop-types'

function Spinner({ path = '' }) {
  const [count, setCount] = useState(3)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue)
    }, 1000)
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      })
    return () => clearInterval(interval)
  }, [count, navigate, location, path])
  return (
    <div className='flex flex-col justify-center items-center bg-gray-100 '>
      <h1 className='font-bold text-5xl pt-36'>UNAUTHORIZED!</h1>
      <h1 className='text-2xl font-bold pt-5'>Redirecting in {count}</h1>
      <div className='pb-40 pt-10'>
        <span className='loading loading-ball loading-lg'></span>
      </div>
    </div>
  )
}

Spinner.propTypes = {
  path: PropTypes.string,
}

export default Spinner
