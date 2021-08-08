import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubcategories } from "../../utils/subcategory";

function SubcategoryList() {
  const [subcategorylist, setSubcategorylist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSubcategoryList();
  }, []);

  async function getSubcategoryList() {
    setLoading(true);
    const res = await getSubcategories();
    setSubcategorylist(res.data);
    setLoading(false);
  }

  return (
    <div>
      <h3 className="text-2xl text-center font-semibold my-4 py-10">
        Subcategories
      </h3>

      <ul className="flex justify-center items-center space-x-8">
        {subcategorylist.map((subcategory, index) => (
          <li key={index}>
            <Link
              className="bg-gray-800 text-white px-4 py-2 rounded-lg text-xs"
              to={`/subcategory/${subcategory.slug}`}
            >
              {subcategory.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubcategoryList;
