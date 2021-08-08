import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../firebase";
import { createOrUpdateUser } from "../../utils/auth";

function Login({ history }) {
  const [email, setEmail] = useState("ebnsina.me@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  useEffect(() => {
    const intended = history.location.state;
    if (intended) {
      return;
    }
    // else {
    //   if (user && user.token) history.push("/");
    // }
  }, [user, history]);

  function rolebasedRedirect(res) {
    const intended = history.location.state;
    if (intended && intended.from) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await auth.signInWithEmailAndPassword(email, password);
      const { user } = data;
      const idTokenResult = await user.getIdTokenResult();

      const res = await createOrUpdateUser(idTokenResult.token);

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          token: idTokenResult.token,
        },
      });

      rolebasedRedirect(res);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  }

  async function googleLogin() {
    try {
      const data = await auth.signInWithPopup(googleAuthProvider);

      const { user } = data;
      const idTokenResult = await user.getIdTokenResult();

      const res = await createOrUpdateUser(idTokenResult.token);

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          token: idTokenResult.token,
        },
      });

      rolebasedRedirect(res);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-4">
      <h2 className="text-base font-semibold mb-4 text-center">
        Login to your account.
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-3">
          <button
            className="bg-black text-white px-6 py-2 rounded-lg w-full"
            type="submit"
            disabled={!email || password < 6}
          >
            {loading ? "Login..." : "Login with Email"}
          </button>
        </div>
        <div>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full"
            type="button"
            onClick={googleLogin}
          >
            Login with Google
          </button>
        </div>
      </form>

      <p className="my-4">
        <Link to="/forgot-password">Forgot password</Link>
      </p>

      <p>
        Don't have an account ? <Link to="/register">Register!</Link>
      </p>
    </div>
  );
}

export default Login;
