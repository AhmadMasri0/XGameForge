import { Button, Container, Typography } from "@mui/material";
import { JSX } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UnAuthBookingForm = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Container 
            maxWidth="sm" 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: 3 
            }}
        >
            <Typography variant="h5" mt={4} textAlign="center">
                Login now to reserve your preferred gaming session.
            </Typography>
            <Button
                sx={{ width: '100px' }}
                variant="contained"
                type="button"
                onClick={() =>
                    navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`, { 
                        replace: true 
                    })
                }
            >
                Login
            </Button>
        </Container>
    );
};

export default UnAuthBookingForm;