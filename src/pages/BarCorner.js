import React, { useState } from "react";
import {
    Container, Typography, Grid, Card, CardMedia, CardContent,
    Button, Box, Chip, Divider, Paper, Stack,
} from "@mui/material";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import burger from "../assets/burger.jpg";

const menuItems = [
    {
        id: 1,
        name: "Espresso",
        type: "Drink",
        image: burger,
        description: "Rich and bold espresso shot.",
    },
    {
        id: 2,
        name: "Cappuccino",
        type: "Drink",
        image: burger,

        description: "Smooth blend of espresso, milk, and foam.",
    },
    {
        id: 3,
        name: "Cheese Burger",
        type: "Food",
        image: burger,

        description: "Juicy grilled burger with melted cheese.",
    },
    {
        id: 4,
        name: "Nachos",
        type: "Food",
        image: burger,

        description: "Crispy nachos with spicy cheese sauce.",
    },
    {
        id: 4,
        name: "Nachos",
        type: "Food",
        image: burger,

        description: "Crispy nachos with spicy cheese sauce.",
    },
    {
        id: 4,
        name: "Nachos",
        type: "Food",
        image: burger,

        description: "Crispy nachos with spicy cheese sauce.",
    },
    {
        id: 4,
        name: "Nachos",
        type: "Food",
        image: burger,

        description: "Crispy nachos with spicy cheese sauce.",
    },
    {
        id: 4,
        name: "Nachos",
        type: "Food",
        image: burger,

        description: "Crispy nachos with spicy cheese sauce.",
    },
    {
        id: 4,
        name: "Nachos",
        type: "Food",
        image: burger,

        description: "Crispy nachos with spicy cheese sauce.",
    },
    {
        id: 4,
        name: "Nachos",
        type: "Food",
        image: burger,

        description: "Crispy nachos with spicy cheese sauce.",
    },
    {
        id: 4,
        name: "Nachos",
        type: "Food",
        image: burger,

        description: "Crispy nachos with spicy cheese sauce.",
    },
    {
        id: 4,
        name: "Nachos",
        type: "Food",
        image: burger,

        description: "Crispy nachos with spicy cheese sauce.",
    },
];

const BarCorner = () => {
    const drinks = menuItems.filter((item) => item.type === "Drink");
    const foods = menuItems.filter((item) => item.type === "Food");

    const renderMenuSection = (title, icon, items) => (
        <Box sx={{ my: 6 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                {icon} {title}
            </Typography>
            <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                {items.map((item) => (
                    <Grid item xs={12} sm={6} md={3} key={item.id}
                        sx={{ width: { xs: '60%', sm: '40%', md: '30%', lg: '20%' } }}>
                        <Card
                            sx={{
                                height: 350,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                '&:hover': {
                                    transform: "translateY(-5px)",
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={item.image}
                                alt={item.name}
                                sx={{
                                    height: 160,
                                    // objectFit: "cover",
                                }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" fontWeight={600}>
                                        {item.name}
                                    </Typography>
                                    <Chip
                                        label={item.type}
                                        icon={item.type === "Food" ? <RestaurantMenuIcon /> : <LocalCafeIcon />}
                                        size="small"
                                        color="primary"
                                    />
                                </Stack>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <Box sx={{ px: 2, pb: 2 }}>
                                <Button variant="contained" color="secondary" fullWidth>
                                    Order Now
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
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
                {/* <Button
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<QrCodeScannerIcon />}
          sx={{ mt: 3 }}
        >
          Scan to Order or Reserve Table
        </Button> */}
            </Paper>

            <Divider sx={{ mb: 4 }} />

            {renderMenuSection("Drinks", <LocalCafeIcon sx={{ mr: 1 }} />, drinks)}
            {renderMenuSection("Foods", <RestaurantMenuIcon sx={{ mr: 1 }} />, foods)}
        </Container>
    );
};

export default BarCorner;
