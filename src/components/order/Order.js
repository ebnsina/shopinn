import React from "react";
import ShowPaymentInfo from "./ShowPaymentInfo";

function Order({ order, handleStatusChange }) {
  return (
    <div>
      <ShowPaymentInfo order={order} />
      <div className="mb-6 mt-4">
        <small>Delivery Status</small>
        <select
          name="status"
          defaultValue={order.orderStatus}
          className="px-4 py-2  border border-gray-200 focus:outline-none w-full focus:border-gray-500"
          onChange={(e) => handleStatusChange(order._id, e.target.value)}
        >
          <option value="Not processed">Not processed</option>
          <option value="Cash on delivery">Cash on delivery</option>
          <option value="Processing">Processing</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
}

export default Order;
