import { useCart } from '../context/cartContext'
import { useAuth } from '../context/authContext'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import DropIn from 'braintree-web-drop-in-react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Cart() {
  const [cart, setCart] = useCart()
  //eslint-disable-next-line
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const [clientToken, setClientToken] = useState('')
  const [instance, setInstance] = useState('')
  const [loading, setLoading] = useState(false)

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart]
      let index = myCart.findIndex((item) => item._id === pid)
      myCart.splice(index, 1)
      setCart(myCart)
      localStorage.setItem('cart', JSON.stringify(myCart))
    } catch (error) {
      console.log(error)
    }
  }

  const totalPrice = () => {
    try {
      let total = 0
      cart?.map((item) => {
        total = total + item.price
      })
      return total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getToken = async () => {
    try {
      const { data } = await axios.get('/braintree/token')
      setClientToken(data?.clientToken)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getToken()
  }, [auth?.token])

  const handlePayment = async () => {
    try {
      setLoading(true)
      const { nonce } = await instance.requestPaymentMethod()
      await axios.post('/braintree/payment', { nonce, cart })
      setLoading(false)
      localStorage.removeItem('cart')
      setCart([])
      navigate('/dashboard/user/orders')
      toast.success('Payment Done')
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <section className='pt-4'>
      <header className='ml-6'>
        <h1 className='text-xl'>
          Hello{' '}
          <span className='font-bold text-2xl'>
            {auth?.token && auth?.user?.name ? auth.user.name : 'User'}
          </span>
          ,
        </h1>
      </header>
      <div className='text-xl ml-6 font-bold'>
        {cart?.length > 0 ? (
          `You have ${cart?.length} item(s),
        ${auth?.token ? '' : 'Please Login to Checkout'}`
        ) : (
          <div className=''>
            <p>Uh oh, your cart is Empty!</p>
            <Link className='btn btn-neutral px-20' to={'/'}>
              Go to Home
            </Link>
          </div>
        )}
      </div>
      <div className='mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 md:flex space-x-8'>
        <div className='mx-auto md:w-8/12'>
          <div className='mt-8'>
            <ul className='space-y-4'>
              {cart?.map((data, index) => (
                <li className='flex items-center gap-4' key={index}>
                  <div className='w-40 h-40 overflow-hidden'>
                    <img
                      src={`${
                        import.meta.env.VITE_SERVER_URL
                      }/view-productimg/${data?._id}`}
                      alt=''
                      className='object-cover aspect-w-1'
                    />
                  </div>

                  <div>
                    <h3 className='text-gray-900 text-lg'>{data?.name}</h3>
                    <dl className='mt-0.5 space-y-1 text-gray-600'>
                      <div>
                        <dt className='inline'>In Stock:</dt>
                        <dd className='inline'> {data?.quantity}</dd>
                      </div>
                      <div>
                        <dt className='inline'>Price:</dt>
                        <dd className='inline'> ${data?.price}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className='flex flex-1 items-center justify-end gap-2'>
                    <form>
                      <label htmlFor='Line2Qty' className='sr-only'>
                        Quantity
                      </label>
                      <input
                        type='number'
                        value='1'
                        id='Line2Qty'
                        className='h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
                      />
                    </form>
                    <button
                      className='text-gray-600 transition hover:text-red-600'
                      onClick={() => {
                        removeCartItem(data._id)
                        toast.success('Successfully removed', {
                          icon: '😺',
                        })
                      }}>
                      <span className='sr-only'>Remove item</span>
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
                          d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {cart?.length === 0 ? (
          ''
        ) : (
          <div className='p border-t md:border-none border-gray-100 pt-10 md:w-6/12'>
            <div className='space-y-4 p-5 md:p-16'>
              <dl className='space-y-0.5 text-sm text-gray-700'>
                <div className='flex justify-between'>
                  <dt className='text-xl flex'>Address: </dt>
                  <dd className='text-2xl align-top whitespace-pre-line'>
                    {!auth?.user?.address
                      ? 'Unavailable!'
                      : auth?.user?.address}
                  </dd>
                </div>
                <hr />

                <div className='flex justify-between'>
                  <dt>Subtotal</dt>
                  <dd>{totalPrice()}</dd>
                </div>

                <div className='flex justify-between'>
                  <dt>VAT</dt>
                  <dd>$20</dd>
                </div>

                <div className='flex justify-between'>
                  <dt>Discount</dt>
                  <dd>-$20</dd>
                </div>

                <div className='flex justify-between !text-base font-medium'>
                  <dt>Total</dt>
                  <dd>{totalPrice()}</dd>
                </div>
              </dl>

              {/* <div className='flex justify-end'>
              <span className='inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='-ms-1 me-1.5 h-4 w-4'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z'
                  />
                </svg>
                <p className='whitespace-nowrap text-xs'>2 Discounts Applied</p>
              </span>
            </div> */}

              <div className='flex justify-between'>
                <p className='mt-4'>Wanna change address?</p>
                {auth?.user?.address ? (
                  <div>
                    <button
                      className='btn'
                      onClick={() => navigate('/dashboard/user/profile')}>
                      Update Address
                    </button>
                  </div>
                ) : (
                  <div>
                    {auth?.token ? (
                      <button
                        className='btn'
                        onClick={() => navigate('/dashboard/user/profile')}>
                        Update Address
                      </button>
                    ) : (
                      <button
                        className='btn btn-danger'
                        onClick={() => navigate('/signin', { state: '/cart' })}>
                        Please Login
                      </button>
                    )}
                  </div>
                )}
              </div>
              <hr className='border-gray-500' />
              {!clientToken || !cart?.length ? (
                ''
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      // paypal: {
                      //   flow: "vault",
                      // },
                      googlePay: {},
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className='btn btn-neutral'
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}>
                    {loading ? 'Processing' : 'Make Payment'}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Cart
