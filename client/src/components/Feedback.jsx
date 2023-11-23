import { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { toast } from 'react-hot-toast'
import { RatingCount } from './data/ArrayValues'

const Feedback = ({ productId, auth, setDetailedRatingKey }) => {
  const [rating, setRating] = useState(0)
  const [feedbackText, setFeedbackText] = useState('')
  const [loading, setLoading] = useState(false)
  const [buyer, setBuyer] = useState(false)

  const handleRatingChange = (value) => {
    setRating(value)
    // console.log(rating)
  }

  const handleFeedbackChange = (event) => {
    setFeedbackText(event.target.value)
  }

  const fetchUserFeedback = async () => {
    try {
      const userId = auth?.user?._id
      const { data } = await axios.get(`/feedback/user/${userId}/${productId}`)
      // console.log(data)

      if (data.feedback) {
        setRating(data.feedback.rating)
        setFeedbackText(data.feedback.feedback)
        setLoading(true)
      } else {
        // If no feedback data, set rating to 0
        setRating(0)
        setFeedbackText('')
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const submitFeedback = async () => {
    try {
      const response = await axios.post('/feedback', {
        userId: auth?.user?._id,
        productId: productId,
        rating: rating,
        feedback: feedbackText,
      })

      if (response.status === 201) {
        toast.success('Feedback submitted successfully!')
        setRating(0)
        setFeedbackText('')
        fetchUserFeedback()
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to submit feedback. Please try again.')
    }
  }

  const editFeedback = async () => {
    try {
      const response = await axios.put(`/feedback/${productId}`, {
        userId: auth?.user?._id,
        rating: rating,
        feedback: feedbackText,
      })

      if (response.status === 200) {
        toast.success('Feedback updated successfully!')
        fetchUserFeedback()
        setDetailedRatingKey((prevKey) => prevKey + 1)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to update feedback. Please try again.')
    }
  }

  const getOrders = async () => {
    try {
      const { data } = await axios.get('/isfeedbacktrue')
      const isBuyer = data.some((order) => order.products.includes(productId))
      // console.log(data)
      setBuyer(isBuyer)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserFeedback()
    //eslint-disable-next-line
  }, [productId])

  useEffect(() => {
    if (auth?.token) getOrders()
    //eslint-disable-next-line
  }, [auth?.token])

  return (
    <>
      {buyer && (
        <div className='feedback py-5 flex flex-col gap-5 bg-white md:w-6/12 mt-5 md:mt-0 md:ms-10 p-10 shadow-xl rounded-xl'>
          <p className='mb-0'>
            Since you bought the product, please rate out of 5
          </p>
          <div className='rating'>
            {RatingCount.map((value) => (
              <input
                key={value}
                type='radio'
                name={`rating-${productId}`}
                className={`mr-1 ${
                  value == 0
                    ? 'rating-hidden ml-[-10px]'
                    : 'mask mask-star-2 bg-gray-600 m'
                }`}
                onChange={() => handleRatingChange(value)}
                checked={rating === value}
              />
            ))}
          </div>
          <p>Your feedback is appreciated!</p>
          <textarea
            name='feedback'
            id=''
            cols='40'
            rows='5'
            className='textarea textarea-bordered'
            value={feedbackText}
            onChange={handleFeedbackChange}></textarea>
          {loading ? (
            <button
              className='bg-gray-700 opacity-75 hover:bg-gray-900 text-white rounded-full px-10 py-3 font-semibold transition hover:scale-105 duration-500'
              onClick={editFeedback}>
              Edit Feedback
            </button>
          ) : (
            <button
              className='bg-gray-700 opacity-75 hover:bg-gray-900 text-white rounded-full px-10 py-3 font-semibold transition hover:scale-105 duration-500'
              onClick={submitFeedback}>
              Submit Feedback
            </button>
          )}
        </div>
      )}
    </>
  )
}

Feedback.propTypes = {
  productId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  setDetailedRatingKey: PropTypes.func.isRequired,
}

export default Feedback
