// ProductFilter.js
import React from "react";
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    TextField,
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import DevicesIcon from "@mui/icons-material/Devices";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const ProductFilter = ({ filters, onFilterChange, searchQuery, handleSearchChange }) => {
    const handleChange = (field) => (event) => {
        onFilterChange({ ...filters, [field]: event.target.value });
    };

    return (
        <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={3} sx={{ justifyContent: 'center' }}>

                <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ width: { xs: '100%', sm: '30%', maxWidth: '180px' } }}>
                    <FormControl fullWidth>
                        <InputLabel><SportsEsportsIcon fontSize="small" /> Category</InputLabel>
                        <Select
                            value={filters.category}
                            label="Category"
                            onChange={handleChange("category")}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Games">Games</MenuItem>
                            <MenuItem value="Accessories">Accessories</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>


                <Grid item xs={12} sx={{ width: { xs: '100%', sm: '30%', maxWidth: '180px' } }}>
                    <FormControl fullWidth>
                        <InputLabel><DevicesIcon fontSize="small" /> Platform</InputLabel>
                        <Select
                            value={filters.platform}
                            label="Platform"
                            onChange={handleChange("platform")}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="PS5">PS5</MenuItem>
                            <MenuItem value="PC">PC</MenuItem>
                            <MenuItem value="Xbox">Xbox</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>


                <Grid item xs={12} sx={{ width: { xs: '100%', sm: '30%', maxWidth: '180px', marginBottom: '15px' } }}>
                    <FormControl fullWidth>
                        <InputLabel><AttachMoneyIcon fontSize="small" /> Price</InputLabel>
                        <Select
                            value={filters.price}
                            label="Price"
                            onChange={handleChange("price")}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="low">Low to High</MenuItem>
                            <MenuItem value="high">High to Low</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductFilter;
