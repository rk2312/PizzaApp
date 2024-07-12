import { instance } from '../index.js';
import dotenv from 'dotenv';
import crypto from 'crypto';
//import { sendInvoiceEmail } from './invoice.js';
dotenv.config();
export async function Checkout(req, res) {
   // console.log(req.body);
    try {
        const options = {
            amount: req.body.totalPrice*100,  // amount in the smallest currency unit
            currency: "INR",
        
        };
        const order = await instance.orders.create(options);
        console.log(order);
        res.status(200).json({ success: true, order,key:process.env.RAZORPAY_ID});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'An error occurred during checkout.' });
    }
}
//generate invoice data
// function generateInvoiceData(invoiceNumber, date, items) {
//     // Calculate total price based on items
//     const total = items.reduce((acc, item) => acc + item.price, 0);

//     // Create invoiceData object dynamically
//     const invoiceData = {
//         invoiceNumber: invoiceNumber,
//         date: date,
//         items: items,
//         total: total
//     };

//     return invoiceData;
// }

export async function paymentVerification(req, res) {
    try {
        console.log(req.body);
        const sha=crypto.createHmac('sha256', process.env.RAZORPAY_SECRET).update(req.body.value.razorpay_order_id+ "|" + req.body.value.razorpay_payment_id).digest('hex');
      //  console.log(req.body.value.razorpay_signature,sha);
        if(sha!==req.body.value.razorpay_signature){
            res.status(400).json({ success: false, error: 'Invalid signature.' });
        }
        else
        {
            //const invoiceNumber = 'INV-001';
           // const invoiceData = generateInvoiceData(invoiceNumber, req.body.order_date, req.body.order_data);
          //  await sendInvoiceEmail(req.body.useremail, invoiceData);
        res.status(200).json({
             success: true ,
             msg:"payment verified successfully",
             orderId:req.body.razorpay_order_id,
             paymentId:req.body.razorpay_payment_id
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'An error occurred during payment verification.' });
    }
}
