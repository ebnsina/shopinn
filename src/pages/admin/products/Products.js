import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LocalSearch from "../../../components/forms/LocalSearch";
import AdminNav from "../../../components/layouts/AdminNav";
import { getProductsByCount, removeProduct } from "../../../utils/product";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  async function loadAllProducts() {
    try {
      setLoading(true);
      const res = await getProductsByCount(10);
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function handleRemove(slug) {
    try {
      if (window.confirm("Are you sure to delete?")) {
        await removeProduct(slug, user.token);
        setLoading(false);
        toast.success("Category deleted.");
        loadAllProducts();
      }
    } catch (err) {
      if (err.response.status === 400) {
        setLoading(false);
        toast.error(err.response.data);
      }
    }
  }

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container mx-auto px-8 py-4 flex">
      <aside className="w-1/4">
        <AdminNav />
      </aside>

      <div className="w-3/4">
        <div className="flex justify-between">
          <h2 className="text-base font-semibold mb-4">Admin Products</h2>
          <LocalSearch
            keyword={keyword}
            setKeyword={setKeyword}
            placeholder="Search all products..."
          />
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Subcategory
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Brand
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Color
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Shipping
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.filter(searched(keyword)).map((product) => (
                        <tr key={product._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {`${product.description.substring(0, 40)}...`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.category.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.subcategory.map(
                              (category) => category.name
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.brand}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.color}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.shipping}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap space-x-4">
                            <Link
                              className="bg-blue-400 px-4 py-1 text-xs text-white rounded-lg"
                              to={`/admin/product/${product.slug}`}
                            >
                              Edit
                            </Link>
                            <button
                              className="bg-red-400 px-4 py-1 text-xs text-white rounded-lg"
                              onClick={() => handleRemove(product.slug)}
                              type="button"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
