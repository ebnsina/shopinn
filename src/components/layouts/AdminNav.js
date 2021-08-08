import { Link, useLocation } from "react-router-dom";

function AdminNav() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="mr-24">
      <ul className="space-y-3 font-semibold">
        <li>
          <Link
            className={`text-gray-700 transition hover:bg-gray-100 px-4 py-2 block rounded-lg ${
              path === "/admin/dashboard" ? "bg-gray-100" : ""
            }`}
            to="/admin/dashboard"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            className={`text-gray-700 transition hover:bg-gray-100 px-4 py-2 block rounded-lg ${
              path === "/admin/products" ? "bg-gray-100" : ""
            }`}
            to="/admin/products"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            className={`text-gray-700 transition hover:bg-gray-100 px-4 py-2 block rounded-lg ${
              path === "/admin/product" ? "bg-gray-100" : ""
            }`}
            to="/admin/product"
          >
            Product
          </Link>
        </li>
        <li>
          <Link
            className={`text-gray-700 transition hover:bg-gray-100 px-4 py-2 block rounded-lg ${
              path === "/admin/category" ? "bg-gray-100" : ""
            }`}
            to="/admin/category"
          >
            Category
          </Link>
        </li>
        <li>
          <Link
            className={`text-gray-700 transition hover:bg-gray-100 px-4 py-2 block rounded-lg ${
              path === "/admin/subcategory" ? "bg-gray-100" : ""
            }`}
            to="/admin/subcategory"
          >
            Sub Category
          </Link>
        </li>
        <li>
          <Link
            className={`text-gray-700 transition hover:bg-gray-100 px-4 py-2 block rounded-lg ${
              path === "/admin/coupon" ? "bg-gray-100" : ""
            }`}
            to="/admin/coupon"
          >
            Coupon
          </Link>
        </li>
        <li>
          <Link
            className={`text-gray-700 transition hover:bg-gray-100 px-4 py-2 block rounded-lg ${
              path === "/admin/password" ? "bg-gray-100" : ""
            }`}
            to="/admin/password"
          >
            Password
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNav;
