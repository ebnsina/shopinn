import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserNav from "../../components/layouts/UserNav";
import { getWishlist, removeWishlist } from "../../utils/user";

function UserWishlist() {
  const [wishlist, setWishlist] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getAllWishList();
  }, []);

  async function getAllWishList() {
    const res = await getWishlist(user.token);
    setWishlist(res.data.wishlist);
  }

  async function handleRemoveWishList(productId) {
    await removeWishlist(productId, user.token);
    getAllWishList();
  }

  return (
    <section className="">
      <div className="container mx-auto px-8 py-4 flex">
        <aside className="w-1/5">
          <UserNav />
        </aside>
        <div className="w-3/5">
          <h3 className="text-base font-semibold mb-4">Wishlist</h3>

          <div className="">
            <div>
              {wishlist.map((p, i) => (
                <div key={i} className="mb-4">
                  <Link to={`/product/${p.slug}`}>{p.name}</Link>

                  <button
                    className="border border-red-500 text-red-500 p-1 ml-4 text-xs"
                    type="button"
                    onClick={() => handleRemoveWishList(p._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserWishlist;
