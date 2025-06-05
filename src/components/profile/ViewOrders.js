import {
    Accordion, AccordionSummary, AccordionDetails,
    Typography, Chip, Divider, Box, Stack, Grid, Button,
    Container
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import api, { API_URL } from "../../api/axios";

const ViewOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const res = await api.get("/api/orders");
            setOrders(res.data || []);
        } catch (err) {
            console.error("Error fetching orders", err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCancel = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;

        try {
            await api.put(`/api/orders/cancelOrder/${orderId}`);
            fetchOrders();
        } catch (err) {
            console.error("Failed to cancel order:", err);
            alert("Could not cancel order.");
        }
    };

    if (orders.length === 0) {
        return <Typography variant="h5" mt={4} textAlign="center">
            No orders found
        </Typography>
    }

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Your Order History
            </Typography>

            <Stack spacing={2}>
                {orders.map((order) => (
                    <Accordion key={order._id}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item xs={8}>
                                    <Typography variant="subtitle1">
                                        Order on {new Date(order.createdAt).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2">
                                        Total: ${order.totalAmount?.toFixed(2)}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Chip sx={{ ml: 1 }} label={order.status} color={
                                        order.status === "paid" ? "success" :
                                            order.status === "cancelled" ? "default" :
                                                "info"
                                    } size="small" />
                                    <Chip sx={{ ml: 1 }} label={order.isDelivered ? "Delivered" : "Not delivered yet"} color={
                                        order.isDelivered ? "success" : "warning"
                                    } size="small" />
                                </Grid>
                            </Grid>
                        </AccordionSummary>

                        <AccordionDetails>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2">Customer Info:</Typography>
                                <Typography>Name: {order.orderDetail.fullName}</Typography>
                                <Typography>Email: {order.orderDetail.email}</Typography>
                                <Typography>Phone: {order.orderDetail.phone}</Typography>
                                <Typography>
                                    Address: {order.orderDetail.address}, {order.orderDetail.city}, {order.orderDetail.zip}
                                </Typography>
                                {order.orderDetail.notes && <Typography>Notes: {order.orderDetail.notes}</Typography>}
                            </Box>

                            <Divider sx={{ my: 1 }} />

                            <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                    Items:
                                </Typography>
                                <Stack spacing={1}>
                                    {order.items.map((item, idx) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} key={idx}>
                                            <img
                                                src={`${item?.product?.images[0]?.url}`}
                                                alt={item.product.name}
                                                style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 4 }}
                                            />
                                            <Typography variant="body2">{item.product?.name} × {item.quantity} — ${item.product?.price}</Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>

                            {!order.isDelivered && order.status !== "cancelled" && (
                                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        sx={{ mt: 2 }}
                                        onClick={() => handleCancel(order._id)}
                                    >
                                        Cancel Order
                                    </Button>
                                </Container>
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Stack>
        </Box>
    );
};

export default ViewOrders;
