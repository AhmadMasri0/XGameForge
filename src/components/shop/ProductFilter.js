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

    const CustomSelect = ({ title, value, label, name, list, Icon, style }) => {

        return <Grid item xs={12} sx={{ width: { xs: '100%', sm: '30%', maxWidth: '180px' }, ...style }}>
            <FormControl fullWidth>
                <InputLabel>
                    {Icon} {title}
                </InputLabel>
                <Select
                    value={value}
                    label={label}
                    onChange={handleChange(name)}
                >
                    {list.map((item) => <MenuItem value={item.value} > {item.title}</MenuItem>)}
                </Select>
            </FormControl>
        </Grid>;
    }
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

                <CustomSelect
                    label={'Category'} name={'category'} value={filters.category} title={'Category'}
                    Icon={<SportsEsportsIcon fontSize="small" />}
                    list={[{ value: '', title: 'All' }, { value: 'Game', title: 'Games' },
                    { value: 'Accessory', title: 'Accessories' }, { value: 'Console', title: 'Consoles' },
                    { value: 'Other', title: 'Others' }
                    ]}
                />
                <CustomSelect
                    label={'Platform'} name={'platform'} value={filters.platform} title={'Platform'}
                    Icon={<DevicesIcon fontSize="small" />}
                    list={[{ value: '', title: 'All' }, { value: 'PS5', title: 'PS5' },
                    { value: 'PC', title: 'PC' }, { value: 'XBox', title: 'XBox' },
                    { value: 'Other', title: 'Others' }
                    ]}
                />
                <CustomSelect
                    label={'Price'} name={'price'} value={filters.price} title={'Price'}
                    Icon={<AttachMoneyIcon fontSize="small" />}
                    list={[{ value: '', title: 'All' }, { value: 'low', title: 'Low to High' },
                    { value: 'high', title: 'High to Low' }]} style={{ marginBottom: '20px' }}
                />
            </Grid>
        </Box>
    );
};

export default ProductFilter;
