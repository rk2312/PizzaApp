import Orders from "../models/orderdata.js";
export default async function  Orderdelete(req, res) {     
      if(req.method=="DELETE"){
        try{
          const {email}=req.body;
          await Orders.deleteMany({email});
            res.status(200).json({success:true,message:" Order deleted successfully"});   
        }catch(err){
            console.log(err);
            res.json({success:false});
        }
    }
}