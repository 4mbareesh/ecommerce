import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/cartContext'
import toast from 'react-hot-toast'
import { useAuth } from '../context/authContext'
import Feedback from '../components/Feedback'
import { DetailedRating } from '../components/Ratings'

function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])
  const [cart, setCart] = useCart()
  //eslint-disable-next-line
  const [auth, setAuth] = useAuth()

  const [detailedRatingKey, setDetailedRatingKey] = useState(0)

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/view-product/${params.slug}`)
      setProduct(data.product)
      fetchRelatedProducts(data?.product._id, data?.product.category._id)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchRelatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/related-products/${pid}/${cid}`)
      setRelatedProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (params?.slug) fetchProduct()
    //eslint-disable-next-line
  }, [params?.slug])

  return (
    <div className='bg-gray-100'>
      <div className='min-w-screen min-h-screen bg-gray-100 flex items-center p-5 lg:p-10 overflow-hidden relative'>
        <div className='w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left'>
          <div className='md:flex items-center -mx-10'>
            <div className='w-full md:w-1/2 px-10 mb-10 md:mb-0'>
              <div className='relative border-4 border-gray-300 rounded-lg p-5 transition hover:scale-105 duration-500'>
                {product._id ? (
                  <img
                    src={`${import.meta.env.VITE_SERVER_URL}/view-productimg/${
                      product?._id
                    }`}
                    className='object-cover'
                  />
                ) : (
                  <span className='p-40 flex justify-center align-middle loading loading-dots loading-sm'></span>
                )}
              </div>
            </div>
            <div className='w-full md:w-1/2 px-10'>
              <div className='mb-10'>
                <h1 className='font-bold uppercase text-2xl mb-5'></h1>
                <p className=' text-gray-800'>{product?.description}</p>
              </div>
              <div>
                <div className='inline-block align-bottom mr-5'>
                  <span className='text-2xl leading-none align-baseline'>
                    $
                  </span>
                  <span className='font-bold text-5xl leading-none align-baseline'>
                    {product?.price}
                  </span>
                  <span className='text-2xl leading-none align-baseline'>
                    .99
                  </span>
                </div>
                <div className='inline-block align-bottom'>
                  <button
                    className='bg-gray-700 opacity-75 hover:bg-gray-900 text-white rounded-full px-10 py-3 font-semibold transition hover:scale-105 duration-500'
                    onClick={() => {
                      setCart([...cart, product])
                      localStorage.setItem(
                        'cart',
                        JSON.stringify([...cart, product])
                      )
                      toast.success('Added to cart!')
                    }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='md:flex justify-between w-full max-w-6xl roundedshadow-xl p-5 lg:p-0 mx-auto text-gray-800 relative md:text-left'>
        {product._id && (
          <DetailedRating productId={product._id} key={detailedRatingKey} />
        )}
        {auth?.user?.role === 'user' && product?._id && (
          <Feedback
            productId={product._id}
            auth={auth}
            setDetailedRatingKey={setDetailedRatingKey}
          />
        )}
      </div>

      <div>
        {relatedProducts.length < 1 ? (
          <p className='text-center text-xl bg-gray-100 text-gray-900 font-bold py-10'>
            No Similar Products Found ;)
          </p>
        ) : (
          <p className='text-center text-xl bg-gray-100 text-gray-900 font-bold py-8'>
            Products you may LIKE!
          </p>
        )}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 p-10 md:p-2 bg-gray-100'>
          {relatedProducts?.map((data, index) => (
            <div key={index} className='border'>
              <div className='group relative block overflow-hidden bg-white shadow'>
                <button className='absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75'>
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
                    <span className='whitespace-nowrap px-3 py-1.5 text-xs font-medium'></span>
                  )}
                  <p></p>
                  <h3 className='mt-4 text-lg font-medium text-gray-900'>
                    {data?.name.substring(0, 35)}...
                  </h3>
                  <p className='mt-1.5 text-sm text-gray-700'>${data?.price}</p>
                  <button
                    className='block w-full bg-gray-700 text-white p-4 text-sm font-medium transition hover:scale-105'
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
    </div>
  )
}

export default ProductPage
