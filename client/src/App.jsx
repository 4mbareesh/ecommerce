import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import { Toaster } from "react-hot-toast"
import Layout from "./pages/layouts/Layout"
import Pagenotfound from "./pages/layouts/Pagenotfound"
import Private from "./components/routes/Private"
import Adminroute from "./components/routes/Adminroute"
import AddCategory from "./pages/admin/AddCategory"
import AddProduct from "./pages/admin/AddProduct"
import Users from "./pages/admin/Users"
import UserProfile from "./pages/users/UserProfile"
import UserOrders from "./pages/users/UserOrders"
import ViewProducts from "./pages/admin/ViewProducts"
import UpdateProduct from "./pages/admin/UpdateProduct"
import axios from "axios"
import Search from "./pages/Search"
import ProductPage from "./pages/ProductPage"
import Categories from "./pages/Categories"
import CategoryProduct from "./pages/CategoryProduct"
import Cart from "./pages/Cart"
import OrderStatus from "./pages/admin/OrderStatus"
import Spinner from "./components/Spinner"
import About from "./pages/About"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"


axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '10px',
            background: '#2b3440',
            color: '#ffffff',
          },
        }}
        containerStyle={{ top: 60 }}
      />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/spinner' element={<Spinner />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/forgot' element={<ForgotPassword />} />
          <Route path='/reset/:id/:token' element={<ResetPassword />} />
          <Route path='*' element={<Pagenotfound />} />
          <Route path='/search' element={<Search />} />
          <Route path='/product-details/:slug' element={<ProductPage />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/category/:slug' element={<CategoryProduct />} />
          <Route path='/cart' element={<Cart />} />

          <Route path='/dashboard' element={<Private />}>
            {/* <Route path='user' element={<UserDashboard />} /> */}
            <Route path='user/profile' element={<UserProfile />} />
            <Route path='user/orders' element={<UserOrders />} />
          </Route>

          <Route path='/dashboard' element={<Adminroute />}>
            {/* <Route path='admin' element={<AdminDashboard />} /> */}
            <Route path='admin/add-category' element={<AddCategory />} />
            <Route path='admin/add-product' element={<AddProduct />} />
            <Route path='admin/view-products' element={<ViewProducts />} />
            <Route path='admin/users' element={<Users />} />
            <Route path='admin/orders' element={<OrderStatus />} />
            <Route path='admin/product/:slug' element={<UpdateProduct />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
