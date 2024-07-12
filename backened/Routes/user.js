import express from "express";
import cors from "cors";
const router=express.Router();

router.use(cors());

import { handlelogin, handlesignup } from "../controller/user.js";
import  handledisplay  from "../controller/displaydata.js";
import handleorder from "../controller/orderdata.js";
import handlemyorderdata from "../controller/myorderdata.js";
import handlecreateFoodData from "../controller/createFoodData.js";
import sendUserPasswordResetEmail from "../controller/createnewPass.js";
import resetPass from "../controller/resetPass.js";
import { Checkout } from "../controller/Paymenet.js";
import { paymentVerification } from "../controller/Paymenet.js";
router.post("/signup",handlesignup);
router.post("/login",handlelogin);
router.post("/foodData",handledisplay);
router.post("/orderData",handleorder);
router.post("/myorderdata",handlemyorderdata);
router.post("/createdata",handlecreateFoodData);
router.post("/changePass",sendUserPasswordResetEmail);
router.post("/resetPassword/:id/:token",resetPass);
router.post("/checkout",Checkout);
router.post("/paymetverify",paymentVerification);
export default router;