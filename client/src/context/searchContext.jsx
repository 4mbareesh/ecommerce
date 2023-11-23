import { useState, useContext, createContext } from 'react'
import { PropTypes } from 'prop-types'

const SearchContext = createContext()
const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: '',
    results: [],
  })

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  )
}

const useSearch = () => useContext(SearchContext)

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

//eslint-disable-next-line
export { useSearch, SearchProvider }
