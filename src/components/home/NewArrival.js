import { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../utils/product";
import LoadingSkeleton from "../common/LoadingSkeleton";
import ProductCard from "../products/ProductCard";
import { Pagination } from "antd";

function NewArrival() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllProduct();
    productsCountFn();
  }, [page]);

  async function getAllProduct() {
    try {
      setLoading(true);
      const res = await getProducts("createdAt", "desc", page);
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function productsCountFn() {
    try {
      const res = await getProductsCount();
      setProductCount(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold my-4 text-center">New Arrival</h1>
      {loading ? (
        <LoadingSkeleton count={3} />
      ) : (
        <>
          <div className="grid grid-cols-3 gap-10">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                loading={loading}
              />
            ))}
          </div>

          <div className="flex justify-center items-center my-4">
            <Pagination
              current={page}
              total={(productsCount / 3) * 10}
              onChange={(value) => setPage(value)}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default NewArrival;
