import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Order() {
    const [orders, setOrders] = useState([]);
    

    const fetchData = async () => {
        try {
            const useremail = localStorage.getItem("email");
            const response = await fetch("http://localhost:5000/api/myorderdata", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: useremail
                })
            });
            if (response.ok) {
                const data = await response.json();
                setOrders(data.order_data.orderData);
            } else {
                throw new Error('Failed to fetch order data');
            }
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <div>
            {orders.length > 0 ? (
            
                <div className='container mx-auto  '>
               
                    {orders.map((order, orderIndex) => (
                        <div key={orderIndex} className="d-flex mx-2">
                            {Array.isArray(order) ? (
                                order.map((item, index) => (
                                    <div key={index} className='d-flex '>
                                        {item.order_date ? (
                                            
                                            <div>
                                                {item.order_date}
                                                <hr /> 
                                            </div>
                                        ) : (
                                            <div className='my-5 max-w-sm '>
                                                <img className='rounded-lg' src={item.img} style={{ marginRight: '20px' }} alt='pizza image' />
                                                <div className='font-bold text-xl' style={{fontSize:"30px"}}>{item.name}</div>
                                                <div className='flex justify-between items-center'>
                                                <div style={{ fontSize: "30px" }}>
                                                        {item.qty} <span style={{ marginRight:'30px' }}></span>{item.size}
                                                    </div>
                                                    <div className=' font-semibold'>{item.price}/-</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : null}
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <h1>No Previous order😐</h1>
                    <Link to='/'>Go BACK TO HOME</Link>
                </div>
            )}
        </div>
    );
}
