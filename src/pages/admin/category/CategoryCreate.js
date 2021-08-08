import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategories,
  getCategories,
  removeCategory,
} from "../../../utils/category";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import AdminNav from "../../../components/layouts/AdminNav";

function CategoryCreate() {
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const res = await getCategories();
    setCategories(res.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createCategories({ name }, user.token);
      setLoading(false);
      toast.success("Category created.");
      setName("");
      loadCategories();
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toast.error(
          "Failed to create category.",
          error.response.status === 400
        );
      }

      setLoading(false);
    }
  }

  async function handleRemove(slug) {
    try {
      if (window.confirm("Are you sure to delete?")) {
        await removeCategory(slug, user.token);
        setLoading(false);
        toast.success("Category deleted.");
        loadCategories();
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
            Create a new category
          </h2>

          {loading && <p>Creating...</p>}

          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />
        </div>

        <div className="mt-6">
          <div className="flex justify-between">
            <h2 className="text-base font-semibold mb-4">Categories</h2>
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
                        {categories
                          .filter(searched(keyword))
                          .map((category) => (
                            <tr>
                              <td
                                class="px-6 py-4 whitespace-nowrap"
                                key={category._id}
                              >
                                {category.name}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap space-x-4">
                                <Link
                                  className="bg-blue-400 px-4 py-1 text-xs text-white rounded-lg"
                                  to={`/admin/category/${category.slug}`}
                                >
                                  Edit
                                </Link>
                                <button
                                  className="bg-red-400 px-4 py-1 text-xs text-white rounded-lg"
                                  onClick={() => handleRemove(category.slug)}
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

export default CategoryCreate;
