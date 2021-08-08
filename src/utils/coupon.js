import axios from "axios";

export async function getCoupons() {
  return await axios.get(`${process.env.REACT_APP_API_URL}/coupons`);
}

export async function createCoupon(coupon, authtoken) {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
}

export async function removeCoupon(couponId, authtoken) {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/coupon/${couponId}`,
    {
      headers: {
        authtoken,
      },
    }
  );
}
