
import React, { useEffect, useState } from "react";
import Custom404 from "./custom";
import { json } from "react-router-dom";

function Admin() {
  const [mounted, setMounted] = useState(false);
  const [foodData, setFoodData] = useState({
    name: "",
    category: "",
    foodtype: "",
    prices: "",
    description: "",
    image: "",
  });
  const [categoryError, setCategoryError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(value);
    // Inside handleChange function
setFoodData((prevData) => ({
  ...prevData,
  [name]: value,
  prices: name === "category" ? (value === "Pizza" ? { small: "", medium: "", large: "" } : { small: "", medium: "", large: "" }) : prevData.prices
}));


    // Check if category field is empty and set error state accordingly
    if (name === "category" && value === "") {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log( JSON.stringify(foodData));
    //  JSON.stringify(foodData.prices);
    const response = await fetch("http://localhost:5000/api/createdata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(foodData),
      
    });
    console.log(response);
    const result = await response.json();
    if (result.success) {
      alert("Food data created successfully");
    } else {
      alert("Failed to create");
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isAdmin")) === true) {
      setMounted(true);
    }
  }, []);

  return (
    <>
      {mounted ? (
        <div
          style={{
            minHeight: "90vh",
            overflowY: "scroll",
            backgroundImage:
              'url("https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
            backgroundSize: "cover",
          }}
          className="flex py-10 justify-center content-center items-center"
        >
          <div className="container w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                >
                  Food Name
                </label>
                <input
                  placeholder="Food name"
                  name="name"
                  onChange={handleChange}
                  type="text"
                  required
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                  value={foodData.name}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                >
                  Food Category
                </label>
                <select
                  placeholder="Food Category"
                  name="category"
                  onChange={handleChange}
                  required
                  className={`shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline ${categoryError ? 'border-red-500' : ''
                    }`}
                  value={foodData.category}
                >
                  <option value="">Select Food Category</option>
                  <option value="Pizza">PIZZA</option>
                  <option value="burger">BURGER</option>
                </select>
                {categoryError && <p className="text-red-500">Please select a category</p>}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="foodtype"
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                >
                  Food Type
                </label>
                <select
                  onChange={handleChange}
                  name="foodtype"
                  required
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                  value={foodData.foodtype}
                >
                  <option value="">Select food type</option>
                  <option value="veg">veg</option>
                  <option value="nonveg">nonVeg</option>
                </select>
              </div>
              {foodData.category !== "" && (
  <div className="mb-4">
    {foodData.category !== "" && (
      <div className="mb-4">
        <label
          htmlFor="geolocation"
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        >
          Food Price
        </label>
        {Object.keys(foodData.prices).map((key) => (
          <div key={key} className="ml-4 mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor={key}
            >
              {key}
            </label>
            <input
              key={key}
              type="number"
              name={key}
              placeholder={`Price of ${key}`}
              value={foodData?.prices[key] || ""} // Ensure a fallback value if prices[key] is undefined
              onChange={(e) => {
                setFoodData({
                  ...foodData,
                  prices: {
                    ...foodData.prices,
                    [key]: e.target.value,
                  },
                });
              }}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}
      </div>
    )}
  </div>
)}

                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      rows={4}
                      placeholder="description"
                      name="description"
                      onChange={handleChange}
                      type="text"
                      required
                      className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
                      value={foodData.description}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="image"
                      className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
                    >
                      Food Image
                    </label>
                    <input
                      placeholder="image"
                      name="image"
                      onChange={handleChange}
                      type="url"
                      required
                      className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
                      value={foodData.image}
                    />
                  </div>
                  <button
                    type="submit"
                    className="border font-bold text-gray-900 dark:text-gray-100 dark:border-gray-400 border-gray-900 rounded p-2 mr-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100"
                  >
                    Create
                  </button>
                </form>
            
          </div>
        </div>
      ) : (
        <Custom404 />
      )}
    </>
  );
}

export default Admin;
