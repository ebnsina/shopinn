import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { RiShoppingCartLine } from "react-icons/ri";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { MdRemoveShoppingCart } from "react-icons/md";

function ProductCard({ product }) {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  function handleAddToCart() {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.push({
        ...product,
        count: 1,
      });

      const uniqueCart = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(uniqueCart));

      dispatch({
        type: "ADD_TO_CART",
        payload: uniqueCart,
      });

      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  }

  return (
    <div className="border border-gray-200 bg-white shadow-sm rounded-2xl">
      <div className="w-full">
        <img
          className="h-64 mx-auto block"
          src={product.images && product.images[0].url}
          alt=""
        />
      </div>
      <div className="p-4">
        <h4 className="text-xl font-semibold">{product.name}</h4>
        <p className="text-sm text-gray-600">
          {`${product.description.substring(0, 50)}...`}
        </p>

        <div className="flex justify-between items-center">
          <p className="text-base text-gray-600">$ {product.price}</p>

          <div className="flex justify-between items-center space-x-4 text-center">
            <Link
              className="border border-blue-500 px-6 py-2 rounded-lg w-full"
              to={`/product/${product.slug}`}
            >
              <AiOutlineEye size="1.1rem" />
            </Link>
            <button
              disabled={product.quantity < 1}
              onClick={handleAddToCart}
              type="button"
              className="border border-black text-black hover:text-gray-600 px-6 py-2 rounded-lg w-full"
            >
              {product.quantity < 1 ? (
                <MdRemoveShoppingCart size="1.1rem" />
              ) : (
                <RiShoppingCartLine size="1.1rem" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
