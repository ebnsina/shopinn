import axios from "axios";

export async function getOrders(authToken) {
  return await axios.get(`${process.env.REACT_APP_API_URL}/admin/orders`, {
    headers: {
      authToken,
    },
  });
}

export async function changeStatus(orderId, orderStatus, authToken) {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authToken,
      },
    }
  );
}
