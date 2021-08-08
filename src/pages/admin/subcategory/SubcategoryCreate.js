import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../utils/category";
import {
  createSubcategories,
  getSubcategories,
  removeSubcategory,
} from "../../../utils/subcategory";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import AdminNav from "../../../components/layouts/AdminNav";

function SubcategoryCreate() {
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadSubcategories();
  }, []);

  async function loadCategories() {
    const res = await getCategories();
    setCategories(res.data);
  }

  async function loadSubcategories() {
    const res = await getSubcategories();
    setSubcategories(res.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createSubcategories({ name, parent: category }, user.token);
      setLoading(false);
      toast.success("Sub Category created.");
      setName("");
      loadSubcategories();
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toast.error(
          "Failed to create sub category.",
          error.response.status === 400
        );
      }

      setLoading(false);
    }
  }

  async function handleRemove(slug) {
    try {
      if (window.confirm("Are you sure to delete?")) {
        await removeSubcategory(slug, user.token);
        setLoading(false);
        toast.success("Category deleted.");
        loadSubcategories();
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
        <div className="max-w-sm">
          <h2 className="text-base font-semibold mb-4">
            Create a new Sub Category
          </h2>

          <div>
            <select
              className="px-4 py-2 mb-4 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-300"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Please select a category</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>

            <CategoryForm
              name={name}
              setName={setName}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between">
            <h2 className="text-base font-semibold mb-4">Sub Categories</h2>
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          </div>

          <div className="mt-4 space-y-4">
            <div class="flex flex-col">
              <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        {subcategories
                          .filter(searched(keyword))
                          .map((subcategory) => (
                            <tr key={subcategory._id}>
                              <td class="px-6 py-4 whitespace-nowrap">
                                {subcategory.name}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap space-x-4">
                                <Link
                                  className="bg-blue-400 px-4 py-1 text-xs text-white rounded-lg"
                                  to={`/admin/subcategory/${subcategory.slug}`}
                                >
                                  Edit
                                </Link>
                                <button
                                  className="bg-red-400 px-4 py-1 text-xs text-white rounded-lg"
                                  onClick={() => handleRemove(subcategory.slug)}
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
    </div>
  );
}

export default SubcategoryCreate;
