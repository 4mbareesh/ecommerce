import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import SearchInput from '../../components/SearchInput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/cartContext'
import toast from 'react-hot-toast'
import { useState } from 'react'

function Header() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [auth, setAuth] = useAuth()
  //eslint-disable-next-line
  const [cart, setCart] = useCart()
  const categories = useCategory()

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    })
    localStorage.removeItem('auth')
    toast('See You Later', {
      icon: '😿',
    })
  }

  const SideDropDown = () => {
    const dropdown = document.getElementById('sidedropdown')
    dropdown.open = false
  }

  const categoryDropDown = () => {
    const dropdown = document.getElementById('categorydropdownclose')
    dropdown.open = false
  }

  const profileDropDown = () => {
    const dropdown = document.getElementById('profiledropdownclose')
    dropdown.open = false
  }

  const handleMouseCategoryEnter = () => {
    setIsCategoryOpen(true)
  }

  const handleMouseCategoryLeave = () => {
    setIsCategoryOpen(false)
  }

  const handleMouseProfileEnter = () => {
    setIsProfileOpen(true)
  }

  const handleMouseProfileLeave = () => {
    setIsProfileOpen(false)
  }

  return (
    <header className='navbar bg-base-100 sticky top-0 z-50 shadow-sm py-0'>
      <div className='navbar-start'>
        <div className='dropdown' id='sidedropdown'>
          <label tabIndex={0} className='btn btn-sm btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40'>
            <li>
              <NavLink to='/' onClick={SideDropDown}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/about'>About</NavLink>
            </li>
            <li tabIndex={0}>
              <details
                open={isCategoryOpen}
                className='dropdown'
                id='categorydropdown'
                onClick={profileDropDown}>
                <summary>Categories</summary>
                <ul
                  className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-40'
                  onMouseEnter={handleMouseCategoryEnter}
                  onMouseLeave={handleMouseCategoryLeave}
                  onClick={categoryDropDown}>
                  <li>
                    <Link to={`/categories`}>All</Link>
                  </li>
                  <li>
                    {categories?.map((data, index) => (
                      <Link
                        className='dropdown-item'
                        to={`/category/${data.slug}`}
                        key={index}>
                        {data.name}
                      </Link>
                    ))}
                  </li>
                </ul>
              </details>
            </li>
            {!auth.user ? (
              <>
                <li>
                  <NavLink to='/signup'>Register</NavLink>
                </li>
                <li>
                  <NavLink to='/signin'>Login</NavLink>
                </li>
              </>
            ) : (
              <>
                <li tabIndex={0}>
                  <details
                    id='profiledropdownclose'
                    className='dropdown'
                    open={isProfileOpen}
                    onClick={categoryDropDown}>
                    <summary className='font-bold'>{auth?.user?.name}</summary>
                    <ul
                      className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-40'
                      onMouseEnter={handleMouseProfileEnter}
                      onMouseLeave={handleMouseProfileLeave}
                      onClick={() => profileDropDown()}>
                      {auth?.user?.role === 'user' ? (
                        <>
                          <li>
                            <NavLink to={'/dashboard/user/profile'}>
                              Profile
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to={'/dashboard/user/orders'}>
                              Orders
                            </NavLink>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <NavLink to={'/dashboard/admin/add-category'}>
                              Add Category
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to={'/dashboard/admin/add-product'}>
                              Add Products
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to={'/dashboard/admin/view-products'}>
                              View Products
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to={'/dashboard/admin/users'}>
                              Users
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to={'/dashboard/admin/orders'}>
                              Manage Orders
                            </NavLink>
                          </li>
                        </>
                      )}
                      <li>
                        <Link
                          to='/signin'
                          onClick={handleLogout}
                          className='bg-slate-100 hover:bg-gray-700 hover:text-white'>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link className='btn btn-sm btn-ghost normal-case text-xl' to={'/'}>
          Digital Bazar
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex pb-[-40px]'>
        <ul className='menu menu-horizontal px-1 m-0'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/about'>About</NavLink>
          </li>
          <li tabIndex={0}>
            <details
              id='categorydropdownclose'
              className='dropdown'
              open={isCategoryOpen}
              onClick={profileDropDown}>
              <summary>Categories</summary>
              <ul
                className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-40'
                onMouseEnter={handleMouseCategoryEnter}
                onMouseLeave={handleMouseCategoryLeave}
                onClick={() => categoryDropDown()}>
                <li>
                  <Link to={`/categories`}>All</Link>
                </li>
                <li>
                  {categories?.map((data, index) => (
                    <Link
                      className='dropdown-item'
                      to={`/category/${data.slug}`}
                      key={index}>
                      {data.name}
                    </Link>
                  ))}
                </li>
              </ul>
            </details>
          </li>
          {!auth.user ? (
            <>
              <li>
                <NavLink to='/signup'>Register</NavLink>
              </li>
              <li>
                <NavLink to='/signin'>Login</NavLink>
              </li>
            </>
          ) : (
            <>
              <li tabIndex={0}>
                <details
                  id='profiledropdownclose'
                  className='dropdown'
                  open={isProfileOpen}
                  onClick={categoryDropDown}>
                  <summary className='font-bold'>{auth?.user?.name}</summary>
                  <ul
                    className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-40'
                    onMouseEnter={handleMouseProfileEnter}
                    onMouseLeave={handleMouseProfileLeave}
                    onClick={() => profileDropDown()}>
                    {auth?.user?.role === 'user' ? (
                      <>
                        <li>
                          <NavLink to={'/dashboard/user/profile'}>
                            Profile
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={'/dashboard/user/orders'}>
                            Orders
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <NavLink to={'/dashboard/admin/add-category'}>
                            Add Category
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={'/dashboard/admin/add-product'}>
                            Add Products
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={'/dashboard/admin/view-products'}>
                            View Products
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={'/dashboard/admin/users'}>Users</NavLink>
                        </li>
                        <li>
                          <NavLink to={'/dashboard/admin/orders'}>
                            Manage Orders
                          </NavLink>
                        </li>
                      </>
                    )}
                    <li>
                      <Link
                        to='/signin'
                        onClick={handleLogout}
                        className='bg-slate-100 hover:bg-gray-700 hover:text-white'>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className='navbar-end'>
        <SearchInput />
        {auth?.user?.role === 'admin' ? (
          ''
        ) : (
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='btn btn-ghost btn-circle'>
              <div className='indicator'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
                <span className='badge badge-neutral badge-sm indicator-item'>
                  {cart?.length}
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className='mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow'>
              <div className='card-body'>
                <span className='font-bold text-lg'>{cart?.length} Items</span>
                <div className='card-actions'>
                  <NavLink className='btn btn-neutral btn-block' to={'/cart'}>
                    View cart
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
