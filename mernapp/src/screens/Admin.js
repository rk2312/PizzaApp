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
    setFoodData((prevData) => ({
      ...prevData,
      [name]: value,
      prices:
        name === "category"
          ? { small: "", medium: "", large: "" }
          : prevData.prices,
    }));

    if (name === "category" && value === "") {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(foodData));
    const response = await fetch("https://pizzaapp-api.onrender.com/api/createdata", {
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
            backgroundPosition: "center",
            position: "relative",
          }}
          className="flex py-10 justify-center items-center"
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 container w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4 transform transition-all duration-500 hover:scale-105"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">
                Create New Food Item
              </h2>
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
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline transition duration-200"
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
                  className={`shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ${
                    categoryError ? "border-red-500" : ""
                  }`}
                  value={foodData.category}
                >
                  <option value="">Select Food Category</option>
                  <option value="Pizza">PIZZA</option>
                  <option value="burger">BURGER</option>
                </select>
                {categoryError && (
                  <p className="text-red-500">Please select a category</p>
                )}
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
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline transition duration-200"
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
                            value={foodData?.prices[key] || ""}
                            onChange={(e) => {
                              setFoodData({
                                ...foodData,
                                prices: {
                                  ...foodData.prices,
                                  [key]: e.target.value,
                                },
                              });
                            }}
                            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline transition duration-200"
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
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
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
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline transition duration-200"
                  value={foodData.description}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                >
                  Food Image
                </label>
                <input
                  placeholder="image"
                  name="image"
                  onChange={handleChange}
                  type="url"
                  required
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline transition duration-200"
                  value={foodData.image}
                />
              </div>
              <button
                type="submit"
                className="border font-bold text-gray-900 dark:text-gray-100 dark:border-gray-400 border-gray-900 rounded p-2 mr-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100 transition duration-200"
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
