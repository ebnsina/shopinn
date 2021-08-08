import { useEffect, useState } from "react";
import AdminNav from "../../../components/layouts/AdminNav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { createCoupon, getCoupons, removeCoupon } from "../../../utils/coupon";
import { toast } from "react-toastify";
import { BiTrashAlt } from "react-icons/bi";

function AdminCoupon() {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");
  const [loading, setLoading] = useState("");
  const [coupons, setCoupons] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    couponLists();
  }, [coupons]);

  async function couponLists() {
    try {
      const res = await getCoupons();
      setCoupons(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await createCoupon({ name, discount, expiry }, user.token);
      setLoading(true);
      setName("");
      setDiscount("");
      setExpiry("");
      toast.success("Coupon is created.");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemove(couponId) {
    if (window.confirm("Are you sure to delete?")) {
      setLoading(true);
      await removeCoupon(couponId, user.token);
      const res = await getCoupons();
      setCoupons(res.data);
      toast.success("Coupon deleted.");
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-8 py-4 flex">
      <aside className="w-1/4">
        <AdminNav />
      </aside>

      <div className="w-3/4">
        <div className="grid grid-cols-2 gap-10">
          <div className="max-w-xs">
            <h2 className="text-base font-semibold mb-4">Admin Coupon</h2>

            <form onSubmit={handleSubmit}>
              <input
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-500 mb-6"
                type="text"
                name="name"
                placeholder="coupon code"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />

              <input
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-500 mb-6"
                type="text"
                name="name"
                placeholder="discount %"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />

              <DatePicker
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-500 mb-6"
                selected={new Date()}
                value={expiry}
                onChange={(date) => setExpiry(date)}
                placeholderText="expiry date"
              />

              <button
                className="bg-black text-white px-6 py-2 rounded-lg w-full"
                type="submit"
              >
                Apply
              </button>
            </form>
          </div>

          <div>
            <table className="shop-table text-center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Discount</th>
                  <th>Expiry</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon._id}>
                    <td>{coupon.name}</td>
                    <td>{coupon.discount}%</td>
                    <td>{new Date(coupon.expiry).toLocaleDateString()}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleRemove(coupon._id)}
                      >
                        <BiTrashAlt size="1.1rem" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCoupon;
