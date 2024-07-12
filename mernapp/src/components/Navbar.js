import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { CartContext } from '../utils/ContextReducer';

export default function Navbar() {
  const navigate = useNavigate();
  const { state } = useContext(CartContext);
  const isLoggedIn = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    //console.log(isAdmin)
  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="#">Flavora</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <li className='nav-item'>
              <Link className="nav-link active" aria-current="page" to="#">Home</Link>
            </li>
            {isLoggedIn && (
              <li className='nav-item'>
                <Link className="nav-link" to="/order">My Orders</Link>
              </li>
            )}
          </div>
          <div className="d-flex ms-auto">
            {!isLoggedIn ? (
              <>
                <Link className="btn btn-secondary mx-1" to="/login">Login</Link>
                <Link className='btn btn-primary text-success mx-1' to="/signup">Signup</Link>
              </>
            ) : (
              <div>
                <div className='btn btn-secondary text-success mx-2'>
                
                {isAdmin === 'true' && (
                    <Link to="/admin" className='mx-3' style={{color:'white'}}>Admin</Link>
                  )}
                  
                  <Link  to="/cart">My Cart</Link>
                  <Badge bg="primary">{state.length}</Badge>
                </div>
                <div className='btn btn-danger text-success' onClick={handleClick}>LogOut </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
