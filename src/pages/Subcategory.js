import { useEffect, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import { getSubcategory } from "../utils/subcategory";

function Subcategory({ match }) {
  const [subcategory, setSubcategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    getSubcategoryList();
  }, []);

  async function getSubcategoryList() {
    const res = await getSubcategory(slug);
    console.log(res.data);
    setSubcategory(res.data.subcategory);
    setProducts(res.data.products);
  }

  return (
    <div className="container mx-auto px-8 py-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <h3 className="text-2xl mb-4">
          {products.length} Products in{" "}
          <span className="font-bold">"{subcategory.name}"</span> subcategory.
        </h3>
      )}

      <div className="grid grid-cols-3 gap-10">
        {products &&
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              loading={loading}
            />
          ))}
      </div>
    </div>
  );
}

export default Subcategory;
