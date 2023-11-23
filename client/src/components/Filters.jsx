import { Checkbox, Radio } from 'antd'
import { Prices } from './data/ArrayValues'
import { PropTypes } from 'prop-types'

//function is not working, will update it later

function Filters({ categories, setRadio, handleFilter, resetFilters }) {
  return (
    <div className=' md:w-2/12'>
      <h1 className='text-center'>Filters</h1>
      <p>by category</p>
      {categories?.map((data) => (
        <Checkbox
          key={data._id}
          onChange={(e) => handleFilter(e.target.checked, data._id)}>
          {data.name}
        </Checkbox>
      ))}
      <p className='pt-5'>by price</p>
      <Radio.Group onChange={(e) => setRadio(e.target.value)}>
        {Prices?.map((data) => (
          <div key={data._id}>
            <Radio value={data.array}>{data.name}</Radio>
          </div>
        ))}
      </Radio.Group>
      <button
        className='btn btn-neutral btn-sm '
        onClick={() => resetFilters()}>
        reset
      </button>
    </div>
  )
}

export default Filters

Filters.propTypes = {
  categories: PropTypes.array.isRequired,
  setRadio: PropTypes.func,
  handleFilter: PropTypes.func,
  resetFilters: PropTypes.func,
}
