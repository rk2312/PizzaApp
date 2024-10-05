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
 import Delete from './screens/Delete.js';
import PassConfermation from './screens/PassConfermation.js';
import { useState, useEffect } from 'react';
import Chat from './chat/chat.js';
function App() {
  const [userId, setUserId] = useState(null);  // State to hold userId
     
  useEffect(() => {
    // Retrieve userId from localStorage after login
    const storedUserId = localStorage.getItem("email");  // Get userId from localStorage
    // const t=localStorage.getItem("email");
    //console.log(t);
  //  console.log(storedUserId);
    if (storedUserId) {
      setUserId(storedUserId);  // Set userId in the state
    }
  }, []);
   //console.log(userId);
  // if (!userId) {
  //   return <div>Loading...</div>;  // Show a loading state while retrieving userId
  // }
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
          <Route path='/delete' element={<Delete />} />
          {/* <Route path='/complaint' element={<ComplaintChat />} /> */}
          {/* <Route path="/userchat" element={<UserChat userId={userId}/>} />
          <Route path='/Adminchat' element={<AdminChat />} /> */}
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
