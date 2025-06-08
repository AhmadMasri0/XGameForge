import { Box, Grid, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useCart } from "../../contexts/CartContext";

const CartList = () => {

    const { cartItems, updateQuantity, removeFromCart } = useCart();


    return <Grid item xs={12} md={4}>
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
                        src={`${item?.product?.images && item?.product?.images[0].url}`}
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
    </Grid>;
}

export default CartList;