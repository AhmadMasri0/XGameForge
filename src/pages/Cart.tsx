import {
    Box,
    Typography,
    Grid,
    Paper,
    Button,
} from "@mui/material";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import CartSummary from "../components/cart/CartSummary";
import CartList from "../components/cart/CartList";

const Cart = () => {
    const { cartItems } = useCart();

    return (
        <Box sx={{ 
            px: { xs: 2, md: 4 }, 
            py: { xs: 4, md: 6 }, 
            maxWidth: "1200px", 
            mx: "auto", 
            justifyContent: 'center' 
        }}>
            <Typography variant="h4" fontWeight={700} gutterBottom textAlign={'center'}>
                Your Shopping Cart
            </Typography>
            {cartItems?.length === 0 ? (
                <Paper sx={{ mt: 4, p: 4, textAlign: "center" }}>
                    <Typography variant="h6" gutterBottom>
                        Your cart is currently empty.
                    </Typography>
                    <Button 
                        component={Link} 
                        to="/shop" 
                        variant="contained" 
                        color="primary"
                    >
                        Browse Shop
                    </Button>
                </Paper>
            ) : (
                <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                    <CartList />
                    <CartSummary />
                </Grid>
            )}
        </Box>
    );
};

export default Cart;