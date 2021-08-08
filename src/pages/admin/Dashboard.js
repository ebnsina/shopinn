import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminNav from "../../components/layouts/AdminNav";
import { changeStatus, getOrders } from "../../utils/admin";
import Order from "../../components/order/Order";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getAllOrders();
  }, []);

  async function getAllOrders() {
    try {
      const res = await getOrders(user.token);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleStatusChange(orderId, orderStatus) {
    try {
      await changeStatus(orderId, orderStatus, user.token);
      toast.success("Order status updated.");
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="">
      <div className="container mx-auto px-8 py-4 flex">
        <aside className="w-1/4">
          <AdminNav />
        </aside>
        <div className="w-3/4">
          <h3 className="text-base font-semibold mb-4">All Orders</h3>

          <div className="grid grid-cols-2 gap-10">
            {orders.map((order, i) => (
              <Order order={order} handleStatusChange={handleStatusChange} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
