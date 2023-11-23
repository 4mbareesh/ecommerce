import PropTypes from 'prop-types'
import { useState, useContext, createContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  })

  //default axios
  axios.defaults.headers.common['Authorization'] = auth?.token

  useEffect(() => {
    const data = localStorage.getItem('auth')
    if (!data) {
      console.log('No user')
    } else {
      console.log('Hello User')
    }
    if (data) {
      const parseData = JSON.parse(data)
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      })
    }
    //eslint-disable-next-line
  }, [])

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

//eslint-disable-next-line
export { useAuth, AuthProvider }
