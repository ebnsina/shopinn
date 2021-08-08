import { useState } from "react";

function SingleOrder({ order }) {
  console.log(order);

  return (
    <div>
      {order.products.map((p, i) => (
        <div>{p.name}</div>
      ))}
    </div>
  );
}

export default SingleOrder;
