import { Link, useHistory } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import StarRatings from "react-star-ratings";
import RatingModal from "../common/Modal";
import AverageRating from "../../utils/rating";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToWishlist } from "../../utils/user";

function SingleProduct({ product, handlStarRating, star }) {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  let history = useHistory();

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

  async function handleWishlist() {
    try {
      await addToWishlist(product._id, user.token);
      toast.success("Add to Wishlist.");
      history.push("/user/wishlist");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="flex gap-20">
        <div className="w-3/5">
          <Carousel>
            {product.images &&
              product.images.map((image) => (
                <img key={image.public_url} src={image.url} alt="" />
              ))}
          </Carousel>
        </div>
        <div className="w-2/5">
          <h3 className="text-2xl font-semibold">{product.name}</h3>
          <p className="text-sm font-semibold">Price: ${product.price}</p>
          <p className="text-sm font-semibold">Brand: {product.brand}</p>
          <p className="text-sm font-semibold">Color: {product.color}</p>
          <p className="text-sm font-semibold">Shipping: {product.shipping}</p>
          <p className="text-sm font-semibold">Sold: {product.sold}</p>
          <p className="text-sm font-semibold">
            Category:{" "}
            <Link
              key={product.category.slug}
              to={`/category/${product.category.slug}`}
            >
              {product.category.name}
            </Link>
          </p>
          <p className="text-sm font-semibold space-x-2">
            Subcategory:{" "}
            {product.subcategory.map((sub) => (
              <Link key={sub.slug} to={`/subcategory/${sub.slug}`}>
                {sub.name}
              </Link>
            ))}
          </p>
          <p className="text-sm font-semibold">
            Average Rating:{" "}
            {product && product.ratings && product.ratings.length > 0
              ? AverageRating(product)
              : "No rating yet!"}
          </p>

          <div className="flex space-x-2 mt-20">
            <button
              onClick={handleAddToCart}
              className="border border-blue-500 hover:text-blue-400 px-4 py-1 rounded-lg"
            >
              Add To Cart
            </button>
            <button
              type="button"
              onClick={handleWishlist}
              className="border border-green-500 text-green-500 hover:text-green-400 px-4 py-1 rounded-lg"
            >
              Add To Wishlist
            </button>

            <RatingModal>
              <StarRatings
                rating={star}
                numberOfStars={5}
                starRatedColor="gold"
                changeRating={handlStarRating}
                name={product._id}
                starDimension="60px"
              />
            </RatingModal>
          </div>
        </div>
      </div>

      <hr />

      <div>
        <h3 className="text-base font-semibold my-4">Description:</h3>
        <p>{product.description}</p>
      </div>
    </div>
  );
}

export default SingleProduct;
