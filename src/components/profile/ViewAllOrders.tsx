import {
    Accordion, AccordionSummary, AccordionDetails, Typography, Button,
    Box, Chip, TextField, MenuItem, Select, Pagination,
    Container, useTheme, Stack, CircularProgress
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState, ChangeEvent } from "react";
import api from "../../api/axios";
import { Order } from "../../types/types";

const AllOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [status, setStatus] = useState<string>("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm.trim());
            setPage(1);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            let tmpQuery: Record<string, string | boolean> = {};
            if (status.includes('paid') || status.includes('cancelled')) {
                tmpQuery['status'] = status;
            } else if (status.includes('delivered')) {
                tmpQuery['isDelivered'] = status === 'delivered';
            }
            const query = new URLSearchParams({
                search: debouncedSearch,
                ...tmpQuery,
                page: page.toString()
            });

            const res = await api.get(`/api/orders/admin?${query}`);
            setOrders(res.data.orders);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.error("Failed to fetch orders", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkAsDelivered = async (orderId: string) => {
        try {
            await api.put(`/api/orders/updateOrderDelivery/${orderId}`);
            fetchOrders();
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const handleCancel = async (orderId: string) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;

        try {
            await api.put(`/api/orders/cancelOrder/${orderId}`);
            fetchOrders();
        } catch (err) {
            console.error("Failed to cancel order:", err);
            alert("Could not cancel order.");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [debouncedSearch, status, page]);

    return (
        <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
            <Typography variant="h4" mb={2}>All Orders</Typography>

            <TextField
                label="Search by Order ID or Email"
                fullWidth
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                sx={{ mb: 2 }}
            />

            <Select
                value={status}
                onChange={(e) => {
                    setStatus(e.target.value as string);
                    setPage(1);
                }}
                displayEmpty
                fullWidth
                sx={{ mb: 3 }}
            >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="unpaid">Unpaid</MenuItem>
                <MenuItem value="undelivered">Undelivered</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>

            {isLoading ? (
                <Stack alignItems="center" sx={{ mt: 6 }}>
                    <CircularProgress color="primary" />
                </Stack>
            ) : orders.length ? (
                orders.map(order => (
                    <Accordion key={order._id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{ border: theme.palette.mode === 'dark' ? 'solid gray 1px' : 'inherit' }}
                        >
                            <Typography sx={{ flexGrow: 1 }}>
                                #{order._id.slice(-6).toUpperCase()} - {order.user?.username} ({order.status})
                            </Typography>
                            <Chip
                                label={order.isDelivered ? 'Delivered' : 'Not delivered yet'}
                                color={order.isDelivered ? "success" : "warning"}
                            />
                        </AccordionSummary>
                        <AccordionDetails sx={{ border: theme.palette.mode === 'light' ? '' : 'solid gray 1px' }}>
                            <Typography><strong>Email:</strong> {order.orderDetail.email}</Typography>
                            <Typography><strong>Phone:</strong> {order.orderDetail.phone}</Typography>
                            <Typography><strong>Address:</strong> {order.address}, {order.orderDetail.city}, {order.orderDetail.zip}</Typography>
                            <Typography><strong>Notes:</strong> {order.orderDetail.notes || "None"}</Typography>
                            <Typography sx={{ mt: 1 }}><strong>Items:</strong></Typography>
                            {order.items.map(item => (
                                <Container key={item._id} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={item.product.images[0]?.url}
                                        alt={item.product.name}
                                        style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 4 }}
                                    />
                                    <Typography sx={{ ml: 2 }}>
                                        {item.product.name} - x{item.quantity}
                                    </Typography>
                                </Container>
                            ))}
                            <Container sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                {!order.isDelivered && order.status !== 'cancelled' && (
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => handleMarkAsDelivered(order._id)}
                                        sx={{ mt: 2 }}
                                    >
                                        Mark as Delivered
                                    </Button>
                                )}
                                {!order.isDelivered && order.status !== "cancelled" && (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        sx={{ mt: 2 }}
                                        onClick={() => handleCancel(order._id)}
                                    >
                                        Cancel Order
                                    </Button>
                                )}
                            </Container>
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Typography variant="h5" mt={4} textAlign="center">
                    No orders found
                </Typography>
            )}

            {totalPages > 1 && (
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_: unknown, value: number) => setPage(value)}
                        color="primary"
                    />
                </Box>
            )}
        </Box>
    );
};

export default AllOrders;