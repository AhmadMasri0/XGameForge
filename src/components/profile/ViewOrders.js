// import {
//     Box, Typography, Table, TableBody, TableCell,
//     TableContainer, TableHead, TableRow, Paper, Chip, CircularProgress
// } from '@mui/material';
// import { useEffect, useState } from 'react';
// import api from '../../api/axios';

// const ViewOrders = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const res = await api.get('/api/orders');
//                 setOrders(res.data   || []);
//             } catch (err) {
//                 console.error('Failed to load orders:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchOrders();
//     }, []);

//     const formatDate = (iso) => new Date(iso).toLocaleDateString();

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom>
//                 Order History
//             </Typography>
//             {loading ? (
//                 <CircularProgress />
//             ) : orders.length === 0 ? (
//                 <Typography>No orders found.</Typography>
//             ) : (
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//                             <TableRow>
//                                 <TableCell>#</TableCell>
//                                 <TableCell>Date</TableCell>
//                                 <TableCell>Items</TableCell>
//                                 <TableCell>Total</TableCell>
//                                 <TableCell>Status</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {orders.map((order, index) => (
//                                 <TableRow key={order._id}>
//                                     <TableCell>{index + 1}</TableCell>
//                                     <TableCell>{formatDate(order.createdAt)}</TableCell>
//                                     <TableCell>
//                                         {order.items.map((i) => (
//                                             <div key={i.product._id}>
//                                                 {i.product.name} × {i.quantity}
//                                             </div>
//                                         ))}
//                                     </TableCell>
//                                     <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
//                                     <TableCell>
//                                         <Chip
//                                             label={order.status}
//                                             color={order.status === 'paid' ? 'success' : 'warning'}
//                                             size="small"
//                                         />
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             )}
//         </Box>
//     );
// };

// export default ViewOrders;
// import {
//     Box, Typography, Paper, Grid, Divider, Chip, Stack
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// const ViewOrders = () => {
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const res = await api.get("/api/orders");
//                 setOrders(res.data || []);
//             } catch (err) {
//                 console.error("Error fetching orders", err);
//             }
//         };
//         fetchOrders();
//     }, []);

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom>
//                 Order History
//             </Typography>

//             {orders.length === 0 ? (
//                 <Typography>No orders yet.</Typography>
//             ) : (
//                 <Stack spacing={3}>
//                     {orders.map((order) => (
//                         <Paper key={order._id} sx={{ p: 2 }}>
//                             <Grid container justifyContent="space-between">
//                                 <Grid item>
//                                     <Typography variant="subtitle2">
//                                         Order Date: {new Date(order.createdAt).toLocaleDateString()}
//                                     </Typography>
//                                     <Typography variant="subtitle2">
//                                         Total: ${order.totalAmount.toFixed(2)}
//                                     </Typography>
//                                 </Grid>
//                                 <Grid item>
//                                     <Chip
//                                         label={order.status}
//                                         color={order.status === "paid" ? "success" : "warning"}
//                                         size="small"
//                                     />
//                                 </Grid>
//                             </Grid>

//                             <Divider sx={{ my: 1 }} />

//                             {order.items.map((item, idx) => (
//                                 <Box key={idx} sx={{ mb: 1 }}>
//                                     <Typography>
//                                         {item.product.name} × {item.quantity}
//                                     </Typography>
//                                 </Box>
//                             ))}
//                         </Paper>
//                     ))}
//                 </Stack>
//             )}
//         </Box>
//     );
// };

// export default ViewOrders;
// import {
//     Accordion, AccordionSummary, AccordionDetails,
//     Typography, Chip, Divider, Box
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// const ViewOrders = () => {
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const res = await api.get("/api/orders");
//                 setOrders(res.data || []);
//             } catch (err) {
//                 console.error("Error fetching orders", err);
//             }
//         };
//         fetchOrders();
//     }, []);

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom>
//                 Order History
//             </Typography>
//             {orders.map((order) => (
//                 <Accordion key={order._id}>
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                         <Typography sx={{ flexGrow: 1 }}>
//                             Order on {new Date(order.createdAt).toLocaleDateString()}
//                         </Typography>
//                         <Chip
//                             label={order.status}
//                             color={order.status === "paid" ? "success" : "warning"}
//                             size="small"
//                         />
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Typography>Total: ${order.totalAmount.toFixed(2)}</Typography>
//                         <Divider sx={{ my: 1 }} />
//                         {order.items.map((item, idx) => (
//                             <Typography key={idx}>
//                                 {item.product.name} × {item.quantity}
//                             </Typography>
//                         ))}
//                     </AccordionDetails>
//                 </Accordion>
//             ))}
//         </Box>);
// }
// export default ViewOrders

import {
    Accordion, AccordionSummary, AccordionDetails,
    Typography, Chip, Divider, Box, Stack, Grid
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import api from "../../api/axios";

const ViewOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("/api/orders");
                setOrders(res.data || []);
                console.log(res.data)
            } catch (err) {
                console.error("Error fetching orders", err);
            }
        };
        fetchOrders();
    }, []);

    if (orders.length === 0) {
        return <Typography>No orders found.</Typography>;
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
                                    <Chip sx={{ marginLeft: '15px' }}
                                        label={order.status}
                                        color={
                                            order.status === "paid"
                                                ? "success"
                                                : order.status === "unpaid"
                                                    ? "info"
                                                    : "default"
                                        }
                                        size="small"
                                    />
                                    <Chip sx={{ marginLeft: '15px' }}
                                        label={order.isDelivered ? 'Delivered' : 'Not delivered yet'}
                                        color={
                                            order.isDelivered
                                                ? "success"
                                                : "warning"
                                        }
                                        size="small"
                                    />
                                </Grid>
                            </Grid>
                        </AccordionSummary>

                        <AccordionDetails>
                            {/* Customer Info */}
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2">Customer Info:</Typography>
                                <Typography>Name: {order.orderDetail.fullName}</Typography>
                                <Typography>Email: {order.orderDetail.email}</Typography>
                                <Typography>Phone: {order.orderDetail.phone}</Typography>
                                <Typography>Address: {order.orderDetail.address}, {order.orderDetail.city}, {order.orderDetail.zip}</Typography>
                                {order.orderDetail.notes && <Typography>Notes: {order.orderDetail.notes}</Typography>}
                            </Box>

                            <Divider sx={{ my: 1 }} />

                            {/* Ordered Items */}
                            <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                    Items:
                                </Typography>
                                <Stack spacing={1}>
                                    {order.items.map((item, idx) => (
                                        <Box key={idx}>
                                            <Typography>
                                                {item.product?.name} × {item.quantity} — ${item.product?.price}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Stack>
        </Box>
    );
};

export default ViewOrders;
