function DataTable() {
  return (
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
                  {values.categories
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
                            // onClick={() => handleRemove(category.slug)}
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
  );
}

export default DataTable;
