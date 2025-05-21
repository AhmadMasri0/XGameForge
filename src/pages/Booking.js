// Booking.jsx
import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import BookingForm from "../components/booking/BookingForm";

const Booking = () => {
    return (
        <Container maxWidth="md" sx={{ my: 4 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom sx={{ textAlign: 'center' }}>
                Book a Gaming Session
            </Typography>
            <Paper elevation={3} sx={{ p: 3 }}>
                <BookingForm />
            </Paper>
        </Container>
    );
};

export default Booking;