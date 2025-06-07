import { useEffect, useState } from "react";
import {
    Container, TextField, Button, Typography, Grid,
    Paper, MenuItem, Checkbox, FormControlLabel, Rating
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CATEGORIES = ['Game', 'Accessory', 'Console', 'Merch', 'Other'];
const PLATFORMS = ['All', 'PS5', 'PS4', 'PC', 'XBox', 'Other'];
const MAX_IMAGES = 5;

const ProductForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const { user } = useAuth();

    const [imageFiles, setImageFiles] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);
    const [noImageError, setNoImageError] = useState(null);

    const {
        control, handleSubmit, reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: '', description: '', price: 0, discount: 0,
            amount: 0, category: 'Other', platform: 'Other',
            brand: '', isFeatured: false, rating: 0
        }
    });

    useEffect(() => {
        if (!user?.isAdmin) return navigate('/');

        const fetchData = async () => {
            try {
                const res = await api.get(`/api/products/${id}`);
                setExistingImages(res.data.images || []);
                reset(res.data);
            }
            catch (err) {
                console.error("Error fetching product:", err)
            }
        }

        if (isEdit) {
            fetchData();
        }

    }, [id, isEdit, user, reset, navigate]);

    const handleRemoveImage = (index) => {
        const total = existingImages.length + imageFiles.length;
        if (total <= 1) return alert("At least 1 image is required.");

        if (index < existingImages.length) {
            const removed = existingImages[index];
            setRemovedImages(prev => [...prev, removed]);
            setExistingImages(prev => prev.filter((_, i) => i !== index));
        } else {
            setImageFiles(prev => prev.filter((_, i) => i !== (index - existingImages.length)));
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const allowed = MAX_IMAGES - existingImages.length - imageFiles.length;
        setImageFiles(prev => [...prev, ...files.slice(0, allowed)]);
    };

    const renderField = (name, label, rules = {}, type = 'text', props = {}) => (
        <Grid item xs={12} sm={6}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label={label}
                        type={type}
                        fullWidth
                        error={!!errors[name]}
                        helperText={errors[name]?.message}
                        {...props}
                    />
                )}
            />
        </Grid>
    );

    const onSubmit = async (formData) => {
        if (!isEdit && imageFiles.length === 0) {
            return setNoImageError("Please upload at least one image.");
        }

        setNoImageError(null);
        const data = new FormData();
        Object.entries(formData).forEach(([key, val]) => {
            if (key !== 'images') {
                data.append(key, typeof val === "object" ? JSON.stringify(val) : val);
            }
        });

        data.append("removedImages", JSON.stringify(removedImages));
        imageFiles.forEach(file => data.append("images", file));

        try {
            const endpoint = isEdit ? `/api/products/${id}` : "/api/products";
            const method = isEdit ? api.put : api.post;

            await method(endpoint, data, { headers: { "Content-Type": "multipart/form-data" } });
            alert(isEdit ? "Product updated successfully" : "Product created successfully");
            navigate("/shop");
        } catch (err) {
            console.error(err);
            alert("Submission failed");
        }
    };

    return (
        <Container maxWidth="md">
            <Paper sx={{ p: 4, mt: 4 }}>
                <Button startIcon={<ArrowBackIcon />} color="" onClick={() => navigate(id ? "/products/" + id : '/shop')} sx={{ mb: 2 }}>
                    Back
                </Button>
                <Typography variant="h5" mb={3}>
                    {isEdit ? "Update Product" : "Create Product"}
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        {renderField("name", "Product Name", { required: "Name is required" })}
                        {renderField("brand", "Brand")}
                        {renderField("price", "Price", { required: "Price is required", min: 0 }, "number")}
                        {renderField("discount", "Discount (%)", { min: 0, max: 100 }, "number")}
                        {renderField("amount", "Stock", { required: "Amount required", min: 0 }, "number")}

                        <Grid item xs={12}>
                            <Controller
                                name="description"
                                control={control}
                                rules={{ required: "Description is required" }}
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

                        {[{ name: 'category', options: CATEGORIES }, { name: 'platform', options: PLATFORMS }].map(({ name, options }) => (
                            <Grid item xs={12} sm={6} key={name}>
                                <Controller
                                    name={name}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField select label={name[0].toUpperCase() + name.slice(1)} fullWidth {...field}>
                                            {options.map(option => (
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
                                        <Typography>Rating</Typography>
                                        <Rating precision={0.5} value={+field.value} onChange={(_, val) => field.onChange(val)} />
                                    </>
                                )}
                            />
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
                            <Typography variant="subtitle1">Product Images</Typography>
                            <Grid container spacing={2}>
                                {[...existingImages, ...imageFiles].map((img, idx) => {
                                    const isNew = idx >= existingImages.length;
                                    const src = isNew ? URL.createObjectURL(img) : `${img.url}`;
                                    return (
                                        <Grid item xs={4} key={idx}>
                                            <img src={src} alt="Preview" style={{ width: '100%', height: 150, objectFit: 'contain', borderRadius: 8 }} />
                                            <Button fullWidth color="error" size="small" onClick={() => handleRemoveImage(idx)}
                                                disabled={existingImages.length + imageFiles.length <= 1}>
                                                Remove
                                            </Button>
                                        </Grid>
                                    );
                                })}

                                {existingImages.length + imageFiles.length < MAX_IMAGES && (
                                    <Grid item xs={12}>
                                        <Button variant="contained" component="label" fullWidth>
                                            Upload Image (max 5)
                                            <input type="file" hidden accept="image/*" multiple onChange={handleFileChange} />
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                            {noImageError && <Typography color="error" fontSize={13}>{noImageError}</Typography>}
                        </Grid>


                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", margin: '10px' }}>
                        <Button variant="contained" color="primary" type="submit">
                            {isEdit ? "Update Product" : "Create Product"}
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default ProductForm;
