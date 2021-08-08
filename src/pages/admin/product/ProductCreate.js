import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../utils/product";
import { Link } from "react-router-dom";
import LocalSearch from "../../../components/forms/LocalSearch";
import AdminNav from "../../../components/layouts/AdminNav";
import { getCategories, getSubcategories } from "../../../utils/category";
import FileUpload from "../../../components/forms/FileUpload";

import { Select } from "antd";
const { Option } = Select;

function ProductCreate() {
  const [keyword, setKeyword] = useState("");
  const [suboptions, setSupoptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const initialState = {
    name: "",
    description: "",
    price: "",
    category: "",
    categories: [],
    subcategory: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Blue", "Sliver", "Black", "White", "Green"],
    brands: ["Apple", "Microsoft", "Samsung", "Lenovo", "Asus"],
    color: "",
    brand: "",
  };

  const [values, setValues] = useState(initialState);

  const {
    name,
    description,
    price,
    category,
    categories,
    subcategory,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const res = await getCategories();
    setValues({ ...values, categories: res.data });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    createProduct(values, user.token);
    toast.success("Product create successfully.");
    setValues({ ...initialState });
    try {
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.err);
      setLoading(false);
    }
  }

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleCategoryChange(e) {
    setValues({ ...values, category: e.target.value });
    const res = await getSubcategories(e.target.value);
    setSupoptions(res.data);
  }

  return (
    <div className="container mx-auto px-8 py-4 flex">
      <aside className="w-1/4">
        <AdminNav />
      </aside>

      <div className="w-3/4">
        <div className="max-w-sms">
          <h2 className="text-base font-semibold mb-4">Create a new product</h2>

          <div className="">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <div className="mb-3">
                    <input
                      className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-500"
                      value={name}
                      onChange={handleChange}
                      type="text"
                      name="name"
                      required
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-500"
                      name="description"
                      value={description}
                      rows="3"
                      onChange={handleChange}
                      placeholder="Description"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <input
                      className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-500"
                      value={price}
                      onChange={handleChange}
                      type="number"
                      name="price"
                      required
                      placeholder="Price"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-500"
                      value={quantity}
                      onChange={handleChange}
                      type="number"
                      name="quantity"
                      required
                      placeholder="Quantity"
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      className="px-4 py-2 mb-4 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-300"
                      name="shipping"
                      onChange={handleChange}
                    >
                      <option value="">Select shipping method</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className="mb-3">
                    <select
                      className="px-4 py-2 mb-4 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-300"
                      name="brand"
                      onChange={handleChange}
                    >
                      <option value="">Select brand</option>
                      {values.brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <select
                      className="px-4 py-2 mb-4 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-300"
                      name="color"
                      onChange={handleChange}
                    >
                      <option value="">Select color</option>
                      {values.colors.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <select
                      className="px-4 py-2 mb-4 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-300"
                      name="category"
                      onChange={handleCategoryChange}
                    >
                      <option value="">Please select a category</option>
                      {categories.length > 0 &&
                        categories.map((category) => (
                          <option value={category._id} key={category._id}>
                            {category.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {suboptions.length > 0 && (
                    <div className="mb-3">
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Please select"
                        value={subcategory}
                        onChange={(value) =>
                          setValues({ ...values, subcategory: value })
                        }
                      >
                        {suboptions.length &&
                          suboptions.map((sub) => (
                            <Option key={sub._id} value={sub._id}>
                              {sub.name}
                            </Option>
                          ))}
                      </Select>
                    </div>
                  )}

                  <div>
                    <FileUpload
                      values={values}
                      setValues={setValues}
                      loading={loading}
                      setLoading={setLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-8">
                <Link
                  className="bg-red-500 text-white text-center px-6 py-2 rounded-lg w-full"
                  to="/admin/products"
                >
                  Cancel
                </Link>
                <button
                  className="bg-black text-white px-6 py-2 rounded-lg w-full"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCreate;
