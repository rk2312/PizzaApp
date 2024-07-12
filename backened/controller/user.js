import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const Secret="mynameisrobin";
async function handlesignup(req,res)
{
    const {name,password,email,location}=req.body;
    if(name.length<5||password.length<5){
        return res.json({success:false,message:"length should be greater than 5"});
    }
    if(!name||!password||!email||!location)
    {
        return res.json({success:false,message:"all fields are required"});
    }
    const existinguser=await User.findOne({email});
    if(existinguser)
    {
        return res.json({success:false,message:"user already exists"});
    }
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt);
    try{
        await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hashPassword,
            location:req.body.location 
        })
        .then((user)=>{
            const isAdmin=user.isAdmin;
        res.json({success:true,isAdmin,message:"user created succesfully"});
        })
        
    }
    catch(err){
     console.log(err);
     res.json({success:false,message:"something went wrong .Try again later"});
    }
}
async function handlelogin(req,res)
{  
   const {email,password}=req.body;
//    console.log(email+" "+password);
//    localStorage.setItem("email", email);


   if(!email||!password)
   {
    return res.status(403).json({
        success:false,
        message:"all fields are required"
    })
   }
   try{
    const user= await User.findOne({email});
    //console.log(user);
     if(!user)
     {
      return res.status(400).json({success:false,error:"invalid password or username"});
     }
    const pass=await bcrypt.compare(password,user.password);
    //console.log(pass);
    if(pass)
    {
     const payload=
     {
      email:user.email,
      id:user.id
     }
   const token=jwt.sign(payload,Secret,{expiresIn:"1hr"});
   
   user.token=token;
   user.password=undefined;
//    res.cookie("token",token,{expires:new Date(Date.now()+900000)}).status(200).json({
//     success:"true",
//     token,
//     message:"logged in succesfully"
//    })
const isAdmin=  user.isAdmin;
res.status(200).json({
    success:true,
    token,
    isAdmin,
    user,
    message:"logged in succesfully"
})
}
else
{
    return res.status(201).json({
        success:false,
        error:"invalid password or username"
    })
}
}
   catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Login Failure, please try again',
        });
   }
   
}
export {handlelogin,handlesignup};