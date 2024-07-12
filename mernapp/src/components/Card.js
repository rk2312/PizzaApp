import React,{useState,useEffect, useContext} from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../utils/ContextReducer';
const priceoptions=["small","medium","large"];
export default function Card(props) {
    const data=props.fooddata;
    const isLoggedIn = localStorage.getItem("token");
    const {state,dispatch}=useContext(CartContext);
    if (!data) 
    {
      return <div>Loading...</div>;
    }
    const [qty,setQty]=useState(1);
    const [size,setSize]=useState(priceoptions[0]);
    const handleQty=(e)=>{
      setQty(e.target.value);
    }
    const handleSize=(e)=>{
      setSize(e.target.value);
    } 
   const handleAddCart=async ()=>{
    const updateitem=await state.find((e)=>e.tempId===data._id+size); 
    //checking if size is not present in cart then simple add
    if(!updateitem&&isLoggedIn){
      dispatch({
        type:"ADD",
        id:data._id,
        tempId:data._id+size,
        name:data.name,
        img:data.image,
        price:finalprice,
        qty:qty,
        priceoptions:size
      })
    }
    //if size is present in cart then only update their quantity
  if(updateitem&&isLoggedIn)
    {
      dispatch({
        type:"UPDATE",
        tempId:data._id+size,
        price:finalprice,
        qty:qty,
      })
    }
      
     
   };
   console.log(size);
  //calculate the final price after selecting 
 let finalprice=qty* parseInt(data.prices[size]);
  return (
    <div>
         <div className="card mt-5" style={{ width: '300px'}} >
          <img src="https://www.dominos.co.in/files/items/Peppy_Paneer.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{data.name}</h5>
            <p className="card-text" style={{ fontSize: '12px' }}>{data.description}</p>
            <div className='container'>
              <select className='m-2 h-10 bg-danger rounded' onChange={handleQty} style={{ fontSize: '20px' }}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  )
                })}
              </select>
              <select className=' m-2 h-10 bg-success rounded ' onChange={handleSize} style={{ fontSize: '20px' }}>
                {priceoptions.map((options) => {
                  return(
                   <option key={options} value={options}>{options}</option>
                  )
                })}
              </select>
              <button className='btn btn-primary' style={{ fontSize: '15px', marginLeft: '1px' }} onClick={handleAddCart}>Add to cart</button>
              <div className='d-inline' style={{ fontSize: '20px', marginLeft: '50px' }}>
                 ₹{finalprice} /-
             </div>

            </div>
            {/* <Link to="#" className="btn btn-primary">Go somewhere</Link> */}
          </div>
        </div>
    </div>
  )
}
