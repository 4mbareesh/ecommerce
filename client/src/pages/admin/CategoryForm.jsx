import { PropTypes } from 'prop-types'

function CategoryForm({ handleSubmit, value, setValue }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className='join p-5 flex justify-center items-center'>
        <input
          type='text'
          className='join-item input input-bordered'
          placeholder='Enter the category'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          type='submit'
          value='Add'
          className='btn btn-neutral join-item'
        />
      </div>
    </form>
  )
}

CategoryForm.propTypes = {
  handleSubmit: PropTypes.func,
  value: PropTypes.String,
  setValue: PropTypes.String
}

export default CategoryForm
