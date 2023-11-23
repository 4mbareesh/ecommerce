import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useCategory() {
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/categories')
      setCategories(data?.category)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return categories
}
