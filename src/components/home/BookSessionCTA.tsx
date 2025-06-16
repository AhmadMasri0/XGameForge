import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import MotionFade from "../common/MotionFade";

const BookSessionCTA = () => (
    <Box sx={{
        textAlign: "center", py: 6, backgroundColor: "primary.main",
        color: "white", px: 2
    }}>
        <MotionFade>
            <Typography variant="h4" gutterBottom>Ready to play?</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                Reserve your console or VR headset now and skip the wait.
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                component={Link}
                to="/booking"
            >
                Book Now
            </Button>
        </MotionFade>

    </Box>
);

export default BookSessionCTA;
