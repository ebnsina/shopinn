import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../utils/category";

function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategoryList();
  }, []);

  async function getCategoryList() {
    setLoading(true);
    const res = await getCategories();
    setCategoryList(res.data);
    setLoading(false);
  }

  return (
    <div>
      <h3 className="text-2xl text-center font-semibold my-4 py-10">
        Categories
      </h3>

      <div className="grid grid-cols-4 gap-10">
        {categoryList.map((category) => (
          <Link
            className="inline-block text-center bg-white shadow-sm text-2xl border border-blue-600 text-blue-500 px-20 py-10 transition hover:bg-blue-400 hover:text-white hover:border-blue-400 rounded-lg"
            key={category.slug}
            to={`/category/${category.slug}`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
