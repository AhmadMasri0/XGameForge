import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import {
    Box, Container, Typography, Button, Stack, Divider,
    Rating, Chip, TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { allProducts } from "../../data/products";
import './Arrow.css'
import { useCart } from "../../contexts/CartContext";

function Arrow(props) {
    const { className, style, onClick } = props;

    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}


const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const product = allProducts.find((item) => item.id === parseInt(productId));
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleQuantityChange = (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val)) val = 1;
        // if (val > 3) val = 3;
        if (val < 1) val = 1;
        setQuantity(val);
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />
    };

    if (!product) {
        return (
            <Container>
                <Typography variant="h4">Product not found</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ my: 6 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/shop")}
                sx={{ mb: 2 }}
            >
                Back to Shop
            </Button>

            <Stack direction={{ xs: "column", md: "row" }} sx={{ flexWrap: 'wrap', alignContent: 'center' }} spacing={4}>
                {/* Image Carousel */}
                <Box sx={{ width: { xs: "80%", md: 400 }, marginLeft: { xs: '10% !important', sm: '0 !important' } }}>
                    <Slider {...sliderSettings}>
                        {(product.images || [product.images]).map((img, index) => (
                            <Box
                                key={index}
                                component="img"
                                src={img}
                                alt={`${product.name} ${index}`}
                                sx={{
                                    height: 400,
                                    width: "100%",
                                    objectFit: "cover",
                                    borderRadius: 2,
                                }}
                            />
                        ))}
                    </Slider>
                </Box>

                {/* Product Details */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        {product.name}
                    </Typography>

                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <Chip label={product.category} color="info" />
                        <Chip label={product.platform} color="primary" />
                    </Stack>

                    <Typography variant="h5" color="secondary" gutterBottom>
                        ${product.price}
                    </Typography>

                    <Rating value={product.rating} readOnly precision={0.5} sx={{ mb: 2 }} />
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {product.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                        <TextField
                            label="Quantity"
                            type="number"
                            size="small"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min={1}
                            // max={3}
                            inputProps={{ min: 1, max: 3 }}
                            sx={{ width: 100 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddShoppingCartIcon />}
                            disabled={quantity > 3}
                            onClick={() => addToCart(product, quantity)}
                        >
                            Add to Cart
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default ProductDetail;
