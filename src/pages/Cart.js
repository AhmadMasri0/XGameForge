import React from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    IconButton,
    Button,
    Divider,
    TextField,
    Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { API_URL } from "../api/axios";


const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

    const subtotal = cartItems.reduce((acc, item) => acc + +item?.product?.price * +item?.quantity, 0);
    const tax = +(subtotal * 0.1).toFixed(2);
    const total = subtotal + tax;
    return (
        <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 }, maxWidth: "1200px", mx: "auto", justifyContent: 'center' }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                Your Cart
            </Typography>

            {cartItems?.length === 0 ? (
                <Paper sx={{ mt: 4, p: 4, textAlign: "center" }}>
                    <Typography variant="h6" gutterBottom>
                        Your cart is currently empty.
                    </Typography>
                    <Button component={Link} to="/shop" variant="contained" color="primary">
                        Browse Shop
                    </Button>
                </Paper>
            ) : (
                <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                    <Grid item xs={12} md={8}>
                        {cartItems?.map((item) => (
                            <Paper
                                key={item?.product?._id}
                                sx={{
                                    mb: 2,
                                    p: 2,
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <img
                                        src={`${API_URL}${item?.product?.images && item?.product?.images[0].url}`}
                                        alt={item?.product?.name}
                                        style={{
                                            width: 80,
                                            height: 80,
                                            objectFit: "contain",
                                            borderRadius: 8,
                                        }}
                                    />
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            {item?.product?.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item?.product?.platform} | ${item?.product?.price}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <IconButton
                                        onClick={() =>
                                            updateQuantity(item?.product?._id, Math.max(1, item.quantity - 1))
                                        }
                                        disabled={item.quantity <= 1}
                                    >
                                        <RemoveIcon />
                                    </IconButton>

                                    <TextField
                                        type="number"
                                        size="small"
                                        value={item.quantity}
                                        onChange={(e) => {
                                            const value = Math.max(
                                                1,
                                                Math.min(3, parseInt(e.target.value))
                                            );
                                            updateQuantity(item?.product?._id, value);
                                        }}
                                        inputProps={{
                                            min: 1,
                                            max: 3,
                                            style: { textAlign: "center" },
                                        }}
                                        sx={{ width: 60 }}
                                    />

                                    <IconButton
                                        onClick={() =>
                                            updateQuantity(item?.product?._id, Math.min(3, item.quantity + 1))
                                        }
                                        disabled={item.quantity >= 3}
                                    >
                                        <AddIcon />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() => removeFromCart(item?.product?._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            </Paper>
                        ))}
                    </Grid>

                    <Grid item xs={12} md={4}>
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
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default Cart;
