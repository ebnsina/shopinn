import axios from "axios";

export async function userCart(cart, authtoken) {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );
}

export async function getUserCart(authtoken) {
  return await axios.get(`${process.env.REACT_APP_API_URL}/user/cart`, {
    headers: {
      authtoken,
    },
  });
}

export async function emptyUserCart(authtoken) {
  return await axios.delete(`${process.env.REACT_APP_API_URL}/user/cart`, {
    headers: {
      authtoken,
    },
  });
}

export async function saveAddress(address, authtoken) {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );
}

export async function applyCoupon(coupon, authtoken) {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/user/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
}

export async function createOrder(stripeResponse, authtoken) {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/user/order`,
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  );
}

export async function getUserOrders(authtoken) {
  return await axios.get(`${process.env.REACT_APP_API_URL}/user/orders`, {
    headers: {
      authtoken,
    },
  });
}

export async function addToWishlist(productId, authtoken) {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );
}

export async function getWishlist(authtoken) {
  return await axios.get(`${process.env.REACT_APP_API_URL}/user/wishlist`, {
    headers: {
      authtoken,
    },
  });
}

export async function removeWishlist(productId, authtoken) {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}

export async function createCOD(cod, couponCheck, authtoken) {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/user/cod`,
    { cod, couponApplied: couponCheck },
    {
      headers: {
        authtoken,
      },
    }
  );
}
