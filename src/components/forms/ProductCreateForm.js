import { useState } from "react";

function ProductCreateForm({ handleChange, handleSubmit, values }) {
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

  return (
    <form onSubmit={handleSubmit}>
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
      <div className="mb-3">
        <select
          className="px-4 py-2 mb-4 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-300"
          name="brand"
          onChange={handleChange}
        >
          <option value="">Select brand</option>
          {values.brands.map((brand) => (
            <option value={brand}>{brand}</option>
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
            <option value={color}>{color}</option>
          ))}
        </select>
      </div>
      <div>
        <button
          className="bg-black text-white px-6 py-2 rounded-lg w-full"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default ProductCreateForm;
