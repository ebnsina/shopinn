import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

function Register({ history }) {
  const [email, setEmail] = useState("ebnsina.me@gmail.com");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await auth.sendSignInLinkToEmail(email, {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true,
      });

      toast.success(
        `Email is sent to ${email}. Check you email to complete registration.`
      );

      window.localStorage.setItem("emailForRegistration", email);

      setEmail("");
    } catch (error) {
      toast.error(error);
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
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
        </div>
        <div className="mb-3">
          <button
            className="bg-black text-white px-6 py-2 rounded-lg w-full"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>

      <p>
        Already have an account? <Link to="/login">Login!</Link>
      </p>
    </div>
  );
}

export default Register;
