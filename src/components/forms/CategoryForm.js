function CategoryForm({ name, setName, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          autoFocus
          required
        />
      </div>
      <div>
        <button
          className="bg-black text-white px-6 py-2 rounded-lg w-full"
          type="submit"
          disabled={!name}
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;
