// controller/deleteFoodData.js
import pizzaData from '../models/pizzadata.js';

export default async function handledeleteFoodData(req, res) {
    if (req.method === "DELETE") {
        try {
            const { id } = req.body; // Ensure the ID is being correctly received from the body
            if (!id) {
                return res.status(400).json({ success: false, message: "ID is required" });
            }
            const deletedItem = await pizzaData.findByIdAndDelete(id);
            if (!deletedItem) {
                return res.status(404).json({ success: false, message: "Item not found" });
            }
            res.status(200).json({ success: true, message: "Item deleted successfully" });
        } catch (err) {
            console.error('Error deleting pizza data:', err);
            res.status(400).json({ success: false, error: err.message });
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}
