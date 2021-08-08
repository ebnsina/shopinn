import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { createOrUpdateUser } from "../../utils/auth";

function RegisterComplete({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) toast.error("Email and Password is required.");
    if (password.length < 6)
      toast.error("Password should be at least 6 chars long.");

    try {
      const data = await auth.signInWithEmailLink(email, window.location.href);

      if (data.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        const user = auth.currentUser;
        await user.updatePassword(password);
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

        history.push("/login");
      }

      toast.success("Registration complete. Please login.");

      setEmail("");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-4">
      <h2 className="text-base font-semibold mb-4 text-center">
        Create a new account.
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-500"
            value={email}
            type="email"
            name="email"
            placeholder="Email Address"
            disabled
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
            autoFocus
          />
        </div>
        <div>
          <button
            className="bg-black text-white px-6 py-2 rounded-lg w-full"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterComplete;
