import mongoose from "mongoose";

const URL = "mongodb://127.0.0.1:27017/Flavora";

const mongoDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
        // Use await to get the data from MongoDB
        const data = await mongoose.connection.db.collection("pizzadatas").find({}).toArray();
        console.log(data);
         global.pizzadatas=data;
       // global.gofood = data;
        //global.gofood.c
        
        //console.log(global.gofood); // Now you can log the data

    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
    }
};

export default mongoDB;
