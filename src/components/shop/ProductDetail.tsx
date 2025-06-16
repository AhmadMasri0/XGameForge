import { useEffect, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box, Container, Typography, Button, Stack, Divider,
    Rating, Chip, TextField, useTheme, Theme
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";
import ImageSlider from "./ImageSlider";
import AdminButton from "../common/AdminButton";
import { Product } from "../../types/types";


const ProductDetail = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const theme = useTheme() as Theme & { palette: { mode: 'light' | 'dark' } };
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const { addToCart } = useCart();
    const { user } = useAuth();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get<Product>(`/api/products/${productId}`);
                setProduct(data);
            } catch (err) {
                console.error('Failed to fetch product:', err);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        let val = parseInt(e.target.value);
        if (isNaN(val)) val = 1;
        if (val > 3) val = 3;
        if (val < 1) val = 1;
        setQuantity(val);
    };

    const deleteProduct = async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this product?');
        if (!isConfirmed) return;
        
        try {
            await api.delete(`/api/products/${productId}`);
            alert('Product deleted successfully');
            navigate('/shop');
        } catch (err) {
            console.error('Failed to delete product:', err);
            alert('Failed to delete product');
        }
    };

    if (!product) {
        return (
            <Container sx={{
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center', 
                padding: '15px', 
                flexDirection: 'column', 
                gap: 5, 
                marginTop: '15px'
            }}>
                <Typography variant="h4">Product not found</Typography>

                {user?.isAdmin && (
                    <Button
                        variant="contained"
                        onClick={() => navigate("/products/create")}
                        sx={{ mb: 2, width: '150px' }}
                    >
                        Add product
                    </Button>
                )}
            </Container>
        );
    }

    return (
        <Container sx={{ my: 6 }}>
            <Button
                color="primary"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/shop")}
                sx={{ mb: 2 }}
            >
                Back to Shop
            </Button>

            <Stack direction={{ xs: "column", md: "row" }} sx={{ flexWrap: 'wrap', alignContent: 'center' }} spacing={4}>
                <ImageSlider product={product} />

                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        {product.name}
                    </Typography>

                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <Chip label={product.category} color="info" />
                        <Chip label={product.platform} color="primary" />
                    </Stack>
                    
                    {product.brand && (
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Brand:</strong> {product.brand}
                        </Typography>
                    )}

                    <Typography variant="h5" color="secondary" gutterBottom>
                        ${product.price.toFixed(2)}
                    </Typography>

                    <Rating 
                        value={typeof product.rating === 'string' ? parseFloat(product.rating) : product.rating} 
                        readOnly 
                        precision={0.5} 
                        sx={{ mb: 2 }} 
                    />

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {product.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Stack direction="column" spacing={2} alignItems="center" sx={{ mb: 3, flexWrap: 'wrap', gap: 4 }}>
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
                                sx={{
                                    mb: 2, 
                                    width: '200px',
                                    border: theme.palette.mode === 'light' ? '' : '1px solid gray'
                                }}
                                startIcon={<AddShoppingCartIcon />}
                                disabled={quantity > 3 || product.amount < 1}
                                onClick={() => addToCart(product, quantity)}
                            >
                                Add to Cart
                            </Button>
                            {product.amount < 1 && (
                                <span style={{ color: 'red', fontSize: '12px' }}>Out of stock</span>
                            )}
                        </Container>

                        {user?.isAdmin && (
                            <Container sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginLeft: '0 !important' }}>
                                <AdminButton 
                                    title={'Edit product'} 
                                    Icon={EditIcon} 
                                    onClick={() => navigate('/products/edit/' + productId)} 
                                    color='info' 
                                    style={{ width: '200px' }} 
                                />
                                <AdminButton 
                                    title={'Delete product'} 
                                    Icon={DeleteIcon} 
                                    onClick={deleteProduct} 
                                    color='error' 
                                    style={{ width: '200px' }} 
                                />
                            </Container>
                        )}
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default ProductDetail;