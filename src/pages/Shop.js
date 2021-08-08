import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/products/ProductCard";
import { getProductsByCount, fetchProductsByFilter } from "../utils/product";
import { Slider, Checkbox, Radio } from "antd";
import { HiOutlineAdjustments } from "react-icons/hi";

import { getCategories } from "../utils/category";
import Star from "../components/forms/Star";
import { getSubcategories } from "../utils/subcategory";

const initialBrandValues = ["Apple", "Microsoft", "Samsung", "Lenovo", "Asus"];
const initialColorValues = ["Blue", "Sliver", "Black", "White", "Green"];

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [star, setStar] = useState();
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState(initialBrandValues);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState(initialColorValues);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    getAllProducts();
    getAllCategories();
    getAllSubcategories();
  }, []);

  async function getAllProducts() {
    setLoading(true);
    const res = await getProductsByCount(10);
    setProducts(res.data);
    setLoading(false);
  }

  async function filterSearchProducts(args) {
    const res = await fetchProductsByFilter(args);
    setProducts(res.data);
  }

  async function getAllCategories() {
    const res = await getCategories();
    setCategories(res.data);
  }

  async function getAllSubcategories() {
    const res = await getSubcategories();
    setSubcategories(res.data);
  }

  useEffect(() => {
    const delayed = setTimeout(() => {
      filterSearchProducts({ query: text });
      if (!text) {
        getAllProducts();
      }
    }, 300);

    return () => clearTimeout(delayed);
  }, [text]);

  useEffect(() => {
    filterSearchProducts({ price: price });
  }, [ok]);

  // Price filter
  function handleSlider(value) {
    dispatch({
      type: "SEARCH_QUERY",
      payload: {
        text: "",
      },
    });
    setStar("");
    setCategoryIds([]);
    setPrice(value);
    setSub("");
    setBrand("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  }

  // Category filter
  function handleCheck(e) {
    dispatch({
      type: "SEARCH_QUERY",
      payload: {
        text: "",
      },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    let stateValue = [...categoryIds];
    let checkedValue = e.target.value;
    let updateStateValue = stateValue.indexOf(checkedValue);

    if (updateStateValue === -1) {
      stateValue.push(checkedValue);
    } else {
      stateValue.splice(updateStateValue, 1);
    }

    setCategoryIds(stateValue);
    setShipping("");
    filterSearchProducts({ category: stateValue });
  }

  // Rating filter
  function handleStarClick(nums) {
    dispatch({
      type: "SEARCH_QUERY",
      payload: {
        text: "",
      },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar(nums);
    setSub("");
    setShipping("");
    filterSearchProducts({ stars: nums });
  }

  // Subcategory filter
  function handleSubcategoryClick(sub) {
    setSub(sub);

    dispatch({
      type: "SEARCH_QUERY",
      payload: {
        text: "",
      },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setShipping("");
    filterSearchProducts({ subcategory: sub });
  }

  // Brand filter
  function handleBrand(e) {
    dispatch({
      type: "SEARCH_QUERY",
      payload: {
        text: "",
      },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setShipping("");
    setBrand(e.target.value);
    setColor("");
    filterSearchProducts({ brand: e.target.value });
  }

  // Color filter
  function handleColor(e) {
    dispatch({
      type: "SEARCH_QUERY",
      payload: {
        text: "",
      },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    setShipping("");
    filterSearchProducts({ color: e.target.value });
  }

  // Shipping filter
  function handleShippingChange(e) {
    dispatch({
      type: "SEARCH_QUERY",
      payload: {
        text: "",
      },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    filterSearchProducts({ shipping: e.target.value });
  }

  return (
    <div className="container mx-auto px-8 py-4 grid grid-cols-4 gap-20">
      <aside className="">
        <h3 className="text-base font-semibold mb-4 flex items-center">
          <HiOutlineAdjustments />{" "}
          <span className="ml-2 inline-block">Filter</span>
        </h3>

        <div className="border border-gray-100 mb-4 bg-white shadow-md p-4 rounded-xl">
          <p className="font-semibold mb-2">Price:</p>
          <Slider
            tipFormatter={(v) => `$${v}`}
            range
            value={price}
            onChange={handleSlider}
            max="4999"
          />
        </div>

        <div className="border border-gray-100 mb-4 bg-white shadow-md p-4 rounded-xl">
          <p className="font-semibold mb-2">Category:</p>

          {categories.map((category) => (
            <div key={category._id}>
              <Checkbox
                value={category._id}
                name="category"
                onChange={handleCheck}
                checked={categoryIds.includes(category._id)}
              >
                {category.name}
              </Checkbox>
            </div>
          ))}
        </div>

        <div className="border border-gray-100 mb-4 bg-white shadow-md p-4 rounded-xl">
          <p className="font-semibold mb-2">Rating:</p>

          <Star numberOfStars={5} starClick={handleStarClick} />
          <Star numberOfStars={4} starClick={handleStarClick} />
          <Star numberOfStars={3} starClick={handleStarClick} />
          <Star numberOfStars={2} starClick={handleStarClick} />
          <Star numberOfStars={1} starClick={handleStarClick} />
        </div>

        <div className="border border-gray-100 mb-4 bg-white shadow-md p-4 rounded-xl">
          <p className="font-semibold mb-2">Subcategory:</p>

          <ul className="flex gap-2 flex-wrap">
            {subcategories.map((sub) => (
              <li
                className="border border-gray-200 px-2 py-1 text-xs cursor-pointer rounded-xl"
                key={sub._id}
                onClick={() => handleSubcategoryClick(sub)}
              >
                {sub.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-gray-100 mb-4 bg-white shadow-md p-4 rounded-xl">
          <p className="font-semibold mb-2">Brand:</p>

          {brands.map((b) => (
            <div key={b}>
              <Radio
                value={b}
                name={b}
                checked={b === brand}
                onChange={handleBrand}
              >
                {b}
              </Radio>
            </div>
          ))}
        </div>

        <div className="border border-gray-100 mb-4 bg-white shadow-md p-4 rounded-xl">
          <p className="font-semibold mb-2">Color:</p>

          {colors.map((c) => (
            <div key={c}>
              <Radio
                value={c}
                name={c}
                checked={c === color}
                onChange={handleColor}
              >
                {c}
              </Radio>
            </div>
          ))}
        </div>

        <div className="border border-gray-100 mb-4 bg-white shadow-md p-4 rounded-xl">
          <p className="font-semibold mb-2">Shipping:</p>
          <Checkbox
            value="Yes"
            checked={shipping === "Yes"}
            onChange={handleShippingChange}
          >
            Yes
          </Checkbox>

          <Checkbox
            value="No"
            checked={shipping === "No"}
            onChange={handleShippingChange}
          >
            No
          </Checkbox>
        </div>
      </aside>
      <div className="col-span-3">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2 className="text-base font-semibold mb-4">Products</h2>
          </div>
        )}

        {products.length < 1 && (
          <h2 className="text-base font-semibold mb-4">
            Sorry, no product found!
          </h2>
        )}

        <div className="grid grid-cols-2 gap-10">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              loading={loading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
