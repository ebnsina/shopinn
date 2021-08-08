import { Link, NavLink, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/forms/Search";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, cart } = useSelector((state) => ({ ...state }));

  function logout() {
    firebase.auth().signOut();

    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");
  }

  return (
    <header className="shadow-sm py-3 sticky top-0 z-10 bg-white text-white">
      <div className="container mx-auto px-8 flex justify-between items-center">
        <Link className="logo text-2xl font-bold tracking-wider" to="/">
          Shop Inn
        </Link>
        <nav>
          <ul className="flex justify-between items-center space-x-8">
            <Search />

            <li>
              <NavLink className="text-gray-800" to="/shop">
                Shop
              </NavLink>
            </li>

            <li>
              <NavLink className="relative flex" to="/cart">
                <BiShoppingBag className="text-gray-800" size="1.3rem" />
                <span className="bg-pink-400 w-5 h-5 rounded-full flex justify-center items-center text-sm text-white absolute -top-2 -right-5">
                  {cart.length}
                </span>
              </NavLink>
            </li>

            {user && user.role === "admin" && (
              <li>
                <NavLink to="/admin/dashboard">
                  <AiOutlineDashboard className="text-gray-800" size="1.3rem" />
                </NavLink>
              </li>
            )}

            {user && user.role === "subscriber" && (
              <li>
                <NavLink to="/user/history">
                  <AiOutlineDashboard className="text-gray-800" size="1.3rem" />
                </NavLink>
              </li>
            )}

            {!user && (
              <>
                <li>
                  <NavLink className="text-gray-800" to="/login">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-gray-800" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <li>
                <button
                  type="button"
                  className="text-gray-800"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
