import { useSearch } from '../context/searchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SearchInput() {
  const [values, setValues] = useSearch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const { data } = await axios.get(`/search/${values.keyword}`)
      setValues({ ...values, results: data })
      navigate('/search')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form role='search' onSubmit={handleSubmit} className='join'>
      <input
        type='text'
        placeholder='Search'
        className='input input-bordered rounded-full w-40 md:w-auto'
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
      />
      <button type='submit' className='btn btn-neutral btn-circle mx-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={20}
          height={20}
          viewBox='0 0 24 24'
          fill='none'
          stroke='#ffffff'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'>
          <circle cx={11} cy={11} r={8} />
          <line x1={21} y1={21} x2='16.65' y2='16.65' />
        </svg>
      </button>
    </form>
  )
}

export default SearchInput
