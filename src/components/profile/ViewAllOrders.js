import {
    Accordion, AccordionSummary, AccordionDetails,
    Typography, Button, Box, Chip
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import api from "../../api/axios";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const res = await api.get("/api/orders/admin");
            setOrders(res.data);
        } catch (err) {
            console.error("Failed to fetch orders", err);
        }
    };

    const handleMarkAsDelivered = async (orderId) => {
        try {
            await api.put(`/api/orders/updateOrderDelivery/${orderId}`);
            fetchOrders();
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
            <Typography variant="h4" mb={3}>All Orders</Typography>
            {orders.map(order => (
                <Accordion key={order._id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ flexGrow: 1 }}>
                            #{order._id.slice(-6).toUpperCase()} - {order.user?.name} ({order.status})
                        </Typography>
                        <Chip label={order.isDelivered ? 'Delivered' : 'Not delivered yet'} color={order.isDelivered ? "success" : "warning"} />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography><strong>Email:</strong> {order.orderDetail.email}</Typography>
                        <Typography><strong>Phone:</strong> {order.orderDetail.phone}</Typography>
                        <Typography><strong>Address:</strong> {order.address}, {order.orderDetail.city}, {order.orderDetail.zip}</Typography>
                        <Typography><strong>Notes:</strong> {order.orderDetail.notes || "None"}</Typography>
                        <Typography sx={{ mt: 1 }}><strong>Items:</strong></Typography>
                        {order.items.map(item => (
                            <Typography key={item._id} sx={{ ml: 2 }}>
                                {item.product.name} - x{item.quantity}
                            </Typography>
                        ))}
                        {!order.isDelivered && (
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => handleMarkAsDelivered(order._id)}
                                sx={{ mt: 2 }}
                            >
                                Mark as Delivered
                            </Button>
                        )}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default AllOrders;
