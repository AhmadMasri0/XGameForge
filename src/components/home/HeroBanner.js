import { Box, Typography, Button, useTheme } from "@mui/material";
import heroImage from "../../assets/hero1.png";
import { Link } from "react-router-dom";
import MotionFade from "../common/MotionFade";

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
            {/* <MotionFade> */}
            <Box sx={{
                backgroundColor: "rgba(254, 250, 250, 0.14)",
                p: 4, borderRadius: 2
            }}>
                <Typography variant="h3" fontWeight="bold">
                    Welcome to XGameForge
                </Typography>
                <Typography variant="h6" sx={{ my: 2 }}>
                    Book a session, shop the latest gear, and chill with friends — all in one place
                </Typography>
                <Typography variant="h6" sx={{ my: 2 }}>
                    Where Gaming Meets Lifestyle
                </Typography>
                <Button variant="contained" to="/booking" component={Link}
                    sx={{
                        '&:hover': {
                            backgroundColor: theme.customColors.activelink
                        }
                    }}>
                    Book a Session
                </Button>
            </Box>
            {/* </MotionFade> */}
        </Box>
    );
};

export default HeroBanner;
