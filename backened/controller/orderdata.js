import Orders from "../models/orderdata.js";
export default async function handleorder(req,res){

    const {order_data,email}=req.body;
    //console.log(req.body);
     await order_data.splice(0,0,{order_date:req.body.order_date});
   // orderData.unshift({ order_date: req.body.order_date });
    let eid=await Orders.findOne({email});
    if(eid===null){
        try{
            await Orders.create({"orderData":order_data,email});
            return res.json({success:true});
        }catch(err){
            console.log(err);
            return res.json({success:false});
        } 
    }
    else{
        try{
            await Orders.findOneAndUpdate({email},{$push:{"orderData":order_data}});
            return res.json({success:true});
        }catch(err){
            console.log(err);
            return res.json({success:false});
        }
    }
}