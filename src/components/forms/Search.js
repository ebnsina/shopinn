import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { HiSearch } from "react-icons/hi";

function Search() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  async function handleSubmit(e) {
    e.preventDefault();
    history.push(`/shop?${text}`);
  }

  async function handleChange(e) {
    dispatch({
      type: "SEARCH_QUERY",
      payload: {
        text: e.target.value,
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} class="pt-2 relative mx-auto text-gray-600">
      <input
        value={text}
        onChange={handleChange}
        className="border border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
      />
      <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
        <HiSearch size="1.2rem" />
      </button>
    </form>
  );
}

export default Search;
