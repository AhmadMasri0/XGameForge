import { Box, Typography, Button, useTheme } from "@mui/material";
import heroImage from "../../assets/hero.jpg";
import { Link } from "react-router-dom";

const HeroBanner = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                height: { xs: "60vh", md: "80vh" },
                backgroundImage: `url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                position: "relative",
                textAlign: "center",
            }}
        >
            <Box
                sx={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h3" fontWeight="bold">
                    Welcome to XGameForge
                </Typography>
                <Typography variant="h6" sx={{ my: 2 }}>
                    Play. Shop. Chill.
                </Typography>
                <Button variant="contained" color="primary" to="/booking" component={Link}
                    sx={{
                        '&:hover': {
                            backgroundColor: theme.customColors.activelink
                        }
                    }}>
                    Book a Session
                </Button>
            </Box>
        </Box>
    );
};

export default HeroBanner;
