import {
    Grid, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Box,
} from "@mui/material";
import { useCart } from "../../contexts/CartContext";
import { API_URL } from "../../api/axios";

const OrderSummery = () => {
    const { cartItems } = useCart();
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 5.0 : 0;
    const tax = (subtotal) * 0.1;
    const total = subtotal + tax + shipping;

    const fmt = (num) => new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
    }).format(num);

    const calculations = [{ title: 'Subtotal', value: subtotal }, { title: 'Shipping', value: shipping }
        , { title: 'Tax (10%)', value: tax }, { title: 'Total', value: total }
    ];
    return (
        <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Order Summary</Typography>
                <TableContainer >
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell align="right">Qty</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <img
                                                src={`${API_URL}${item.product.images[0].url}`}
                                                alt={item.product.name}
                                                style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 4 }}
                                            />
                                            <Typography variant="body2">{item.product.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">{item.quantity}</TableCell>
                                    <TableCell align="right">
                                        {fmt(item.product.price * item.quantity)}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {
                                calculations.map((item) => {
                                    return <TableRow>
                                        <TableCell colSpan={2}><strong>{item.title}</strong></TableCell>
                                        <TableCell align="right"><strong>{fmt(item.value)}</strong></TableCell>
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    );
};

export default OrderSummery;

