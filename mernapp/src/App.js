import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup.js';
import { CartProvider } from './utils/ContextReducer.js';
import Cart from './screens/Cart.js';
import Order from './screens/Order.js';
import Admin from './screens/Admin.js';
import ResetPass from './screens/ResetPass.js';
import PassConfermation from './screens/PassConfermation.js';
function App() {
  return (
    <CartProvider>
    <Router>
      <div className='fs-1'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/resetPass' element={<ResetPass />} />
          <Route path='/confirmPass/:id/:token' element={<PassConfermation />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
