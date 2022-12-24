import "./App.css";
import Home from "./components/Home/Home";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/Product/ProductDetails";
import LoginSignup from "./components/Authentication/LoginSignup";
import UserData from "./more/UserData";
import { useSelector } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./route/ProtectedRoute";
import UpdatePassword from "./components/user/UpdatePassword";
import EditProfile from "./components/user/EditProfile";
import About from "./components/about/About";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import Support from "./more/Support";
import Cart from "./components/cart/Cart";
import Favourites from "./components/cart/Favourites";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Payment from "./components/cart/Payment";
import Success from "./components/cart/Success";
import MoreOption from "./components/user/MoreOption";
import MyOrder from "./components/user/MyOrder";
import MyOrderDetails from "./components/user/MyOrderDetails";
import CommingSoon from "./more/CommingSoon";
import Rules from "./more/Rules";
import Contact from "./more/Contact";
import Notfound from "./more/Notfound";

import Dashboard from './components/Admin/Dashboard';
import CreateProduct from './components/Admin/CreateProduct';
import AllProducts from './components/Admin/AllProducts';
import EditProduct from './components/Admin/EditProduct';
import AllOrder from './components/Admin/AllOrder';
import UpdateOrder from './components/Admin/UpdateOrder';
import AllUsers from './components/Admin/AllUsers';
import UpdateUser from './components/Admin/UpdateUser';
import AllReviews from './components/Admin/AllReviews';
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v2/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      {isAuthenticated && <UserData user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/favourites" element={<Favourites />} />
        <Route exact path="/support" element={<Support />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/login" element={<LoginSignup />} />
        <Route exact path="/creator" element={<CommingSoon />} />
        <Route exact path="/faq" element={<Rules />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/more" element={<MoreOption />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />

        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        {stripeApiKey && (
          <Route
          path="/process/payment"
          element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute>
              <Payment />
              </ProtectedRoute>
            </Elements>
          }
          />
        )}
        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <MyOrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          exact path="/me/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          exact path="/me/update/info"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          exact path="dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          exact path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true}>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          exact path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <AllProducts />
            </ProtectedRoute>
          }
        />
        <Route
          exact path="/edit/product/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          exact path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <AllOrder />
            </ProtectedRoute>
          }
        />
        <Route
          exact path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateOrder />
            </ProtectedRoute>
          }
        />
        <Route
          exact path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <AllUsers />
            </ProtectedRoute>
          }
        />
        <Route
          exact path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          exact path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <AllReviews />
            </ProtectedRoute>
          }
        />

        <Route element={
          window.location.pathname === "/process/payment" ? null : <Notfound />
          } />
      </Routes>
    </Router>
  );
}

export default App;
