import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
const { Option } = Select

function UpdateProduct() {
  const params = useParams()
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [shipping, setShipping] = useState('')
  const [image, setImage] = useState('')

  const [id, setId] = useState('')

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/view-product/${params.slug}`)
      console.log(data)
      setId(data.product._id)
      setName(data.product.name)
      setDescription(data.product.description)
      setPrice(data.product.price)
      setCategory(data.product.category._id)
      setQuantity(data.product.quantity)
      setShipping(data.product.shipping)
      setImage(data.product.image)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProduct()
    //eslint-disable-next-line
  }, [])

  const navigate = useNavigate()

  const allCategory = async () => {
    try {
      const { data } = await axios.get('/categories')
      if (data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went Wrong')
    }
  }

  useEffect(() => {
    allCategory()
  }, [])

  const handleDelete = async () => {
    try {
      let answer = window.prompt('Are you sure? type "yes" to continue')
      if (!answer) return
      const { data } = await axios.delete(`/delete-product/${id}`)
      toast.success(data.message)
      navigate('/dashboard/admin/view-products')
    } catch (error) {
      console.log(error)
      toast.error('something wrong')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append('name', name)
      productData.append('description', description)
      productData.append('price', price)
      productData.append('category', category)
      productData.append('quantity', quantity)
      productData.append('shipping', shipping)
      image && productData.append('image', image)
      const { data } = await axios.put(`/update-product/${id}`, productData)
      console.log(data)
      if (data?.success) {
        toast.success(data.message)
        navigate('/dashboard/admin/view-products')
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something wrong')
    }
  }

  return (
    <div className='bg-gray-100 p-10'>
      <h1 className='text-xl text-center'>Add products</h1>
      <div className='container mx-auto flex flex-col bg-white gap-5 p-10 rounded-2xl'>
        <Select
          bordered={false}
          placeholder='Select a category'
          size='large'
          showSearch
          className='border rounded-lg'
          onChange={(value) => {
            setCategory(value)
          }}
          value={category}>
          {categories?.map((data) => (
            <Option key={data._id} value={data._id}>
              {data.name}
            </Option>
          ))}
        </Select>
        {/* <label className='btn bg-gray-300'>
            {image ? image.name : 'Upload an image'}
          </label> */}
        <div className='flex flex-col md:flex md:flex-row justify-between items-center gap-6'>
          <div className='w-full'>
            <input
              type='file'
              className='file-input file-input-bordered text-center cursor-pointer w-full'
              name='image'
              accept='image/*'
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          {image ? (
            <div className='bg-gray-300 p-4 rounded-xl'>
              <img
                src={URL.createObjectURL(image)}
                alt='product-photo'
                className='max-w-52 max-h-52 h-full w-full object-contain'
              />
            </div>
          ) : (
            <div className='bg-gray-300 p-4 rounded-xl'>
              <img
                src={`${import.meta.env.VITE_SERVER_URL}/view-productimg/${id}`}
                alt='product-photo'
                className='max-w-52 max-h-52 h-full w-full object-contain'
              />
            </div>
          )}
        </div>
        <input
          type='text'
          value={name}
          placeholder='Name'
          className='input input-bordered'
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          name='description'
          className='textarea textarea-bordered'
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
          defaultValue={description}
          rows={5}
        />
        <input
          type='number'
          value={price}
          placeholder='Price'
          className='input input-bordered'
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type='quantity'
          value={quantity}
          placeholder='Quantity'
          className='input input-bordered'
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Select
          bordered={false}
          size='large'
          className='border rounded-lg'
          placeholder='Shipping'
          onChange={(value) => setShipping(value)}
          value={shipping ? 'Yes' : 'No'}>
          <Option value='0'>No</Option>
          <Option value='1'>Yes</Option>
        </Select>
        <div className='flex justify-around'>
          <button className='btn bg-gray-300' onClick={handleUpdate}>
            Edit Product
          </button>
          <button className='btn btn-neutral' onClick={handleDelete}>
            Delete this Product
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct
