import React, { useState } from "react";
import {
    Container, Paper, Grid, TextField, MenuItem,
    Button, Typography, Alert, CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";
const sessionTypes = ["VR", "Console", "PlayStation", "PC", "Other"];

const BookingForm = ({ rerender, setRerender }) => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        sessionType: "VR",
        date: "",
        startTime: "",
        endTime: ""
    });

    const [checking, setChecking] = useState(false);
    const [isAvailable, setIsAvailable] = useState(null);
    const [bookingStatus, setBookingStatus] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setIsAvailable(null);
        setBookingStatus(null);
    };

    const checkAvailability = async () => {
        setChecking(true);
        setIsAvailable(null);
        try {
            const { sessionType, date, startTime, endTime } = form;
            const res = await api.get(`/api/bookings/check`, {
                params: { sessionType, date, startTime, endTime }
            });

            setIsAvailable(res.data.available);
        } catch (err) {
            console.error(err?.response?.data?.error);
            setError(err?.response?.data?.error);
            setIsAvailable(false);
        } finally {
            setChecking(false);
        }
    };

    const handleBooking = async () => {
        try {
            const res = await api.post(`/api/bookings`, form);
            setBookingStatus("success");
            setRerender(pre => !pre);
            setTimeout(() => {
                setBookingStatus(null);
                setIsAvailable(null);
            }, 3000);

        } catch (err) {
            console.error(err?.response?.data?.error);
            setError(err?.response?.data?.error);
            setBookingStatus("error");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.startTime >= form.endTime) {
            return alert("Start time must be earlier than end time.");
        } else if (new Date(form.date + ' ' + form.endTime) <= new Date()) {
            return alert("Please select future date and time.");
        }
        await checkAvailability();
    };

    if (!isAuthenticated) {
        return (
            <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <Typography variant="h5" mt={4} textAlign="center">
                    Please login to make a reservation.
                </Typography>
                <Button
                    sx={{ width: '100px' }}
                    variant="contained"
                    type="button"
                    onClick={() => navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`, { replace: true })}
                >
                    Login
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h5" mb={2}>Book a Gaming Session</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                        <Grid item xs={12}>

                            <TextField
                                sx={{ width: '150px' }}
                                select
                                label="Session Type"
                                name="sessionType"
                                value={form.sessionType}
                                onChange={handleChange}
                                fullWidth
                            >
                                {sessionTypes.map(type => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ width: '150px', }}

                                type="date"
                                name="date"
                                label="Date"
                                inputProps={{ min: new Date().toISOString().split("T")[0] }}
                                value={form.date}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                sx={{ width: '150px', }}

                                type="time"
                                name="startTime"
                                label="Start Time"
                                value={form.startTime}
                                inputProps={{
                                    min: new Date().toISOString().slice(0, 16),
                                }}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                sx={{ width: '150px', }}

                                type="time"
                                name="endTime"
                                label="End Time"
                                value={form.endTime}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                        {/* <Grid item xs={12} sx={{justifyContent: 'center', display: 'flex', flexDirection: 'row'}}> */}
                        <Button
                            sx={{ width: '200px', }}

                            variant="contained"
                            type="submit"
                            fullWidth
                            disabled={checking}
                        >
                            {checking ? <CircularProgress size={24} /> : "Check Availability"}
                        </Button>
                        {/* </Grid> */}

                        {isAvailable !== null && (
                            <Grid item xs={12}>
                                {isAvailable ? (
                                    <Alert severity="success">
                                        Session is available. Click below to confirm booking.
                                    </Alert>
                                ) : (
                                    <Alert severity="error">{error}</Alert>
                                )}
                            </Grid>
                        )}

                        {isAvailable && (
                            <Grid item xs={12}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    onClick={handleBooking}
                                >
                                    Confirm Booking
                                </Button>
                            </Grid>
                        )}

                        {bookingStatus === "success" && (
                            <Grid item xs={12}>
                                <Alert severity="success">Booking confirmed!</Alert>
                            </Grid>
                        )}
                        {bookingStatus === "error" && (
                            <Grid item xs={12}>
                                <Alert severity="error">Failed to confirm booking.</Alert>
                            </Grid>
                        )}
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default BookingForm;
