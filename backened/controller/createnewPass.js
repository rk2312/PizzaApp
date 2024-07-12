//import React from 'react'
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


import transporter from "../config/emailconfig.js";
 async function sendUserPasswordResetEmail (req,res) {
    
    const { email } = req.body
    //console.log(email);
    //const secret="Robin223"
    console.log(email);
    if (email) {
      const user = await User.findOne({ email: email })
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
        const link = `http://127.0.0.1:3000/confirmPass/${user._id}/${token}`
        console.log(link)
        // Send Email
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "GeekShop - Password Reset Link",
          html: `<a href=${link}>Click Here</a> to Reset Your Password`
        })
        res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" })
      } else {
        res.send({ "status": "failed", "message": "Email doesn't exists" })
      }
    } else {
      res.send({ "status": "failed", "message": "Email Field is Required" })
    }
}
export default sendUserPasswordResetEmail;