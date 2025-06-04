import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Typography,
  Paper,
  Button
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51RRapmRxYukTAlpeFv3yZWY3E7x9vZDDYxv0KbOqfgXLYS9lto4AAzeDNpqkZyel3bSW5t25gPiQsez574r0pIFN00TpnC9KHT");
const appearance = { theme: 'flat', variables: { colorPrimary: '#0a1724' } };

export default function CheckoutPage() {


  const [clientSecret, setClientSecret] = useState(null);
  const { cartItems } = useCart();

  useEffect(() => {
    if (cartItems.length > 0) {
      const createPaymentIntent = async () => {
        try {
          const res = await api.post("/api/stripe/create-payment-intent", {
            cartItems
          });
          setClientSecret(res.data.clientSecret);
        } catch (error) {
          console.error("Failed to create payment intent:", error);
          alert("Network error. Please try again later.");
        }
      };
      createPaymentIntent();
    }

  }, [cartItems]);

  return <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
    {cartItems?.length === 0 ? (
      <Paper sx={{ mt: 4, p: 4, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Your cart is currently empty.
        </Typography>
        <Button component={Link} to="/shop" variant="contained" color="primary">
          Browse Shop
        </Button>
      </Paper>
    ) : <>
      <Typography variant="h4" gutterBottom>Checkout</Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Order Summary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OrderSummary />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Shipping & Payment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {clientSecret && <Elements stripe={stripePromise} options={{ appearance, clientSecret }} >

            <CheckoutForm />
          </Elements>}
        </AccordionDetails>
      </Accordion>
    </>
    }
  </Container>
};

