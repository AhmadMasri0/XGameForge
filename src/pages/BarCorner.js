import {
    Container, Typography, Grid, Card, CardMedia, CardContent,
    Button, Box, Chip, Divider, Paper, Stack,
} from "@mui/material";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import { menuItems } from "../data/menuItems";
import BarCard from "../components/barcrner/BarCard";

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
                    <BarCard item={item} />
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

            {renderMenuSection("Drinks", <LocalCafeIcon sx={{ mr: 1 }} />, drinks)}
            {renderMenuSection("Foods", <RestaurantMenuIcon sx={{ mr: 1 }} />, foods)}
        </Container>
    );
};

export default BarCorner;
