import { useEffect, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import { getCategory } from "../utils/category";

function Category({ match }) {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    getCategoryList();
  }, []);

  async function getCategoryList() {
    const res = await getCategory(slug);
    console.log(res.data);
    setCategory(res.data.category);
    setProducts(res.data.products);
  }

  return (
    <div className="container mx-auto px-8 py-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <h3 className="text-2xl mb-4">
          {products.length} Products in{" "}
          <span className="font-bold">"{category.name}"</span> category.
        </h3>
      )}

      <div className="grid grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} loading={loading} />
        ))}
      </div>
    </div>
  );
}

export default Category;
