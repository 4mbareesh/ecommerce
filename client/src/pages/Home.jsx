import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './../components/ProductCard'
import Filters from './../components/Filters'
import Slider from './../components/Slider'
import Loading from '../components/Loading'

function Home() {
  const [filteredProducts, setFilteredProducts] = useState([])
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllProducts = async () => {
    try {
      const { data } = await axios.get(`/view-products`)
      setProducts(data.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllProducts()
    //eslint-disable-next-line
  }, [])

  const fetchFilteredProducts = async () => {
    try {
      const { data } = await axios.get(`/product-list/${page}`)
      setFilteredProducts(data.products)
    } catch (error) {
      console.log(error)
    }
  }

  const loadMore = async () => {
    try {
      const { data } = await axios.get(`/product-list/${page}`)
      setFilteredProducts([...filteredProducts, ...data.products])
    } catch (error) {
      console.log(error)
    }
  }

  const getTotal = async () => {
    try {
      const { data } = await axios.get('/product-count')
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (page === 1) return
    loadMore()
    //eslint-disable-next-line
  }, [page])

  //filters-section

  const resetFilters = () => {
    setChecked([])
    setRadio([])
    setPage(1)
  }

  //get all  cat
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/categories')
      setCategories(data.category)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
    getTotal()
  }, [])

  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all)
  }

  useEffect(() => {
    if (!checked.length || !radio.length) fetchFilteredProducts()
    //eslint-disable-next-line
  }, [checked.length, radio])

  useEffect(() => {
    if (checked.length || radio.length) filterProduct()
    // eslint-disable-next-line
  }, [checked, radio])

  const filterProduct = async () => {
    try {
      const { data } = await axios.post('/product-filter', { checked, radio })
      setFilteredProducts(data.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // if (products && filteredProducts && categories && total) {
    //   setLoading(false)
    // }
    // else {
    //   setLoading(true)
    // }
    // console.log(loading)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <div>
      <div className=' justify-center items-center bg-gray-100 py-5'>
        <h1 className='text-center text-xl'>Trending</h1>
        <div className='px-1 md:p-4'>
          <Slider products={products.slice(1, 5)} />
        </div>
        {categories?.map((data, index) => (
          <div key={index}>
            <h1
              className={`text-xl font-bold ${
                index % 2 ? 'text-right' : 'text-left'
              }`}>
              {/* {products?.filter(
                (product) => product.category._id === data._id
              ) < 2
              ? 'Others'
            : data.name} */}
              {data.name}
            </h1>
            {products == null ? (
              <Loading />
            ) : (
              <div className='p-4'>
                {products?.filter(
                  (product) => product.category._id === data._id
                ) < 2 ? (
                  <Slider
                    products={products.sort(
                      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                    )}
                  />
                ) : (
                  <Slider
                    products={products.filter(
                      (product) => product.category._id === data._id
                    )}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='bg-gray-100 sm:flex p-5'>
        <div className='md:w-2/12'>
          <Filters
            categories={categories}
            checked={checked}
            setChecked={setChecked}
            handleFilter={handleFilter}
            setRadio={setRadio}
            resetFilters={resetFilters}
          />
        </div>
        <div className='md:w-12/12'>
          <ProductCard
            products={filteredProducts}
            setProducts={setFilteredProducts}
            page={page}
            setPage={setPage}
            loading={loading}
            total={total}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
