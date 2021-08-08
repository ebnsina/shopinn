import { useState } from "react";
import { toast } from "react-toastify";
import UserNav from "../../components/layouts/UserNav";
import { auth } from "../../firebase";

function UserPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await auth.currentUser.updatePassword(password);
      toast.success("Password update.");
      setLoading(false);
      setPassword("");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <section className="">
      <div className="container mx-auto px-8 py-4 flex">
        <aside className="w-1/5">
          <UserNav />
        </aside>
        <div className="w-3/5">
          <h3 className="text-base font-semibold mb-4">Update your Password</h3>

          <div className="max-w-xs">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-500 mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <button
                  className="bg-black text-white px-6 py-2 rounded-lg w-full"
                  type="submit"
                  disabled={!password || loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserPassword;
