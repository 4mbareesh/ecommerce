import Carousel from 'react-multi-carousel'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../context/cartContext'
import { PropTypes } from 'prop-types'
import { useState } from 'react'

function Slider({ products }) {
  const [isClicked, setIsClicked] = useState(false)
  const [cart, setCart] = useCart()

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 0,
    },
  }

  return (
    <div>
      <Carousel
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        keyBoardControl={true}
        // containerClass='carousel-container'
        itemClass='carousel-item-padding-40-px'
        centerMode
        className='select-none bg-gray-100 z-0'>
        {products?.map((data, index) => (
          <div
            key={index}
            className='border bg-white m-1 sm:m-5 whitespace-pre md:whitespace-normal'>
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
                  draggable={false}
                />
              </Link>

              <div className='relative bg-white p-6'>
                {index < 5 ? (
                  <span className='whitespace-nowrap bg-gray-600 px-3 py-1.5 text-sm font-medium text-white rounded'>
                    Trending
                  </span>
                ) : (
                  <span className='whitespace-nowrap  px-3 py-1.5 text-xs font-medium'></span>
                )}
                <p></p>
                <h3 className='mt-4 text-lg font-medium text-gray-900 overflow-hidden'>
                  {data?.name.substring(0, 32)}...
                </h3>
                <p className='mt-1.5 mb-0 text-sm text-gray-700'>
                  ${data?.price}
                </p>
                <button
                  className='block w-full rounded bg-gray-700 text-white p-4 text-sm font-medium transition hover:scale-105'
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
      </Carousel>
    </div>
  )
}

export default Slider

Slider.propTypes = {
  products: PropTypes.array.isRequired,
}
