import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import {
    Box, Container, Typography, Button, Stack, Divider,
    Rating, Chip, TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Arrow.css'
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import api, { API_URL } from "../../api/axios";

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
    // const product = allProducts.find((item) => item.id === parseInt(productId));
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { user } = useAuth();


    useEffect(() => {

        api.get(`/api/products/${productId}`)
            .then(({ data }) => {
                setProduct(data);
            })
            .catch(err => console.error('Failed to fetch product:', err));

    }, [productId]);


    const handleQuantityChange = (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val)) val = 1;
        if (val > 3) val = 3;
        if (val < 1) val = 1;
        setQuantity(val);
    };

    const sliderSettings = {
        dots: true,
        infinite: product?.images?.length > 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />
    };

    const deleteProduct = async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this product?');
        if (!isConfirmed)
            return;
        try {
            await api.delete(`/api/products/${productId}`);
            alert('Product deleted successfully');
            navigate('/shop');
        } catch (err) {
            console.error('Failed to delete product:', err);
            alert('Failed to delete product');
        }
    }

    if (!product) {
        return (
            <Container sx={{
                display: 'flex', justifyContent: 'center',
                alignItems: 'center', padding: '15px', flexDirection: 'column', gap: 5
            }}>
                <Typography variant="h4">Product not found</Typography>

                <Button
                    variant="contained"
                    // startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/products/create")}
                    sx={{ mb: 2, width: '150px' }}
                >
                    Add product
                </Button>
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

                <Box sx={{ width: { xs: "80%", md: 400 }, marginLeft: { xs: '10% !important', sm: '0 !important' } }}>
                    <Slider {...sliderSettings}>
                        {product?.images?.map((img, index) => (
                            <Box
                                key={index}
                                component="img"
                                src={API_URL + img.url}
                                alt={img.url}
                                sx={{
                                    height: 400,
                                    width: "100%",
                                    // objectFit: "cover",
                                    borderRadius: 2,
                                }}
                            />
                        ))}
                    </Slider>
                </Box>


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

                    <Rating value={+product?.rating} readOnly precision={0.5} sx={{ mb: 2 }} />
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {product.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Stack direction="column    " spacing={2} alignItems="center" sx={{ mb: 3, flexWrap: 'wrap', gap: 4 }}>
                        <Container sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            <TextField
                                label="Quantity"
                                type="number"
                                size="small"
                                value={quantity}
                                onChange={handleQuantityChange}
                                inputProps={{ min: 1, max: 3 }}
                                sx={{ width: 100 }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddShoppingCartIcon />}
                                disabled={quantity > 3 || product.amount < 1}
                                onClick={() => addToCart(product, quantity)}
                                sx={{ width: '200px' }}
                            >
                                Add to Cart

                            </Button>
                            {product.amount < 1 && <span style={{ color: 'red', fontSize: '12px' }}>Out of stock</span>}

                        </Container>

                        {user?.isAdmin && <Container sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginLeft: '0 !important' }}>

                            <Button
                                variant="contained"
                                color="info"
                                startIcon={<EditIcon />}
                                onClick={() => navigate('/products/edit/' + productId)}
                                sx={{ width: '200px' }}
                            >
                                Edit product
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={deleteProduct}
                                sx={{ width: '200px' }}
                            >
                                Delete product
                            </Button>
                        </Container>}
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default ProductDetail;
