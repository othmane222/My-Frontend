const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    cors({
      origin: 'http://localhost:3000', // Allow only your frontend
      credentials: true, // Allow cookies and authentication headers
    })
  );

app.post("/payment", cors(), async (req, res) => {
    let { amount, id } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "MyCompany",
            payment_method: id,
            confirm: true,
            return_url: "https://yourdomain.com/payment-completed", // Add your return URL here
        });
        console.log("Payment", payment);
        res.json({
            message: "Payment successful",
            success: true,
        });
    } catch (error) {
        console.log("Error", error);
        res.json({
            message: "Payment failed",
            success: false,
        });
    }
});

app.listen(process.env.PORT || 4000, () => {
    console.log("Server is listening on port 4000");
});
