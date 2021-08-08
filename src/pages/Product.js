import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RelatedProduct from "../components/products/RelatedProduct";
import SingleProduct from "../components/products/SingleProduct";
import { getProduct, getRelated, productStar } from "../utils/product";

function Product({ match }) {
  const [product, setProduct] = useState();
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);

  const { slug } = match.params;
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    singleProduct();
  }, [slug]);

  useEffect(() => {
    if (product && product.ratings && user) {
      let existingRating = product.ratings.find(
        (el) => el.postedBy.toString() === user._id.toString()
      );
      existingRating && setStar(existingRating.star);
    }
  }, [product]);

  async function singleProduct() {
    try {
      const res = await getProduct(slug);
      setProduct(res.data);
      const relatedProduct = await getRelated(res.data._id);
      setRelated(relatedProduct.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handlStarRating(rating, name) {
    setStar(rating);
    const res = await productStar(name, rating, user.token);
    console.log(res.data);
    singleProduct();
  }

  return (
    <div className="container mx-auto px-8 py-4">
      <div>
        {product && (
          <SingleProduct
            key={product._id}
            product={product}
            star={star}
            handlStarRating={handlStarRating}
          />
        )}
      </div>

      <div>
        <RelatedProduct related={related} />
      </div>
    </div>
  );
}

export default Product;
