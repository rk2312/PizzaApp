import mongoose from "mongoose";
const dataschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    required:true
    },
    image:{
        type:String,
        required:true
    },
    prices:{
        type:Object,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    foodtype:{
        type:String,
        required:true
    },

},{timestamps:true});
const pizzaData=mongoose.model('pizzaData',dataschema);
export default pizzaData;