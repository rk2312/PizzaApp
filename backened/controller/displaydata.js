import User from "../models/user.js";
async function handledisplay(req,res)
{
    try{
     
     // res.send(global.gofood);
     //console.log(global.pizzadatas);
    res.send(global.pizzadatas);
      
    }
    catch(err)
    {
        console.log(err);
        res.send("server data");
    }
}
export default handledisplay;