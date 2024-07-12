import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Carousal from '../components/Carousal';
import Card from '../components/Card';

export default function Home() {
  const [fooditem, setFooditem] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [filtertype,setfiltertype]=useState(false);
  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api//foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      //console.log(response);
      const uniqueCategories = [...new Set(response.map(item => item.category))];
      setSelectedCategory(uniqueCategories);
      setFooditem(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div><Navbar /></div>
      <div><Carousal /></div>
      <div className='container'>
        <button className='mx-2' onClick={()=>setfiltertype(false)}>All</button>
        <button className='mx-2' onClick={()=>setfiltertype("veg")}>Veg</button>
        <button onClick={()=>setfiltertype("non-veg")}>Non-veg</button>
        {selectedCategory.map((category) => (
          <div key={category}>
            <div className='text-4xl m-2 text-center font-bold uppercase'>
              {category}
            </div>
            <hr />
            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
              {fooditem
                .filter(item => item.category === category)
                .filter((item)=>filtertype?filtertype===item.foodtype:item)
                .map(data => (
                  <div key={data._id} className='col mb-4'>
                    <Card fooddata={data} />
                  </div>
                ))}
            </div>
          </div>
        ))}
        <div><Footer /></div>
      </div>
    </>
  )
}
