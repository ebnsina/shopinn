import axios from "axios";

export async function createPaymentIntent(coupon, authtoken) {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/create-payment-intent`,
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
}
