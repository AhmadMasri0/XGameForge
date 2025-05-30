import React, { useEffect, useState } from 'react';
import {
    Container, TextField, Button, Typography, Grid,
    Paper, MenuItem, Checkbox, FormControlLabel, Rating
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import api, { API_URL } from '../../api/axios';
import { useAuth } from '../../contexts/AuthContext';

const categories = ['Game', 'Accessory', 'Console', 'Merch', 'Other'];
const platforms = ['All', 'PS5', 'PS4', 'PC', 'XBox', 'Other'];
const maxImages = 5;

const ProductForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const { user } = useAuth();

    const [imageFiles, setImageFiles] = useState([]);             // New files to upload
    const [existingImages, setExistingImages] = useState([]);     // Existing image filenames
    const [removedImages, setRemovedImages] = useState([]);       // Filenames to remove
    const [noImageError, setNoImageError] = useState(null);

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            discount: 0,
            amount: 0,
            category: 'Other',
            platform: 'Other',
            brand: '',
            tags: [],
            isFeatured: false,
            rating: 0,
        },
    });

    useEffect(() => {
        if (!user?.isAdmin) return navigate('/');

        if (isEdit) {
            api.get(`/api/products/${id}`)
                .then(({ data }) => {
                    setExistingImages(data.images || []);
                    data.tags = Array.isArray(data.tags) ? data.tags : [];
                    reset(data);
                })
                .catch(err => console.error('Failed to fetch product:', err));
        }
    }, [id, isEdit, user, reset, navigate]);

    const handleRemoveImage = (index) => {
        const totalImages = existingImages.length + imageFiles.length;
        if (totalImages <= 1) {
            alert("At least 1 image is required.");
            return;
        }

        if (index < existingImages.length) {
            const filename = existingImages[index];
            setRemovedImages(prev => [...prev, filename]);
            setExistingImages(prev => prev.filter((_, i) => i !== index));
        } else {
            setImageFiles(prev => prev.filter((_, i) => i !== (index - existingImages.length)));
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const allowed = maxImages - existingImages.length - imageFiles.length;

        if (allowed <= 0) return;

        const selected = files.slice(0, allowed);
        setImageFiles(prev => [...prev, ...selected]);
    };

    const onSubmit = async (data) => {

        if (!isEdit && imageFiles.length === 0) {
            setNoImageError('Add at least one image.');
            return;
        }
        setNoImageError(null);
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key !== 'images') {
                    formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
                }
            });

            // console.log(removedImages)

            formData.append('removedImages', JSON.stringify(removedImages));

            imageFiles.forEach(file => formData.append('images', file));

            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const res = isEdit
                ? await api.put(`/api/products/${id}`, formData, config)
                : await api.post('/api/products', formData, config);

            alert(isEdit ? 'Product updated successfully' : 'Product created successfully');
            navigate('/shop');
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('Error submitting form');
        }
    };

    const renderTextField = (name, label, rules = {}, type = 'text', props = {}) => (
        <Grid item xs={12} sm={6}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type={type}
                        label={label}
                        fullWidth
                        error={!!errors[name]}
                        helperText={errors[name]?.message}
                        {...props}
                    />
                )}
            />
        </Grid>
    );

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h5" mb={3}>
                    {isEdit ? 'Update Product' : 'Create Product'}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        {renderTextField('name', 'Product Name', { required: 'Name is required' })}
                        <Grid item xs={12}>
                            <Controller
                                name="description"
                                control={control}
                                rules={{ required: 'Description is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Description"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        error={!!errors.description}
                                        helperText={errors.description?.message}
                                    />
                                )}
                            />
                        </Grid>

                        {renderTextField('brand', 'Brand')}
                        {renderTextField('price', 'Price', { required: 'Price is required', min: 0 }, 'number')}
                        {renderTextField('discount', 'Discount (%)', { min: 0, max: 100 }, 'number')}
                        {renderTextField('amount', 'Stock Amount', { required: 'Amount is required', min: 0 }, 'number')}

                        {['category', 'platform'].map(field => (
                            <Grid item xs={12} sm={6} key={field}>
                                <Controller
                                    name={field}
                                    control={control}
                                    render={({ field: f }) => (
                                        <TextField {...f} select label={field.charAt(0).toUpperCase() + field.slice(1)} fullWidth>
                                            {(field === 'category' ? categories : platforms).map(option => (
                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Grid>
                        ))}

                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="rating"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Typography component="legend">Rating</Typography>
                                        <Rating
                                            precision={0.5}
                                            value={Number(field.value)}
                                            onChange={(_, value) => field.onChange(value)}
                                        />
                                    </>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Product Images</Typography>
                            <Grid container spacing={2}>
                                {[...existingImages, ...imageFiles].map((img, index) => {
                                    const isNew = index >= existingImages.length;

                                    const src = isNew ? URL.createObjectURL(img) : `${API_URL}${img.url}`;
                                    return (
                                        <Grid item xs={4} key={index}>
                                            <img
                                                src={src}
                                                alt="Preview"
                                                style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 8 }}
                                            />
                                            <Button
                                                color="error"
                                                fullWidth
                                                size="small"
                                                onClick={() => handleRemoveImage(index)}
                                                disabled={existingImages.length + imageFiles.length <= 1}
                                            >
                                                Remove
                                            </Button>
                                        </Grid>
                                    );
                                })}

                                {(existingImages.length + imageFiles.length < maxImages) && (
                                    <Grid item xs={12}>
                                        <Button variant="contained" component="label" fullWidth>
                                            Upload Image (max 5)
                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                multiple
                                                onChange={handleFileChange}
                                            />
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="isFeatured"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox {...field} checked={field.value} />}
                                        label="Featured Product"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                                {isEdit ? 'Update Product' : 'Create Product'}
                            </Button>

                        </Grid>

                    </Grid>
                    {
                        noImageError && <span style={{ color: 'red', fontSize: '13px' }}>
                            {noImageError}
                        </span>
                    }
                </form>
            </Paper>
        </Container>
    );
};

export default ProductForm;
