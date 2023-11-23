import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/authContext'
import moment from 'moment'
import { Link } from 'react-router-dom'

function UserOrders() {
  const [orders, setOrders] = useState([])
  //eslint-disable-next-line
  const [auth, setAuth] = useAuth()

  const getOrders = async () => {
    try {
      const { data } = await axios.get('/orders')
      setOrders(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (auth?.token) getOrders()
    console.log(orders)
    //eslint-disable-next-line
  }, [auth?.token])

  return (
    <div className='relative overflow-x-auto bg-gray-100 pt-5'>
      <h1 className='text-2xl text-center'>Your orders</h1>
      <table className='table-auto min-w-full divide-y-2 divide-gray-200 text-left'>
        <thead className='font-bold text-xl'>
          <tr>
            <th
              scope='col'
              className='whitespace-nowrap px-4 py-3 font-medium text-gray'>
              #
            </th>
            <th
              scope='col'
              className='whitespace-nowrap px-4 py-3 font-medium text-gray'>
              Status
            </th>
            <th
              scope='col'
              className='whitespace-nowrap px-4 py-3 font-medium text-gray'>
              Product Count
            </th>
            <th
              scope='col'
              className='whitespace-nowrap px-4 py-3 font-medium text-gray'>
              Payment
            </th>
            <th
              scope='col'
              className='whitespace-nowrap px-4 py-3 font-medium text-gray'>
              Total
            </th>
            <th
              scope='col'
              className='whitespace-nowrap px-4 py-3 font-medium text-gray'>
              Date
            </th>
          </tr>
        </thead>
        {orders?.map((data, index) => (
          <tbody key={index} className='divide-y divide-gray-200'>
            <tr className='odd:bg-gray-50'>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                {index + 1}
              </td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                {data?.status}
              </td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                {data?.products?.length}
              </td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                {data?.payment?.success ? 'Success' : 'Failed'}
              </td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                {data?.payment?.transaction?.amount}
              </td>
              <td
                className='whitespace-nowrap px-4 py-2 text-gray-700'
                title={moment(data?.createdAt).format('DD/MM/YYYY')}>
                {moment(data?.createdAt).fromNow()} (
                {moment(data?.createdAt).format('hh:mm')})
              </td>
            </tr>
            <tr>
              <td></td>
              <td colSpan={7}>
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4'>
                  {data?.products?.map((data, index) => (
                    <div key={index} className='border bg-white'>
                      <div className='group relative block overflow-hidden'>
                        <Link to={`/product-details/${data?.slug}`}>
                          <img
                            src={`${
                              import.meta.env.VITE_SERVER_URL
                            }/view-productimg/${data?._id}`}
                            alt=''
                            className='p-5 h-40 w-full object-contain transition duration-500 group-hover:scale-110 sm:h-40'
                          />
                        </Link>

                        <div className='relative bg-white p-6'>
                          <p></p>
                          <h3 className='mt-4 text-lg font-medium text-gray-900'>
                            {data?.name.substring(0, 35)}...
                          </h3>
                          <p className='mt-1.5 text-sm text-gray-700'>
                            ${data?.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  )
}

export default UserOrders
