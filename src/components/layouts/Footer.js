import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="py-20 border-t border-gray-100 shadow-sm">
      <div className="container mx-auto px-8 flex gap-10">
        <div className="w-2/5">
          <h2 className="text-xl font-semibold mb-4">About Shop Inn</h2>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint,
            explicabo consequatur ullam voluptas magnam quam optio! Numquam
            dolore debitis ab molestias illo assumenda ut facilis deleniti unde
            fugit autem non, aperiam eaque esse voluptates officia dolor ad
            cupiditate magnam. Eius, eum accusantium.
          </p>
        </div>
        <div className="w-3/5 grid grid-cols-3 gap-10">
          <div>
            <h2 className="text-base font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a
                  className="text-gray-700 transition hover:underline"
                  href="#/"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 transition hover:underline"
                  href="#/"
                >
                  Cart
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 transition hover:underline"
                  href="#/"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 transition hover:underline"
                  href="#/"
                >
                  Career
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-semibold mb-4">Newsletter</h2>
            <form>
              <input
                className="border border-gray-200 bg-white px-4 py-2 w-full rounded-xl focus:outline-none"
                type="email"
                name="newsletter"
                placeholder="You fancy email.."
              />
              <button
                className="bg-gray-900 text-white w-full px-4 py-2 rounded-xl mt-4"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div>
            <h2 className="text-base font-semibold mb-4">Get In Touch</h2>
            <ul className="flex space-x-4">
              <li>
                <a className="text-gray-700" href="#/">
                  <FaFacebook size="1.4rem" />
                </a>
              </li>
              <li>
                <a className="text-gray-700" href="#/">
                  <FaTwitter size="1.4rem" />
                </a>
              </li>
              <li>
                <a className="text-gray-700" href="#/">
                  <FaInstagram size="1.4rem" />
                </a>
              </li>
              <li>
                <a className="text-gray-700" href="#/">
                  <FaYoutube size="1.4rem" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
