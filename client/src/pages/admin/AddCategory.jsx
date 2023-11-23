import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from './CategoryForm'
import { Modal } from 'antd'

function AddCategory() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedname] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/create-category', { name })
      // console.log(data)
      if (data?.success) {
        toast.success(data.message)
        setName('')
        allCategory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something is wrong in input')
    }
  }

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

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/update-category/${selected._id}`, {
        name: updatedName,
      })
      if (data.success) {
        toast.success(data.message)
        setSelected(null)
        setUpdatedname('')
        setVisible(false)
        allCategory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('something wrong in modal')
    }
  }

  const handleDelete = async (cid) => {
    try {
      const { data } = await axios.delete(`/delete-category/${cid}`)
      if (data.success) {
        console.log(data)
        toast.success(data.message)
        allCategory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('something wrong in modal')
    }
  }

  return (
    <div className='bg-gray-100 py-10'>
      <div className='container mx-auto bg-white rounded-2xl p-5'>
        <CategoryForm
          handleSubmit={handleSubmit}
          value={name}
          setValue={setName}
        />
        <table className='table text-center'>
          <thead className='text-xl'>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((data, index) => (
              <tr key={index} className='text-lg'>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>
                  <button
                    className='btn me-2 bg-gray-300'
                    onClick={() => {
                      setVisible(true)
                      setUpdatedname(data.name)
                      setSelected(data)
                    }}>
                    Edit
                  </button>
                  <button
                    className='btn btn-neutral '
                    onClick={() => {
                      handleDelete(data._id)
                    }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedname}
            handleSubmit={handleUpdate}
          />
        </Modal>
      </div>
    </div>
  )
}

export default AddCategory
