import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Navbar = () => {
  const navigate = useNavigate();

  const signOutHandler = async () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('cartItems');
    window.location.href = '/signin'
    const result = await axios.delete(`api/cart`);

    toast.error('logged out')

    navigate('/signin')
  }

  const userInfo=JSON.parse(localStorage.getItem('userInfo'));
  

  return (
    <div>
      
      <nav class="navbar navbar-expand-lg navbar-light bg-light py-3">
        <div class="container-fluid">
          
          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item mx-3 mg-top white">
                <li><Link to={`/`} className='white'>Store</Link></li>
              </li>
              <li class="nav-item mx-3 mg-top">
                <li><Link to={"/cart"} className='white'> Cart </Link></li>
              </li>
              
              {userInfo ? (
            <li class="nav-item dropdown py-1" white>
              <a class="nav-link dropdown-toggle white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {userInfo.name}
                
              </a>
              <ul class="dropdown-menu " aria-labelledby="navbarDropdown">
                <li class="dropdown-item"><Link className='white'  to={'/profile'}>
                  User Profile </Link></li>
                <li><hr class="dropdown-divider" /></li>
                <li class="dropdown-item "><Link className='white' to={`/order-history/${userInfo._id}`}>Order History</Link> </li>
                <li><hr class="dropdown-divider" /></li>
                <li class="dropdown-item " onClick={signOutHandler}>SignOut</li>
              </ul>
            </li>) :
              (<li class="nav-item active mx-3 mg-top white">
                <Link className='white' to={"/signin"}> Sign In </Link>
              </li>)}
              {userInfo && userInfo.isAdmin?(<li class="nav-item active mx-3 mg-top white">
                <Link to={"/admin"} className='white'> Admin </Link>
              </li>):(<div></div>)}
            </ul>
            
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
