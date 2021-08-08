import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SideDrawer({ children }) {
  const dispatch = useDispatch();
  const { cart, drawer } = useSelector((state) => ({ ...state }));

  function handleClose() {
    dispatch({
      type: "SET_VISIBLE",
      payload: false,
    });
  }

  return (
    <Drawer
      title="Your Cart"
      placement="right"
      closable={false}
      onClose={handleClose}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id}>
          <p className="text-xs">
            {p.name} &times; {p.count} = ${p.price}
          </p>
        </div>
      ))}

      <Link to="/cart">
        <button
          className="bg-gray-800 px-4 py-2 rounded-xl text-white w-full uppercase tracking-wider"
          onClick={handleClose}
        >
          Go to Cart
        </button>
      </Link>
    </Drawer>
  );
}

export default SideDrawer;
