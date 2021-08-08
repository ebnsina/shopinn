import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyCoupon,
  createCOD,
  emptyUserCart,
  getUserCart,
  saveAddress,
} from "../utils/user";

function Checkout({ history }) {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const { user, cod } = useSelector((state) => ({ ...state }));
  const couponCheck = useSelector((state) => state.coupon);

  useEffect(() => {
    userCart();
  }, []);

  async function userCart() {
    const res = await getUserCart(user.token);
    setProducts(res.data.products);
    setTotal(res.data.cartTotal);
  }

  async function handleEmptyCart() {
    // Remove from localStorage
    if (window !== "undefined") {
      localStorage.removeItem("cart");
    }

    // Remove from Redux

    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    // Remove from Backend
    const res = await emptyUserCart(user.token);
    setProducts([]);
    setTotal(0);
    setTotalAfterDiscount(0);
    setCoupon("");
  }

  async function saveAddressToDatabase() {
    const res = await saveAddress(address, user.token);

    if (res.data.ok) {
      setAddressSaved(true);
    }
  }

  async function handleCouponSubmit(e) {
    e.preventDefault();

    const res = await applyCoupon(coupon, user.token);

    if (res.data) {
      setTotalAfterDiscount(res.data);

      dispatch({
        type: "COUPON_APPLIED",
        payload: true,
      });
    }

    if (res.data.err) {
      setDiscountError(res.data.err);
      dispatch({
        type: "COUPON_APPLIED",
        payload: false,
      });
    }
  }

  async function handleCOD() {
    const res = await createCOD(cod, couponCheck, user.token);

    if (res.data) {
      localStorage.removeItem("cart");

      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });

      dispatch({
        type: "COUPON_APPLIED",
        payload: false,
      });

      dispatch({
        type: "COD",
        payload: false,
      });

      emptyUserCart(user.token);

      setTimeout(() => {
        history.push("/user/history");
      }, 1000);
    }
  }

  return (
    <div className="container mx-auto px-8 py-10">
      <div className="grid grid-cols-2 gap-24">
        <div className="">
          <div className="mb-3">
            <h3 className="text-base font-bold mb-4">Devlivery Address</h3>

            <div>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-500"
                name="address"
                rows="5"
                placeholder="Dhaka, Bangladesh."
              ></textarea>
            </div>

            <div className="mt-4 max-w-xs ml-auto">
              <button
                onClick={saveAddressToDatabase}
                type="button"
                className="bg-blue-500 px-4 py-2 rounded-xl text-white w-full uppercase tracking-wider max-w-xs"
              >
                Save
              </button>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-base font-bold mb-4">Have coupon code?</h3>
            {discountError && (
              <p className="my-4 text-red-400 font-semibold">{discountError}</p>
            )}

            <div className="grid grid-cols-2 gap-10">
              <form onSubmit={handleCouponSubmit}>
                <input
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-500 mb-4"
                  type="text"
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                    setDiscountError("");
                  }}
                  placeholder="Apply coupon code"
                />
                <button
                  type="submit"
                  className="bg-gray-700 px-4 py-2 rounded-xl text-white w-full uppercase tracking-wider max-w-xs"
                >
                  Apply
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="">
          <div>
            <h3 className="text-base font-bold mb-4">Order Summary</h3>

            <div className="mb-6">
              <h3 className="text-base font-bold mb-4">
                Products ({products.length})
              </h3>

              {products.map((p, index) => (
                <div key={index}>
                  <p>
                    {p.product.name} ({p.color}) &times; {p.count} = ${" "}
                    {p.product.price * p.count}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="text-base font-bold mb-4">
                Cart Total: $ {total}
              </h3>

              {totalAfterDiscount.length > 0 && (
                <>
                  <hr className="my-4" />

                  <h3 className="text-base font-bold mb-4">
                    Discount Total: $ {totalAfterDiscount}
                  </h3>
                </>
              )}
            </div>

            <div className="flex space-x-8">
              <button
                disabled={!products.length}
                onClick={handleEmptyCart}
                type="button"
                className="border border-blue-300 px-4 py-2 rounded-xl text-blue-400 w-full uppercase tracking-wider"
              >
                Empty Cart
              </button>
              {cod ? (
                <button
                  onClick={handleCOD}
                  disabled={!addressSaved || !products.length}
                  type="button"
                  className="bg-gray-700 px-4 py-2 rounded-xl text-white w-full uppercase tracking-wider"
                >
                  Place Order
                </button>
              ) : (
                <button
                  onClick={() => history.push("/payment")}
                  disabled={!addressSaved || !products.length}
                  type="button"
                  className="bg-gray-700 px-4 py-2 rounded-xl text-white w-full uppercase tracking-wider"
                >
                  Place Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
