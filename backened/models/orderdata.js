import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    orderData:{
        type:Array,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    order_date:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});
const Orders=mongoose.model('Orders',orderSchema);
export default Orders;