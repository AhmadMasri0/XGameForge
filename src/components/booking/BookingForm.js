import { useState } from "react";
import {
    Container, Paper, Grid, TextField, MenuItem,
    Button, Typography, Alert, CircularProgress
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";
import UnAuthBookingForm from "./UnAuthBookingForm";
const sessionTypes = ["VR", "Console", "PlayStation", "PC", "Other"];

const BookingForm = ({ setRerender }) => {
    const { isAuthenticated } = useAuth();
    const [form, setForm] = useState({
        sessionType: "VR", date: "",
        startTime: "", endTime: ""
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
            await api.post(`/api/bookings`, form);
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

    const BookingsInput = ({ label, name, value, subValue, props }) => {
        return <TextField sx={{ width: '150px' }}
            label={label} name={name} value={value}
            onChange={handleChange} fullWidth required  {...props}
        >
            {subValue}
        </TextField>
    };
    if (!isAuthenticated) {
        return <UnAuthBookingForm />;
    }
    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mb: 2 }}>
                <Typography variant="h5" mb={2}>Book a Gaming Session</Typography>
                <Grid container spacing={2} sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                    <Grid item xs={12}>
                        <BookingsInput label={"Session Type"} value={form.sessionType} name="sessionType" props={{ select: true }}
                            subValue={
                                sessionTypes.map(type => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))
                            } />
                    </Grid>
                    <Grid item xs={12}>
                        <BookingsInput label={"Date"} value={form.date} name="date"
                            props={{
                                type: "date",
                                inputProps: { min: new Date().toISOString().split("T")[0] },
                                InputLabelProps: { shrink: true }
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <BookingsInput label={"Start Time"} value={form.startTime} name="startTime"
                            props={{
                                type: "time",
                                InputLabelProps: { shrink: true }
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <BookingsInput label={"End Time"} value={form.endTime} name="endTime"
                            props={{
                                type: "time",
                                InputLabelProps: { shrink: true }
                            }}
                        />
                    </Grid>
                    <Button
                        sx={{ width: '200px', }}
                        variant="contained"
                        type="submit"
                        onClick={handleSubmit}
                        fullWidth
                        disabled={checking}
                    >
                        {checking ? <CircularProgress size={24} /> : "Check Availability"}
                    </Button>

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
                                variant="outlined" color=""
                                fullWidth onClick={handleBooking}
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
            </Paper>
        </Container>
    );
};

export default BookingForm;
