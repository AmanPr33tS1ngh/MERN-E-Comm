import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import ProductScreen from "./components/ProductScreen";
import Cart from "./components/Cart";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ShippingAddress from "./components/ShippingAddress";
import PaymentMethod from "./components/PaymentMethod";
import PlaceOrder from "./components/PlaceOrder";
import OrderScreen from "./components/OrderScreen";
import Profile from "./components/Profile";
import UpdateUser from "./components/UpdateUser";
import CartEdit from "./components/CartEdit";
import OrderHistory from "./components/OrderHistory";
import Admin from "./components/Admin";
import AllOrderDetails from "./components/AllOrderDetails";
import EditOrder from "./components/EditOrder";
import DeleteOrder from "./components/DeleteOrder";
import AddOrder from "./components/AddOrder";
import { useSelector } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <div>
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar />
        </header>
        <main>
          <div>
            <Routes>
              <Route path="/" element={<HomeScreen />} exact />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/shipping" element={<ShippingAddress />} />
              <Route path="/payment" element={<PaymentMethod />} />
              <Route path="/placeorder" element={<PlaceOrder />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/update-user" element={<UpdateUser />} />
              <Route path="/cart/edit/:id" element={<CartEdit />} />
              <Route path="/order-history/:id" element={<OrderHistory />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/:id" element={<AllOrderDetails />} />
              <Route path="/edit-order/:id" element={<EditOrder />} />
              <Route path="/delete-order" element={<DeleteOrder />} />
              <Route path="/add-order" element={<AddOrder />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
