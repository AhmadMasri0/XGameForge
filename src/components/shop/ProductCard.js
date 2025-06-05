import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Box, Button, Rating, useTheme } from "@mui/material";
import { useCart } from "../../contexts/CartContext";
import MotionFade from "../common/MotionFade";
import { useState } from "react";


const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const [added, setAdded] = useState(false);
    const theme = useTheme();

    const handleAddToCart = async () => {
        setIsLoading(true);
        try {
            await addToCart(product);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        } catch (err) {
            console.error("Failed to add to cart", err);
        } finally {
            setIsLoading(false);
        }
    };


    return <Card
        sx={{
            height: "auto",
            width: { xs: '80%', sm: '250px' },
            maxWidth: '250px',
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.3s ease",
            '&:hover': {
                transform: "scale(1.03)",
                boxShadow: 6,
            },
        }}
    >
        <MotionFade>

            <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>

                <CardMedia
                    component="img"
                    height="200"
                    sx={{ objectFit: 'contain' }}
                    image={product.images[0]['url']}
                    alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom color={theme.customColors.primary}
                        sx={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden', height: '30px', whiteSpace: 'nowrap'
                        }}>
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Platform: {product.platform}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Category: {product.category}
                    </Typography>
                    <Box sx={{ mt: 1, mb: 1 }}>
                        <Rating name="read-only" value={product.rating} readOnly precision={0.5} />
                    </Box>
                    <Typography variant="h6" color={theme.customColors.primary}>
                        ${product.price.toFixed(2)}
                    </Typography>
                </CardContent>

            </Link>
            <Box sx={{ p: 2 }}>
                <Button fullWidth variant="contained" color="secondary"
                    onClick={handleAddToCart} disabled={product.amount < 1 || isLoading}>
                    {isLoading ? "Adding..." : added ? "Added!" : "Add to Cart"}
                </Button>
                {product.amount < 1 && <span style={{ color: 'red', fontSize: '12px' }}>out of stock</span>}
            </Box>
        </MotionFade>

    </Card>
};

export default ProductCard;