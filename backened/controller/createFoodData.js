import pizzaData from '../models/pizzadata.js';

export default async function handlecreateFoodData(req, res) {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      
      // Ensure that the 'prices' field is parsed as JSON
      // const prices = JSON.parse(req.body.prices);
      
      // Create pizza data with parsed prices
      await pizzaData.create({
        name: req.body.name,
        category: req.body.category,
        foodtype: req.body.foodtype,
        prices: req.body.prices, // Use parsed 'prices' object
        description: req.body.description,
        image: req.body.image,
      });
      res.status(200).json({ success: true });
    } catch (err) {
      console.error('Error creating pizza data:', err);
      res.status(400).json({ success: false, error: err.message });
    }
  } else {
    // Handle unsupported HTTP methods (e.g., GET, PUT, DELETE)
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
