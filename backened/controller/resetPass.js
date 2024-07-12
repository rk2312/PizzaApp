import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function resetPass(req, res) {
    const { password, password_confirmation } = req.body;
    console.log(password, password_confirmation);
    const { id, token } = req.params;
    //console.log(token);
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ "status": "failed", "message": "User not found" });
        }

        const new_secret = user._id + process.env.JWT_SECRET_KEY;
        jwt.verify(token, new_secret);
        
        if (!password || !password_confirmation) {
            return res.status(400).json({ "status": "failed", "message": "All Fields are Required" });
        }

        if (password !== password_confirmation) {
            return res.status(400).json({ "status": "failed", "message": "New Password and Confirm New Password don't match" });
        }

        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        await User.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } });

        return res.json({ "status": "success", "message": "Password Reset Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ "status": "failed", "message": "Invalid Token" });
    }
}
