import React from 'react'
import "./plans.scss"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Plans = ({name , amt  , features}) => {
  const navigate = useNavigate()

  const paymentHandler = async(req,res) => {
    const response = await axios.post("http://localhost:3000/order" , {amt})
    const order =  response.data
    console.log(order);


    var options = {
        "key": "rzp_test_YjwKsc2YoXgoQF", // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        "name": "Netflix By Himanshu", //your business name
        "description": "Complete Transaction",
        "image": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png",
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler":  async function (order){
          axios.post("http://localhost:3000/order/validate" , order)
          .then((res) => {
            console.log(res);
            navigate("/")
          }).catch((err) => {
            console.log(err);
          })
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            "name": "Himanshu", //your customer's name
            "email": "Himanshu@dhiskyau.com", 
            "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#ee0a0a"
        }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
}
  return (<>

  <div className='screen'>
  <div class="bg-image"></div>

<div className='planContainer'>
    <h2>{name}</h2>
    <div className='text'>
        <h1>{amt}USD</h1>
    </div>
    <div className='content'>
        <h3>Features/Benefits</h3>
        <ul>
        {
            features?.map((item, index) => {
               return <li key={index}>{item}</li>
            })
        }
        </ul>
    </div>
    <button className='Btn' onClick={paymentHandler}> Pay Now </button>
</div>

 
  </div>
 
    
    </>
  )
}

export default Plans