import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";

export default function CheckoutPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
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
          <CheckoutForm />
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
