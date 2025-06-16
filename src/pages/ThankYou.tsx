import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useCart } from '../contexts/CartContext';

const ThankYou = () => {
  const navigate = useNavigate();
  const {clearCart} = useCart();

  clearCart();

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box textAlign="center">
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
        <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
          Thank you for your order!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Your payment was successful. We’re preparing your order and will contact you shortly.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/shop')}
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
};

export default ThankYou;
