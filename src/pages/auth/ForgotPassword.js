import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

function ForgotPassword({ history }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await auth.sendPasswordResetEmail(email, {
        url: process.env.REACT_APP_FORGOT_PASSWORD_URL,
        handleCodeInApp: true,
      });

      setEmail("");
      toast.success("Check your email rest your password.");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-4">
      <h2 className="text-base font-semibold mb-4 text-center">
        Enter your email address to reset your password
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
            autoFocus
            // disabled={!email}
          />
        </div>
        <div>
          <button
            className="bg-black text-white px-6 py-2 rounded-lg w-full"
            type="submit"
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
