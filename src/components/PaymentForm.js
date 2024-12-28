import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import '../Styles/PaymentForm.css';

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const { reservationData } = location.state || {}; // Ensure location.state is available

  const {
    finalPrice,
  } = location.state || { finalPrice: 0 };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    // Call generateTicket before handling payment result
    generateTicket();

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          withCredentials: true,
          amount: finalPrice * 100, // Convert to cents if needed
          id,
        });

        if (response.status === 200) {
          console.log("Payment Successful");
          setSuccess(true);
        } else {
          setErrorMessage("Payment failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during payment:", error);
        setErrorMessage("Payment request failed. Please try again.");
      }
    } else {
      console.error("Stripe payment error:", error.message);
      setErrorMessage("There was an issue with your payment method.");
    }
  };

  const generateTicket = () => {
    // Generate a unique ticket code
    const ticketCode = `TICKET-${Math.floor(Math.random() * 1000000)}`;

    const doc = new jsPDF();
    doc.setFont("times", "normal");

    // Keep the background white
    doc.setFillColor(255, 255, 255); // White background
    doc.rect(10, 10, 190, 277, "F"); // White background for the ticket

    // Add ticket title
    doc.setTextColor(0, 0, 0); // Black text color
    doc.setFontSize(24);
    doc.text("Payment Ticket", 105, 40, null, null, "center");

    // Add ticket code and price details
    doc.setFontSize(18);
    doc.text(`Ticket Code: ${ticketCode}`, 105, 100, null, null, "center");
    doc.text(`Amount Paid: $${finalPrice.toFixed(2)}`, 105, 130, null, null, "center");

    // Footer message
    doc.setFontSize(14);
    doc.text("Thank you for your purchase!", 105, 200, null, null, "center");

    // Save the PDF as a file
    doc.save("payment_ticket.pdf");
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <h3>${finalPrice.toFixed(2)}</h3>
          <button>Pay</button>
        </form>
      ) : (
        <div>
          <h2>Payment Successful!</h2>
          <p>Your ticket will be downloaded shortly.</p>
        </div>
      )}

      {errorMessage && <div className="error">{errorMessage}</div>}
    </>
  );
}
