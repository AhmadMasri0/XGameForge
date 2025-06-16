import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useCart } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import { CartItem } from "../../types/types";

const CartSummary = () => {
    const { cartItems, clearCart } = useCart();

    const subtotal = cartItems.reduce((acc: number, item: CartItem) => {
        const price = typeof item.product.price === 'string' ? parseFloat(item.product.price) : item.product.price;
        const quantity = typeof item.quantity === 'string' ? parseInt(item.quantity) : item.quantity;
        return acc + (price * quantity);
    }, 0);

    const tax = parseFloat((subtotal * 0.1).toFixed(2));
    const total = subtotal + tax;

    return (
        <Grid>
            <Paper sx={{ p: 3, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Order Summary
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography>Subtotal</Typography>
                    <Typography>${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography>Tax (10%)</Typography>
                    <Typography>${tax.toFixed(2)}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6">${total.toFixed(2)}</Typography>
                </Box>
                <Button
                    variant="contained"
                    component={Link}
                    to="/checkout"
                    fullWidth
                    startIcon={<ShoppingCartCheckoutIcon />}
                    sx={{ mb: 1 }}
                >
                    Proceed to Checkout
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    onClick={clearCart}
                >
                    Clear Cart
                </Button>
            </Paper>
        </Grid>
    );
};

export default CartSummary;