import {
    Box, Typography, IconButton, Popover, Divider,
    Button, List, ListItem, ListItemAvatar, Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { API_URL } from "../../api/axios";

const CartPopover = ({ anchorEl, onClose, cartItems, removeItem }) => {
    
    const open = Boolean(anchorEl);
    const total = cartItems.reduce((sum, item) => sum + +item?.product?.price * +item?.quantity, 0).toFixed(2);

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
                paper: {
                    onMouseLeave: onClose,
                }
            }}
            sx={{ mt: 1 }}
        >
            <Box sx={{ p: 2, width: 320 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom >
                    Cart Preview
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {cartItems?.length === 0 ? (
                    <Typography variant="body2">Your cart is empty.</Typography>
                ) : (
                    <List dense>
                        {cartItems?.map((item) => (
                            <ListItem key={item?.product?.id} disableGutters>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        src={`${item?.product?.images?.[0].url}`}
                                        alt={item?.product?.title}
                                        sx={{ width: 48, height: 48 }}
                                    />
                                </ListItemAvatar>
                                <Box sx={{ ml: 2, flexGrow: 1 }}>
                                    <Typography variant="subtitle2" noWrap>
                                        {item?.product?.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Qty: {item.quantity} × ${item?.product?.price?.toFixed(2)}
                                    </Typography>
                                </Box>
                                <IconButton
                                    edge="end"
                                    size="small"
                                    onClick={() => removeItem(item.product._id)}
                                    sx={{ ml: "auto" }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                )}

                {cartItems.length > 0 && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                            <Typography variant="subtitle1">Total:</Typography>
                            <Typography fontWeight={700}>${total}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                            <Button
                                component={Link}
                                to="/cart"
                                variant="outlined"
                                color=""
                                size="small"
                                fullWidth
                                onClick={onClose}
                            >
                                View Cart
                            </Button>
                            <Button
                                component={Link}
                                to="/checkout"
                                variant="contained"
                                size="small"
                                fullWidth
                                onClick={onClose}
                            >
                                Checkout
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Popover>
    );
};

export default CartPopover;
