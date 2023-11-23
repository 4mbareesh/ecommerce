import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

function ViewProducts() {
  const [products, setProducts] = useState([])
  const allProducts = async () => {
    try {
      const { data } = await axios.get('/view-products')
      setProducts(data.products)
      // console.log(data)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    allProducts()
  }, [])

  return (
    <div className='bg-gray-100 p-5'>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {products?.map((data, index) => (
          <div key={index} className='border bg-white shadow-lg'>
            <div className='group relative block overflow-hidden'>
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
                <h3 className='mt-4 text-lg font-medium text-gray-900'>
                  {data?.name.substring(0, 35)}...
                </h3>
                <p className='mt-1.5 text-sm text-gray-700'>${data?.price}</p>
                <Link
                  to={`/dashboard/admin/product/${data.slug}`}
                  className='btn btn-neutral w-full hover:scale-105'>
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewProducts
