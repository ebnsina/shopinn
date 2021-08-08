import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createPaymentIntent } from "../../utils/stripe";
import { createOrder, emptyUserCart } from "../../utils/user";

function StripeCheckout() {
  const [succeeded, setSucceeded] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    makePaymentIntent();
  }, []);

  async function makePaymentIntent() {
    try {
      const res = await createPaymentIntent(coupon, user.token);
      setClientSecret(res.data.clientSecret);
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    } catch (error) {
      console.log(error);
    }
  }

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "inherit",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  async function handleSubmit(e) {
    e.preventDefault();

    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      const res = await createOrder(payload, user.token);

      if (res.data.ok) {
        localStorage.removeItem("cart");

        dispatch({ type: "ADD_TO_CART", payload: [] });
        dispatch({ type: "COUPON_APPLIED", payload: false });

        emptyUserCart(user.token);
      }
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  }

  function handleChange(e) {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  }

  return (
    <div className="container max-w-md mx-auto py-10">
      {succeeded && (
        <h2 className="text-base font-semibold mb-4 text-center">
          Payment Successfull.{" "}
          <Link to="/user/history">Check your purchase history.</Link>
        </h2>
      )}

      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <h2 className="text-sm text-green-500 font-semibold mb-4 text-center">
              Coupon code is applied. Payable after discount: $
              {totalAfterDiscount}
            </h2>
          ) : (
            <h2 className="text-xs text-gray-500 mb-4 text-center">
              No coupon applied.
            </h2>
          )}
        </div>
      )}

      <div className="my-4 flex justify-between items-center">
        <p className="text-base font-semibold mb-4">Total: ${cartTotal}</p>
        <p className="text-base font-semibold mb-4">
          Total Payable: ${(payable / 100).toFixed(2)}
        </p>
      </div>

      <form onSubmit={handleSubmit} id="payment-form" className="stripe-form">
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button mt-4"
          disabled={processing || disabled || succeeded}
        >
          {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
        </button>

        {error && <p className="text-center text-red-500 my-4">{error}</p>}
      </form>
    </div>
  );
}

export default StripeCheckout;
