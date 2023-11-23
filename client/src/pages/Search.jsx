import toast from 'react-hot-toast'
import { useSearch } from '../context/searchContext'
import { useCart } from '../context/cartContext'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Search() {
  //eslint-disable-next-line
  const [values, setValues] = useSearch()
  const [cart, setCart] = useCart()
  const [isClicked, setIsClicked] = useState(false)

  return (
    <div className='p-5'>
      <h1>Search Results</h1>
      <h6>
        {values?.results.length < 1
          ? 'No product match'
          : `Found ${values?.results.length} results`}
      </h6>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {values?.results?.map((data, index) => (
          <div key={index} className='border bg-white'>
            <div className='group relative block overflow-hidden'>
              <button
                className={`absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75 ${
                  isClicked ? 'red-500' : 'bg-white'
                }`}
                onClick={() => {
                  setIsClicked(!isClicked)
                  toast.success(
                    isClicked ? 'Removed from Wishlist' : 'Added to Wishlist'
                  )
                }}>
                <span className='sr-only'>Wishlist</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='h-4 w-4'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                  />
                </svg>
              </button>
              <Link to={`/product-details/${data?.slug}`}>
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}/view-productimg/${
                    data?._id
                  }`}
                  alt=''
                  className='p-5 h-64 w-full object-contain transition duration-500 group-hover:scale-110 sm:h-72'
                />
              </Link>

              <div className='relative bg-white p-6'>
                {index < 6 ? (
                  <span className='whitespace-nowrap bg-slate-300 px-3 py-1.5 text-xs font-medium'>
                    New
                  </span>
                ) : (
                  <span className='whitespace-nowrap  px-3 py-1.5 text-xs font-medium'></span>
                )}
                <p></p>
                <h3 className='mt-4 text-lg font-medium text-gray-900'>
                  {data?.name.substring(0, 35)}...
                </h3>
                <p className='mt-1.5 text-sm text-gray-700'>${data?.price}</p>
                <button
                  className='block w-full rounded bg-gray-800 text-white p-4 text-sm font-medium transition hover:scale-105'
                  onClick={() => {
                    setCart([...cart, data])
                    localStorage.setItem(
                      'cart',
                      JSON.stringify([...cart, data])
                    )
                    toast.success('Added to cart!')
                  }}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
