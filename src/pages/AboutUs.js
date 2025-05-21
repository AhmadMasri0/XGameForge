// AboutUs.js
import React from "react";
import {
    Container, Typography,
    Box, Grid,
    Paper, Divider,
    Stack,
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import StorefrontIcon from "@mui/icons-material/Storefront";

const AboutUs = () => {
    return (
        <Box sx={{ py: 6 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    background: "linear-gradient(to right, #1c1c1c, #3d3d3d)",
                    color: "#fff",
                    py: 8,
                    textAlign: "center",
                }}
            >
                <Typography variant="h3" fontWeight={700}>
                    About XGameForge
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 2, maxWidth: "600px", mx: "auto" }}>
                    More than a gaming center — a social hub for gamers, coffee lovers, and tech enthusiasts.
                </Typography>
            </Box>

            <Container maxWidth="lg">
                {/* Mission */}
                <Box sx={{ my: 6 }}>
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        Our Mission
                    </Typography>
                    <Typography color="text.secondary">
                        At XGameForge, we aim to create a vibrant, welcoming space for gamers and entertainment lovers.
                        Whether you're here to challenge friends, relax with a drink, or explore the latest gear,
                        we deliver a premium experience that blends technology, fun, and comfort.
                    </Typography>
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* What We Offer */}
                <Box sx={{ my: 6 }}>
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        What We Offer
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                                <SportsEsportsIcon fontSize="large" color="primary" />
                                <Typography variant="h6" fontWeight={600} sx={{ mt: 1 }}>
                                    Gaming Lounge
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Play the latest titles on high-end PCs, consoles, and VR.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                                <LocalBarIcon fontSize="large" color="secondary" />
                                <Typography variant="h6" fontWeight={600} sx={{ mt: 1 }}>
                                    Bar Corner
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Enjoy gourmet snacks and drinks in a relaxing lounge atmosphere.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                                <StorefrontIcon fontSize="large" color="info" />
                                <Typography variant="h6" fontWeight={600} sx={{ mt: 1 }}>
                                    Game Shop
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Discover and buy games, accessories, and collectibles.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                {/* Why Choose Us */}
                <Box sx={{ my: 6 }}>
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        Why Choose XGameForge?
                    </Typography>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <Typography>🎮 High-performance gaming gear and immersive experiences</Typography>
                        <Typography>☕ Chill bar corner with quality coffee and snacks</Typography>
                        <Typography>🛒 Handpicked shop products for gamers and tech lovers</Typography>
                        <Typography>👥 Community-driven space with events and tournaments</Typography>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default AboutUs;
