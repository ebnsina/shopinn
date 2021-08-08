import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCheckout from "../components/products/ProductCheckout";
import { userCart } from "../utils/user";

function Cart({ history }) {
  const { user, cart } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  function calculateTotal() {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  }

  async function saveOrderToDatabase() {
    try {
      const res = await userCart(cart, user.token);

      if (res.data.ok) {
        history.push("/checkout");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function saveCodOrderToDatabase() {
    try {
      const res = await userCart(cart, user.token);

      dispatch({
        type: "COD",
        payload: true,
      });

      if (res.data.ok) {
        history.push("/checkout");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto px-8 py-4">
      <div className="flex -mx-6">
        <div className="w-3/4 mx-6">
          <h3 className="text-2xl font-semibold">Your cart</h3>

          <div class="flex flex-col">
            {!cart.length ? (
              <p>
                No product in your cart!{" "}
                <Link to="/shop">Continue shopping</Link>
              </p>
            ) : (
              <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Image
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Brand
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Color
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Count
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Shipping
                          </th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Remove</span>
                          </th>
                        </tr>
                      </thead>
                      {cart.map((p) => (
                        <ProductCheckout key={p._id} p={p} />
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-1/4 mx-6">
          <h3 className="text-2xl font-semibold">Order Summary</h3>

          {cart.map((c, i) => (
            <div key={i}>
              <p className="font-bold">
                {c.name} &times; {c.count} = $ {c.price * c.count}
              </p>
            </div>
          ))}

          <hr className="my-4" />

          <p className="text-xl font-bold flex justify-end">
            Total: $ {calculateTotal()}
          </p>

          {user ? (
            <div>
              <button
                disabled={!cart.length}
                onClick={saveOrderToDatabase}
                className="bg-gray-800 px-4 py-2 rounded-xl text-white w-full uppercase tracking-wider"
              >
                Proceed to checkout
              </button>

              <button
                disabled={!cart.length}
                onClick={saveCodOrderToDatabase}
                className="bg-gray-800 px-4 py-2 rounded-xl text-white w-full uppercase tracking-wider mt-4"
              >
                Pay Cash On Delivery
              </button>
            </div>
          ) : (
            <button className="bg-gray-800 px-4 py-2 rounded-xl text-white w-full uppercase tracking-wider">
              <Link
                to={{
                  pathname: "/login",
                  state: {
                    from: "cart",
                  },
                }}
              >
                Login to checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
