import Orders from '../models/orderdata.js';

// Define an async function to handle POST requests for retrieving order data
export default async function handlemyorderdata(req, res) {
    if (req.method === "POST") {
        try {
            // Find order data based on the provided email
            let data = await Orders.findOne({ email: req.body.email });
           ///console.log(data);
            res.json({ order_data: data });
        } catch (err) {
            // Handle errors
            res.status(500).json({ error: err.message });
        }
    } else {
        // Handle other HTTP methods (GET, PUT, DELETE, etc.) if needed
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
