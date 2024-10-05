import React, { useState, useEffect } from "react";

export default function Delete() {
  const [fooditem, setFooditem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
     // console.log(response);
      const data = await response.json();
      //console.log(data);
      setFooditem(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteData = async (id) => {
    try {
        let response = await fetch(`http://localhost:5000/api/deletedata`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }), // Ensure you're sending the correct ID in the body
        });
        const result = await response.json();
        console.log("Deleted item response:", result);
        if (result.success) {
            setFooditem((prevItems) => prevItems.filter((item) => item._id !== id));
        } else {
            console.error("Error deleting data:", result.message);
        }
    } catch (error) {
        console.error("Error deleting data:", error);
    }
};

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ color: "blue" }}>Name</th>
            <th style={{ color: "pink" }}>Image</th>
            <th style={{ color: "red" }}>Category</th>
            <th style={{ color: "yellow" }}>Type</th>
            <th style={{ color: "green" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {fooditem.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>
                <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px" }} />
              </td>
              <td>{item.category}</td>
              <td>{item.foodtype}</td>
              <td>
                <button type="button" className="btn btn-primary btn-sm" onClick={() => deleteData(item._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
