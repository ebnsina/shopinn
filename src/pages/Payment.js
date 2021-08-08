import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "../styles/stripe.css";
import StripeCheckout from "../components/stripe/StripeCheckout";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function Payment() {
  return (
    <div className="container mx-auto px-8 py-10">
      <Elements stripe={stripePromise}>
        <StripeCheckout />
      </Elements>
    </div>
  );
}

export default Payment;
