import React, { useContext ,useState} from 'react';
import { CartContext } from '../utils/ContextReducer';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { state, dispatch } = useContext(CartContext);
    const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
    // console.log(state);
    if (state.length === 0) {
        return (
            <div className='font-semi text-center text-4xl' style={{backgroundColor:"red"}}> Your cart is empty 😒😒</div>
        )
    }
    const totalPrice = state.reduce((total, item) => total + item.price , 0);
    const handleDelete = (index) => {
        dispatch({ type: "REMOVE", index: index });
    };
    const handleCheckout= async()=>{
        let useremail=localStorage.getItem("email");
        let orderDate = new Date().toDateString();
      // console.log(useremail);
        await fetch("http://localhost:5000/api/orderData",{
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                order_data:state,
                email:useremail,
                order_date:orderDate
            })
           
        }).then((response)=>{
            if(response.ok){
                dispatch({type:"DROP"});
               // console.log(state);
            alert("Order Placed Successfully");
            setSuccess(true);
           console.log("alert");
            }
            else
            setFail(true);
        })
        .catch((err)=>console.log(err));   
    }
    const handlePayment = async (e) => {
      try {
      const data=  await fetch("http://localhost:5000/api/checkout",{
          method:"POST",
          headers: { 
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            totalPrice,
          })
        });
      
          const {success,order,key} = await data.json();
          console.log(success,order,key);
         
          if(!success){
              alert("Enter valid credentials");
              return false;
          }
          var options = {
              "key":key , // Enter the Key ID generated from the Dashboard
              "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              "currency": "INR",
              "name": "Robin",
              "description": "Test Transaction",
              "image": "https://example.com/your_logo",
             // "callback_url":"http://localhost:5000/api/paymetverify",
              "order_id":  order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
              "handler": async function (response) {
                  const value={...response,};
                  const validate=await fetch("http://localhost:5000/api/paymetverify",{
                      method:"POST",
                      headers: { 
                        'Content-Type': 'application/json'
                      },
                      body:JSON.stringify({value, useremail:localStorage.getItem("email"),order_data:state,order_date:new Date().toDateString()})
                  })
                  const data=await validate.json();
                  console.log(data);
                 if(data.success===true){
                      handleCheckout();
                 }
                  // alert(response.razorpay_payment_id);
                  // alert(response.razorpay_order_id);
                  // alert(response.razorpay_signature)
              },
              "prefill": {
                  "name": "Gaurav Kumar",
                  "email": "gaurav.kumar@example.com",
                  "contact": "9000090000"
              },
              "notes": {
                  "address": "Razorpay Corporate Office"
              },
              "theme": {
                  "color": "#3399cc"
              }
          };
          var rzp1 = new Razorpay(options);
          rzp1.on('payment.failed', function (response) {
              alert(response.error.code);
              alert(response.error.description);
              alert(response.error.source);
              alert(response.error.step);
              alert(response.error.reason);
              alert(response.error.metadata.order_id);
              alert(response.error.metadata.payment_id);
          });
           rzp1.open();
         e.preventDefault();

      } catch (error) {
          console.log(error);
      }
  };
  
    return (
        <div>
               {success && (
        <div
          class="bg-teal-100 border-t-4 max-w-sm mx-auto flex justify-self-center border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div class="py-1">
              <svg
                class="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <p class="font-bold">Wohooo !</p>
                <p class="text-sm">Your Order has been accepted 😋</p>
              </div>
              <button
                type="button"
                class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                data-dismiss-target="#alert-3"
                aria-label="Close"
                onClick={() => setSuccess(false)}
              >
                <span class="sr-only">Close</span>
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      {fail && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <div className="flex">
            <div class="py-1">
              <svg
                class="fill-current h-6 w-6 text-red-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <p class="font-bold">Holy smokes !!</p>
                <p class="text-sm">{errorMessage}</p>
              </div>
              <button
                type="button"
                class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                data-dismiss-target="#alert-3"
                aria-label="Close"
                onClick={() => setFail(false)}
              >
                <span class="sr-only">Close</span>
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

          
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.map((food, index) => (
                            <tr key={index}>
                                {/* <th scope='row'>{index + 1}</th> */}
                                <td><img src={food.img} alt={food.name} style={{ width: '50px', height: '50px' }} /></td>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md' style={{ maxWidth: '600px', backgroundColor:"white", borderRadius:"5px",boxShadow: '0 0 10px rgb(31 30 30 / 71%) '  }}>
                <div><h1 className='fs-2' style={{color:"black"}}>Total Price: {totalPrice}/-</h1></div>
                <div> <button className="btn btn-primary" style={{textDecoration:"none",color:"white"}} onClick={handlePayment} >Proceed to Checkout</button></div>
                </div>
            </div>
      
        </div>
        
    );
}
