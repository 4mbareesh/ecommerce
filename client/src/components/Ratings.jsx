import { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import axios from 'axios'
import { RatingCount, RatingCountDetailed } from './data/ArrayValues'
import moment from 'moment'

//SingleRating
export const SingleRating = ({ productId }) => {
  const [totalStar, setTotalStar] = useState()

  const fetchRatings = async () => {
    try {
      const { data } = await axios.get(`/ratings/${productId}`)
      if (data.totalRatings.length > 0) {
        const totalSum = data.totalRatings.reduce(
          (acc, rating) => acc + rating.rating,
          0
        )
        // Calculate the average rating
        const averageRating = totalSum / data.totalRatings.length
        // console.log(averageRating)
        const roundedRating = Math.round(averageRating * 2) / 2
        setTotalStar(roundedRating)
      } else {
        setTotalStar(0)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchRatings()
    //eslint-disable-next-line
  }, [productId])

  return (
    <>
      {totalStar !== undefined && (
        <div className='flex justify-between items-center'>
          <div className='rating rating-half py-2'>
            {RatingCountDetailed.map((value) => (
              <input
                key={value}
                type='radio'
                name={`avgrating-${productId}`}
                className={`${
                  value == 0
                    ? 'rating-hidden ml-[-9px]'
                    : `bg-gray-600 mask mask-star-2 ${
                        value === 0.5 ||
                        value === 1.5 ||
                        value === 2.5 ||
                        value === 3.5 ||
                        value === 4.5
                          ? 'mask-half-1'
                          : 'mask-half-2 mr-1'
                      }`
                }`}
                defaultChecked={totalStar === value}
                disabled
              />
            ))}
          </div>
          <div className=''>
            {totalStar === 0 ? (
              <span className='whitespace-nowrap bg-slate-300 px-2 py-1.5 text-xs font-medium rounded-lg'>
                New
              </span>
            ) : (
              `${totalStar}/5`
            )}
          </div>
        </div>
      )}
    </>
  )
}

SingleRating.propTypes = {
  productId: PropTypes.string.isRequired,
}

//DetailedRating
export const DetailedRating = ({ productId }) => {
  const [ratings, setRatings] = useState([])
  const [totalStar, setTotalStar] = useState()
  const [buyer, setBuyer] = useState(false)

  const fetchRatings = async () => {
    try {
      const { data } = await axios.get(`/ratings/${productId}`)
      if (data.totalRatings && data.totalRatings.length > 0) {
        // console.log(ratings)
        setRatings(data.totalRatings)
        // console.log(data.totalRatings)
        const totalSum = data.totalRatings.reduce(
          (acc, rating) => acc + rating.rating,
          0
        )
        // Calculate the average rating
        const averageRating = totalSum / data.totalRatings.length
        // console.log(averageRating, data.totalRatings.length)
        const roundedRating = Math.round(averageRating * 2) / 2
        setTotalStar(roundedRating)
        // console.log(roundedRating)
      } else {
        setTotalStar(0)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/isfeedbacktrue')
      const isBuyer = data.some((order) => order.products.includes(productId))
      setBuyer(isBuyer)
      // console.log(buyer)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchRatings()
    fetchOrders()
    //eslint-disable-next-line
  }, [productId])

  return (
    <div
      className={`bg-white shadow-xl p-5 rounded-xl ${
        buyer ? 'md:w-6/12' : 'w-full'
      }`}>
      {totalStar !== undefined && (
        <>
          <div className='rating rating-md sm:rating-lg rating-half flex justify-between py-4'>
            {ratings.length > 0 ? (
              <p className='mt-5'>Total Ratings</p>
            ) : (
              <p className='mt-1 sm:mt-5'>Uh oh, No reviews available yet!</p>
            )}
            <div>
              {RatingCountDetailed.map((value) => (
                <input
                  key={value}
                  type='radio'
                  name={`avgrating`}
                  className={`${
                    value == 0
                      ? 'rating-hidden'
                      : `bg-gray-600 mask mask-star-2 ${
                          value === 0.5 ||
                          value === 1.5 ||
                          value === 2.5 ||
                          value === 3.5 ||
                          value === 4.5
                            ? 'mask-half-1'
                            : 'mask-half-2'
                        }`
                  }`}
                  defaultChecked={totalStar === value}
                  disabled
                />
              ))}
            </div>
          </div>

          {ratings == undefined ? (
            <div>Not Available</div>
          ) : (
            <div className='flex flex-col gap-4 max-h-72 overflow-auto'>
              {ratings.map((data, index) => (
                <div key={index} className='border-2 p-3 rounded'>
                  <div className='flex justify-between'>
                    <p className='ml-3 font-bold hover:underline select-none'>
                      {data.userId.name}
                    </p>
                    <p>
                      {moment(data?.createdAt).fromNow()}
                      {/* ({moment(data?.createdAt).format('hh:mm')}) */}
                    </p>
                  </div>
                  <div className='rating'>
                    {RatingCount.map((value) => (
                      <input
                        key={value}
                        type='radio'
                        name={`rating-${index}`}
                        className={
                          value == 0
                            ? 'rating-hidden'
                            : 'mask mask-star-2 bg-gray-600'
                        }
                        defaultChecked={data?.rating === value}
                        disabled
                      />
                    ))}
                  </div>
                  <p className='ml-3 mt-2'>{data.feedback}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

DetailedRating.propTypes = {
  productId: PropTypes.string.isRequired,
}
