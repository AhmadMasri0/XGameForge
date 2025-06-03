import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import VerifyEmail from "./pages/VerifyEmail";
import ScrollToTop from "./components/ScrollToTop";

const Booking = lazy(() => import('./pages/Booking'));
const Shop = lazy(() => import('./pages/Shop'));
const BarCorner = lazy(() => import('./pages/BarCorner'));
const ProductDetail = lazy(() => import('./components/shop/ProductDetail'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const ProtectedRoute = lazy(() => import('./components/routeGaurd/ProtectedRoute'));
const Logout = lazy(() => import('./pages/Logout'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminRoute = lazy(() => import('./components/routeGaurd/AdminRoute'));
const ProductForm = lazy(() => import('./components/shop/ProductForm'));
const BarItemForm = lazy(() => import('./pages/BarItemForm'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const Profile = lazy(() => import('./pages/Profile'));
const Home = lazy(() => import('./pages/Home'));
const Footer = lazy(() => import('./components/footer/Footer'));
const Header = lazy(() => import('./components/header/Header'));


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
        <Suspense fallback={<CircularProgress sx={{ margin: 'auto' }} />}>
          <ScrollToTop />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/menu" element={<BarCorner />} />
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
            <Route path="/verify-email/:token" element={<VerifyEmail />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
