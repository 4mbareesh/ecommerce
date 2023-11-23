import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

function Categories() {
  const categories = useCategory()
  return (
    <div className='p-10 md:p-32 bg-gray-100'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-10'>
        {categories.map((data, index) => (
          <Link
            className='btn btn-neutral my-1'
            to={`/category/${data.slug}`}
            key={index}>
            {data.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
