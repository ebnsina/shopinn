function LocalSearch({ keyword, setKeyword, placeholder }) {
  function handleSearchChange(e) {
    setKeyword(e.target.value.toLowerCase());
  }

  return (
    <div>
      <input
        className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-500"
        type="search"
        name={keyword}
        onChange={handleSearchChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default LocalSearch;
