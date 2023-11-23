import { useState, useContext, createContext, useEffect } from 'react'
import { PropTypes } from 'prop-types'

const CartContext = createContext()
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    let existingCartItem = localStorage.getItem('cart')
    if (existingCartItem) setCart(JSON.parse(existingCartItem))
  }, [])
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

//eslint-disable-next-line
export { useCart, CartProvider }
