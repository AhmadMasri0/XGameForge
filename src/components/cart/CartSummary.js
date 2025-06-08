import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useCart } from "../../contexts/CartContext";
import { Link } from "react-router-dom";

const CartSummary = () => {

    const { cartItems, clearCart } = useCart();

    const subtotal = cartItems.reduce((acc, item) => acc + +item?.product?.price * +item?.quantity, 0);
    const tax = +(subtotal * 0.1).toFixed(2);
    const total = subtotal + tax;

    return <Grid item xs={12} md={4}>
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
                to='/checkout'
                fullWidth
                startIcon={<ShoppingCartCheckoutIcon />}
                sx={{ mb: 1 }}
            >
                Proceed to Checkout
            </Button>
            <Button variant="outlined" color="error" fullWidth onClick={clearCart}>
                Clear Cart
            </Button>
        </Paper>
    </Grid>;
}

export default CartSummary;