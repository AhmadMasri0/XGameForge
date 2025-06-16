import { useEffect, useState, ChangeEvent } from "react";
import {
    Container, TextField, Button, Typography, Grid,
    Paper, MenuItem, Checkbox, FormControlLabel, Rating
} from "@mui/material";
import { useForm, Controller, Control } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Product } from "../../types/types";

interface Image {
    url: string;
    alt?: string;
}


const CATEGORIES = ['Game', 'Accessory', 'Console', 'Merch', 'Other'] as const;
const PLATFORMS = ['All', 'PS5', 'PS4', 'PC', 'XBox', 'Other'] as const;
const MAX_IMAGES = 5;

const ProductForm = () => {
    const { id } = useParams<{ id?: string }>();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const { user } = useAuth();

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<Image[]>([]);
    const [removedImages, setRemovedImages] = useState<Image[]>([]);
    const [noImageError, setNoImageError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<Product>({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            discount: 0,
            amount: 0,
            category: 'Other',
            platform: 'Other',
            brand: '',
            isFeatured: false,
            rating: 0
        }
    });

useEffect(() => {
    if (!user?.isAdmin) {
        navigate('/');
        return;
    }

    if (!isEdit) return;

    const fetchData = async () => {
        try {
            const res = await api.get<Product>(`/api/products/${id}`);
            setExistingImages(res.data.images || []);
            reset(res.data);
        } catch (err) {
            console.error("Error fetching product:", err);
        }
    };

    fetchData();
}, [id, isEdit, user, reset, navigate]);

    const handleRemoveImage = (index: number) => {
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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        const allowed = MAX_IMAGES - existingImages.length - imageFiles.length;
        setImageFiles(prev => [...prev, ...files.slice(0, allowed)]);
    };

    const renderField = (
        name: keyof Product,
        label: string,
        rules = {},
        type = 'text',
        props = {}
    ) => (
        <Grid >
            <Controller
                name={name}
                control={control as Control<Product>}
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
                        value={field.value ?? ''}
                        onChange={(e) => {
                            if (type === 'number') {
                                field.onChange(e.target.value === '' ? '' : Number(e.target.value));
                            } else {
                                field.onChange(e.target.value);
                            }
                        }}
                    />
                )}
            />
        </Grid>
    );

    const onSubmit = async (formData: Product) => {
        if (!isEdit && imageFiles.length === 0) {
            return setNoImageError("Please upload at least one image.");
        }

        setNoImageError(null);
        const data = new FormData();

        Object.entries(formData).forEach(([key, val]) => {
            if (key !== 'images') {
                data.append(key, typeof val === "object" ? JSON.stringify(val) : String(val));
            }
        });

        data.append("removedImages", JSON.stringify(removedImages));
        imageFiles.forEach(file => data.append("images", file));

        try {
            const endpoint = isEdit ? `/api/products/${id}` : "/api/products";
            const method = isEdit ? api.put : api.post;

            await method(endpoint, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
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
                <Button
                    startIcon={<ArrowBackIcon />}
                    color="primary"
                    onClick={() => navigate(id ? "/products/" + id : '/shop')}
                    sx={{ mb: 2 }}
                >
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

                        <Grid >
                            <Controller
                                name="description"
                                control={control as Control<Product>}
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
                            <Grid key={name}>
                                <Controller
                                    name={name as keyof Product}
                                    control={control as Control<Product>}
                                    render={({ field }) => (
                                        <TextField
                                            select
                                            label={name[0].toUpperCase() + name.slice(1)}
                                            fullWidth
                                            {...field}
                                        >
                                            {options.map(option => (
                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Grid>
                        ))}

                        <Grid >
                            <Controller
                                name="rating"
                                control={control as Control<Product>}
                                render={({ field }) => (
                                    <>
                                        <Typography>Rating</Typography>
                                        <Rating
                                            precision={0.5}
                                            value={Number(field.value)}
                                            onChange={(_, val) => field.onChange(val ?? 0)}
                                        />
                                    </>
                                )}
                            />
                        </Grid>

                        <Grid >
                            <Controller
                                name="isFeatured"
                                control={control as Control<Product>}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox {...field} checked={Boolean(field.value)} />}
                                        label="Featured Product"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid >
                            <Typography variant="subtitle1">Product Images</Typography>
                            <Grid container spacing={2}>
                                {[...existingImages, ...imageFiles].map((img, idx) => {
                                    const isNew = idx >= existingImages.length;
                                    const src = isNew ? URL.createObjectURL(img) : `${img.url}`;
                                    return (
                                        <Grid key={idx}>
                                            <img
                                                src={src}
                                                alt="Preview"
                                                style={{
                                                    width: '100%',
                                                    height: 150,
                                                    objectFit: 'contain',
                                                    borderRadius: 8
                                                }}
                                            />
                                            <Button
                                                fullWidth
                                                color="error"
                                                size="small"
                                                onClick={() => handleRemoveImage(idx)}
                                                disabled={existingImages.length + imageFiles.length <= 1}
                                            >
                                                Remove
                                            </Button>
                                        </Grid>
                                    );
                                })}

                                {existingImages.length + imageFiles.length < MAX_IMAGES && (
                                    <Grid >
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
                            {noImageError && <Typography color="error" fontSize={13}>{noImageError}</Typography>}
                        </Grid>

                        <Grid sx={{ display: "flex", justifyContent: "center", margin: '10px' }}>
                            <Button variant="contained" color="primary" type="submit">
                                {isEdit ? "Update Product" : "Create Product"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default ProductForm;