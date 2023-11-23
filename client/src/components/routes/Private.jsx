import { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner'

function Private() {
  const [ok, setOk] = useState(false)
  //eslint-disable-next-line
  const [auth, setAuth] = useAuth()
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get('/user-auth')
      if (res.data.ok) {
        setOk(true)
      } else {
        setOk(false)
      }
    }
    if (auth?.token) authCheck()
  }, [auth?.token])
  return ok ? <Outlet /> : <Spinner />
}

export default Private