import {
    Grid, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Box,
} from "@mui/material";
import { useCart } from "../../contexts/CartContext";
import { CartItem } from "../../types/types";

interface CalculationItem {
    title: string;
    value: number;
}

const OrderSummery = () => {
    const { cartItems } = useCart();
    const subtotal = cartItems.reduce((sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 5.0 : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + tax + shipping;

    const fmt = (num: number): string => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(num);

    const calculations: CalculationItem[] = [
        { title: 'Subtotal', value: subtotal },
        { title: 'Shipping', value: shipping },
        { title: 'Tax (10%)', value: tax },
        { title: 'Total', value: total }
    ];

    return (
        <Grid>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Order Summary</Typography>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell align="right">Qty</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((item: CartItem, i: number) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <img
                                                src={`${item.product.images[0].url}`}
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
                            {calculations.map((item: CalculationItem, index: number) => (
                                <TableRow key={index}>
                                    <TableCell colSpan={2}><strong>{item.title}</strong></TableCell>
                                    <TableCell align="right"><strong>{fmt(item.value)}</strong></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    );
};

export default OrderSummery;