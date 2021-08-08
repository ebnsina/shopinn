import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserNav from "../../components/layouts/UserNav";
import { getUserOrders } from "../../utils/user";
import ShowPaymentInfo from "../../components/order/ShowPaymentInfo";

function UserHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    try {
      setLoading(true);
      const res = await getUserOrders(user.token);
      setOrders(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  function showOrderInTable(order) {
    return (
      <div>
        <small>Product Information</small>
        <table className="shop-table text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Color</th>
              <th>Count</th>
              <th>Shipping</th>
            </tr>
          </thead>

          <tbody>
            {order.products.map((p, i) => (
              <tr key={i}>
                <td>{p.product.name}</td>
                <td>{p.product.price}</td>
                <td>{p.product.brand}</td>
                <td>{p.color}</td>
                <td>{p.count}</td>
                <td>{p.product.shipping}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <section className="">
      <div className="container mx-auto px-8 py-4 flex">
        <aside className="w-1/4">
          <UserNav />
        </aside>
        <div className="w-3/4">
          <h3 className="text-base font-semibold mb-4">
            {orders.length > 0 ? (
              <span>Orders ({orders.length})</span>
            ) : (
              "No purchase orders"
            )}
          </h3>

          <div>
            {orders.map((order, i) => (
              <div key={i}>
                <ShowPaymentInfo order={order} />
                {showOrderInTable(order)}
                <hr className="my-6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserHistory;
