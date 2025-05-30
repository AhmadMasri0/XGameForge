import {
    Container, Typography, Grid,
    Button, Box, Divider, Paper, Stack,
} from "@mui/material";
import BarCard from '../components/barCorner/BarCard'
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

import {
    LocalCafe,
    Fastfood,
    LocalBar,
    Restaurant,
    Category
} from '@mui/icons-material';

const icons = {
    Beverage: <LocalCafe />,
    Snack: <Fastfood />,
    Cocktail: <LocalBar />,
    Meal: <Restaurant />,
    Other: <Category />,
};
const categories = ['Beverage', 'Snack', 'Cocktail', 'Meal', 'Other'];

const BarCorner = () => {

    const [menuItems, setMenuItems] = useState([]);
    const [displayedItems, setDisplayedItems] = useState({});
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        for (let cat of menuItems) {
            const category = cat.category;
            setDisplayedItems(
                (pre) => {
                    const temp = { ...pre };
                    temp[category] = menuItems?.filter((item) => item.category === category);
                    return temp
                })
        }
    }, [menuItems]);


    useEffect(() => {
        const fetchBarItems = async () => {
            try {
                const res = await api.get('/api/bar', {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setMenuItems(res.data)
            } catch (error) {
                console.error(error);
                alert('Failed to add bar item');
            }
        }
        fetchBarItems();
    }, []);



    const deleteBarItem = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');
        if (!isConfirmed)
            return;
        try {
            await api.delete(`/api/bar/${id}`);
            alert('Item deleted successfully');
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the item:', err);
            alert('Failed to delete the item');
        }
    }

    const renderMenuSection = (title, icon, items) => (
        <Box sx={{ my: 6 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                {icon} {title}
            </Typography>
            <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                {items?.map((item) => (
                    <BarCard item={item} icon={icon} deleteBarItem={deleteBarItem} />
                ))}
            </Grid>

        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ my: 6 }}>
            <Paper elevation={2} sx={{ p: 4, textAlign: "center", mb: 6 }}>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                    🍻 Welcome to the Bar Corner
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Grab a snack or drink while you game in style!
                </Typography>
            </Paper>

            <Divider sx={{ mb: 4 }} />
            {user?.isAdmin && <Container sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                <Button
                    variant="contained"
                    onClick={() => navigate("/bar/create")}
                    sx={{ mb: 2 }}
                >
                    Add Item
                </Button>
            </Container>}
            {categories.map((item, i) => {
                return renderMenuSection(item, icons[item], displayedItems[item])
            })}

        </Container>
    );
};

export default BarCorner;
