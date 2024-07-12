import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoDB from './db.js';
import router from './Routes/user.js';
import cors from 'cors'; 
import Razorpay from 'razorpay';
//import smtpServer from './smtpserver.js';
const app=express();
const PORT=5000;
mongoDB();

app.get("/",(req,res)=>{
    res.send("Hello !");
})
//Middleware
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    next();
})
app.use(express.json());
app.use("/api",router);
//Razorpay 
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})