const express = require("express")
const cors = require("cors")
const Razorpay = require("razorpay")
require('dotenv').config()
const crypto = require("crypto");
const { log } = require("console");
const app = express()

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.post("/order", async (req , res ) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.key_id,
            key_secret: process.env.key_secret,
        })
    
        const option = req.body;
        console.log(option);
        const razorpayOrder = await razorpay.orders.create({
            amount: Number(req.body.amt * 100),
            currency: 'INR'
        });
    
        if(!razorpayOrder){
            return res.status(500).send('error')
        }else{
            res.json(razorpayOrder)
            
        } 
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
   
})


app.post("/order/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const sha = crypto.createHmac("sha256", process.env.key_secret);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }
  
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  });


app.listen(3000, () => {
    console.log("server running....");
})