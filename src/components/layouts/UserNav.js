import { Link, useLocation } from "react-router-dom";

function UserNav() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="mr-24">
      <ul className="space-y-3 font-semibold">
        <li>
          <Link
            className={`text-gray-700 transition hover:bg-gray-100 px-4 py-2 block rounded-lg ${
              path === "/user/history" ? "bg-gray-100" : ""
            }`}
            to="/user/history"
          >
            History
          </Link>
        </li>
        <li>
          <Link
            className={`text-gray-700 transition hover:bg-gray-100 px-4 py-2 block rounded-lg ${
              path === "/user/password" ? "bg-gray-100" : ""
            }`}
            to="/user/password"
          >
            Password
          </Link>
        </li>
        <li>
          <Link
            className={`text-gray-700 transition hover:bg-gray-100 px-4 py-2 block rounded-lg ${
              path === "/user/wishlist" ? "bg-gray-100" : ""
            }`}
            to="/user/wishlist"
          >
            Wishlist
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default UserNav;
