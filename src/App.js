import { Route, Router, Routes } from "react-router-dom";
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
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";
import { Logout } from "./pages/Logout";
import NotFound from "./pages/NotFound";

const stripePromise = loadStripe("pk_test_51RRapmRxYukTAlpeFv3yZWY3E7x9vZDDYxv0KbOqfgXLYS9lto4AAzeDNpqkZyel3bSW5t25gPiQsez574r0pIFN00TpnC9KHT");
const appearance = { theme: 'flat', variables: { colorPrimary: '#0a1724' } };


function App() {
  const [clientSecret, setClientSecret] = useState({});

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await axios.post("http://192.168.1.5:4242/create-payment-intent", {
          amount: 1999,
          currency: "usd",
        });
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.error("Failed to create payment intent:", error);
        alert("Network error. Please try again later.");
      }
    };

    createPaymentIntent();
  }, []);


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
          <Route path="/shop/:productId" element={<ProductDetail />} />
          <Route path="/bar" element={<BarCorner />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={
            <Elements stripe={stripePromise} options={{ appearance, clientSecret }} >
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            </Elements>
          } />
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
