import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryForm from "../../../components/forms/CategoryForm";
import { getCategory, updateCategory } from "../../../utils/category";

function CategoryUpdate({ history, match }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategory();
  }, []);

  const { slug } = match.params;

  async function loadCategory() {
    try {
      const res = await getCategory(slug);
      console.log(res);
      setName(res.data.name);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateCategory(slug, { name }, user.token);
      setLoading(false);
      toast.success("Category updated.");
      setName("");
      history.push("/admin/category");
      loadCategory();
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toast.error(
          "Failed to update category.",
          error.response.status === 400
        );
      }

      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-8 py-4 max-w-md">
      <h2 className="text-base font-semibold mb-4">Update category</h2>
      <CategoryForm name={name} setName={setName} handleSubmit={handleSubmit} />
      <Link to="/admin/category" className="mt-4 block font-semibold">
        Cancel
      </Link>

      {loading && <p>Updating...</p>}
    </div>
  );
}

export default CategoryUpdate;
