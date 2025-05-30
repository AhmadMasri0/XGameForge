import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Shop from "./pages/Shop";
import BarCorner from "./pages/BarCorner";
import ProductDetail from "./components/shop/ProductDetail";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./components/routeGaurd/ProtectedRoute";
import { Logout } from "./pages/Logout";
import NotFound from "./pages/NotFound";
import OnlyAdmin from "./pages/OnlyAdmin";
import AdminRoute from "./components/routeGaurd/AdminRoute";
import ProductForm from "./components/shop/ProductForm";
import BarItemForm from "./pages/BarItemForm";
import ThankYou from "./pages/ThankYou";
import Profile from "./pages/Profile";

function App() {

  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/bar" element={<BarCorner />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={
            <ProtectedRoute>
              <Signup />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
          } />
          <Route path="/logout" element={<Logout />}></Route>

          <Route path="/products/create" element={
            <AdminRoute>
              <ProductForm />
            </AdminRoute>
          } />
          <Route path="/products/edit/:id" element={
            <AdminRoute>
              <ProductForm />
            </AdminRoute>
          } />
          <Route path="/bar/create" element={
            <AdminRoute>
              <BarItemForm />
            </AdminRoute>
          } />
          <Route path="/bar/edit/:id" element={
            <AdminRoute>
              <BarItemForm />
            </AdminRoute>
          } />
          <Route path="/thank-you" element={<ThankYou />}></Route>
          <Route path="/profile" element={<Profile />}></Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
