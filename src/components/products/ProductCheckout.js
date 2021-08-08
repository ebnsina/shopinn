import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const colors = ["Blue", "Sliver", "Black", "White", "Green"];

function ProductCheckout({ p }) {
  const dispatch = useDispatch();

  function handleColorChange(e) {
    let cart = [];

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === p._id) {
        cart[i].color = e.target.value;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  }

  function handleQuantityChange(e) {
    const count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === p._id) {
        cart[i].count = count;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  }

  function handleRemove() {
    let cart = [];

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === p._id) {
        cart.splice(i, 1);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  }

  return (
    <tbody class="bg-white divide-y divide-gray-200">
      <tr>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <div class="flex-shrink-0 h-10 w-10">
              <img
                class="h-10 w-10 rounded-full"
                src={p.images[0].url}
                alt=""
              />
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-500">{p.name}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          $ {p.price}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {p.brand}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <select name="color" onChange={handleColorChange}>
            {p.color ? (
              <option>{p.color}</option>
            ) : (
              <option>Select color</option>
            )}
            {colors
              .filter((c) => c !== p.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm flex text-gray-500">
          <input
            onChange={handleQuantityChange}
            type="number"
            value={p.count}
            className="focus:outline-none focus::border-b focus:border-gray-300"
          />
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {p.shipping === "Yes" ? (
            <AiOutlineCheckCircle size="1.3rem" color="seagreen" />
          ) : (
            <AiOutlineCloseCircle size="1.3rem" color="red" />
          )}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium cursor-pointer">
          <RiDeleteBin6Line onClick={handleRemove} size="1.3rem" color="red" />
        </td>
      </tr>
    </tbody>
  );
}

export default ProductCheckout;
