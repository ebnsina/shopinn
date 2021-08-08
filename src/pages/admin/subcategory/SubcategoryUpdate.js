import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryForm from "../../../components/forms/CategoryForm";
import { getCategories } from "../../../utils/category";
import { getSubcategory, updateSubcategory } from "../../../utils/subcategory";

function SubcategoryUpdate({ history, match }) {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [parent, setParent] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadSubcategory();
  }, []);

  const { slug } = match.params;

  async function loadCategories() {
    const res = await getCategories();
    setCategories(res.data);
  }

  async function loadSubcategory() {
    const res = await getSubcategory(slug);
    setName(res.data.name);
    setParent(res.data.parent);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateSubcategory(slug, { name, parent }, user.token);
      setLoading(false);
      toast.success("Subcategory updated.");
      setName("");
      history.push("/admin/subcategory");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toast.error(
          "Failed to update subcategory.",
          error.response.status === 400
        );
      }

      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-8 py-4 max-w-md">
      <h2 className="text-base font-semibold mb-4">Update Subcategory</h2>
      <div>
        <select
          className="px-4 py-2 mb-4 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-500"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Please select a category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option
                value={category._id}
                key={category._id}
                selected={category._id === parent}
              >
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <CategoryForm
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <Link to="/admin/subcategory" className="mt-4 block font-semibold">
        Cancel
      </Link>
    </div>
  );
}

export default SubcategoryUpdate;
