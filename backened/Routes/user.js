// routes/router.js
import express from "express";
import cors from "cors";
const router = express.Router();

router.use(cors());
router.use(express.json());

import { handlelogin, handlesignup } from "../controller/user.js";
import handledisplay from "../controller/displaydata.js";
import handleorder from "../controller/orderdata.js";
import handlemyorderdata from "../controller/myorderdata.js";
import handlecreateFoodData from "../controller/createFoodData.js";
import sendUserPasswordResetEmail from "../controller/createnewPass.js";
import resetPass from "../controller/resetPass.js";
import { Checkout, paymentVerification } from "../controller/Paymenet.js";
import handledeleteFoodData from "../controller/deleteFoodData.js";
import Orderdelete from "../controller/deleteOrder.js";
router.post("/signup", handlesignup);
router.post("/login", handlelogin);
router.get("/foodData", handledisplay);
router.post("/orderData", handleorder);
router.post("/myorderdata", handlemyorderdata);
router.post("/createdata", handlecreateFoodData);
router.post("/changePass", sendUserPasswordResetEmail);
router.post("/resetPassword/:id/:token", resetPass);
router.post("/checkout", Checkout);
router.post("/paymetverify", paymentVerification);
router.delete("/deletedata", handledeleteFoodData); // Ensure this route is correctly set up
router.delete("/clearorders",Orderdelete);
export default router;
