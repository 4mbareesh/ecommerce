import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get('/fetch-users')
      .then((res) => setUsers(res.data.users))
      .catch((err) => err)
  }, [])

  const handleDelete = async (id) => {
    try {
      const data = await axios.delete(`/delete-user/${id}`)
      console.log(data)
      setUsers(users.filter((user) => user._id !== id))
      const deletedUser = users.find((user) => user._id === id)
      toast.success(`Succefully Deleted "${deletedUser.name}"`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-gray-100 p-5'>
      <div className='container mx-auto p-5 rounded-xl overflow-x-auto bg-white'>
        <table className='table'>
          <thead className='text-xl'>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='text-lg'>
            {users?.map((users, index) => (
              <tr key={users._id}>
                <td>{index + 1}</td>
                <td>{users?.name}</td>
                <td>{users?.email}</td>
                <td>{users?.contact}</td>
                <td>
                  <button
                    className='btn btn-neutral'
                    onClick={() => handleDelete(users._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
