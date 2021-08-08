import React, { useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { auth } from "./firebase";
import { currentUser } from "./utils/auth";

const Header = React.lazy(() => import("./components/layouts/Header"));
const UserRoute = React.lazy(() => import("./components/routes/UserRoute"));
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const ForgotPassword = React.lazy(() => import("./pages/auth/ForgotPassword"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const RegisterComplete = React.lazy(() =>
  import("./pages/auth/RegisterComplete")
);
const Home = React.lazy(() => import("./pages/Home"));
const UserHistory = React.lazy(() => import("./pages/user/History"));
const UserPassword = React.lazy(() => import("./pages/user/Password"));
const UserWishlist = React.lazy(() => import("./pages/user/Wishlist"));
const CategoryCreate = React.lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = React.lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const SubcategoryCreate = React.lazy(() =>
  import("./pages/admin/subcategory/SubcategoryCreate")
);
const SubcategoryUpdate = React.lazy(() =>
  import("./pages/admin/subcategory/SubcategoryUpdate")
);
const ProductCreate = React.lazy(() =>
  import("./pages/admin/product/ProductCreate")
);
const AdminPassword = React.lazy(() =>
  import("./pages/admin/password/Password")
);
const AdminCoupon = React.lazy(() => import("./pages/admin/coupon/Coupon"));
const AdminProducts = React.lazy(() =>
  import("./pages/admin/products/Products")
);
const ProductUpdate = React.lazy(() =>
  import("./pages/admin/product/ProductUpdate")
);
const Product = React.lazy(() => import("./pages/Product"));
const Category = React.lazy(() => import("./pages/Category"));
const Subcategory = React.lazy(() => import("./pages/Subcategory"));
const Shop = React.lazy(() => import("./pages/Shop"));
const Footer = React.lazy(() => import("./components/layouts/Footer"));
const Cart = React.lazy(() => import("./pages/Cart"));
const SideDrawer = React.lazy(() => import("./components/drawer/SideDrawer"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const Payment = React.lazy(() => import("./pages/Payment"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        const res = await currentUser(idTokenResult.token);

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
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      }
    >
      <ToastContainer />
      <SideDrawer />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register-complete" component={RegisterComplete} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={UserHistory} />
        <UserRoute exact path="/user/password" component={UserPassword} />
        <UserRoute exact path="/user/wishlist" component={UserWishlist} />
        <UserRoute exact path="/admin/dashboard" component={Dashboard} />
        <UserRoute exact path="/admin/password" component={AdminPassword} />
        <UserRoute exact path="/admin/products" component={AdminProducts} />
        <UserRoute exact path="/admin/coupon" component={AdminCoupon} />
        <UserRoute exact path="/admin/category" component={CategoryCreate} />
        <UserRoute path="/admin/category/:slug" component={CategoryUpdate} />
        <UserRoute
          exact
          path="/admin/subcategory"
          component={SubcategoryCreate}
        />
        <UserRoute
          path="/admin/subcategory/:slug"
          component={SubcategoryUpdate}
        />
        <UserRoute exact path="/admin/product" component={ProductCreate} />
        <UserRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <Route path="/product/:slug" component={Product} />
        <Route path="/category/:slug" component={Category} />
        <Route path="/subcategory/:slug" component={Subcategory} />
      </Switch>
      <Footer />
    </Suspense>
  );
}

export default App;
