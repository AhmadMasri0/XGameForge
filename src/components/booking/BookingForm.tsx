import { useState, ChangeEvent, FormEvent } from "react";
import {
    Container, Paper, Grid, TextField,
    MenuItem, Button, Typography, Alert,
    CircularProgress,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";
import UnAuthBookingForm from "./UnAuthBookingForm";
import { Booking } from "../../types/types";

const sessionTypes = ["VR", "Console", "PlayStation", "PC", "Other"];

interface BookingFormProps {
    setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}



const BookingForm = ({ setRerender }: BookingFormProps) => {
    const { isAuthenticated } = useAuth();
    const [form, setForm] = useState<Booking>({
        sessionType: "VR",
        date: "",
        startTime: "",
        endTime: "",
    });

    const [checking, setChecking] = useState<boolean>(false);
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const [bookingStatus, setBookingStatus] = useState<"success" | "error" | null>(null);
    const [error, setError] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setIsAvailable(null);
        setBookingStatus(null);
    };

    const checkAvailability = async () => {
        setChecking(true);
        setIsAvailable(null);
        try {
            const { sessionType, date, startTime, endTime } = form;
            const res = await api.get("/api/bookings/check", {
                params: { sessionType, date, startTime, endTime },
            });
            setIsAvailable(res.data.available);
        } catch (err: any) {
            console.error(err?.response?.data?.error);
            setError(err?.response?.data?.error);
            setIsAvailable(false);
        } finally {
            setChecking(false);
        }
    };

    const handleBooking = async () => {
        try {
            await api.post("/api/bookings", form);
            setBookingStatus("success");
            setRerender((prev) => !prev);
            setTimeout(() => {
                setBookingStatus(null);
                setIsAvailable(null);
            }, 3000);
        } catch (err: any) {
            console.error(err?.response?.data?.error);
            setError(err?.response?.data?.error);
            setBookingStatus("error");
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement> | React.MouseEvent) => {
        e.preventDefault();
        if (form.startTime >= form.endTime) {
            return alert("Start time must be earlier than end time.");
        } else if (new Date(`${form.date} ${form.endTime}`) <= new Date()) {
            return alert("Please select future date and time.");
        }
        await checkAvailability();
    };

    const BookingsInput = ({
        label, name, value, subValue, props = {},
    }: {
        label: string;
        name: keyof Booking;
        value: string;
        subValue?: React.ReactNode;
        props?: any;
    }) => {
        return (
            <TextField
                sx={{ width: "150px" }}
                label={label}
                name={name}
                value={value}
                onChange={handleChange}
                fullWidth
                required
                {...props}
            >
                {subValue}
            </TextField>
        );
    };

    if (!isAuthenticated) {
        return <UnAuthBookingForm />;
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mb: 2 }}>
                <Typography variant="h5" mb={2}>
                    Book a Gaming Session
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Grid>
                            <BookingsInput
                                label="Session Type"
                                name="sessionType"
                                value={form.sessionType}
                                props={{ select: true }}
                                subValue={sessionTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            />
                        </Grid>
                        <Grid >
                            <BookingsInput
                                label="Date"
                                name="date"
                                value={form.date}
                                props={{
                                    type: "date",
                                    inputProps: { min: new Date().toISOString().split("T")[0] },
                                    InputLabelProps: { shrink: true },
                                }}
                            />
                        </Grid>
                        <Grid >
                            <BookingsInput
                                label="Start Time"
                                name="startTime"
                                value={form.startTime}
                                props={{
                                    type: "time",
                                    InputLabelProps: { shrink: true },
                                }}
                            />
                        </Grid>
                        <Grid >
                            <BookingsInput
                                label="End Time"
                                name="endTime"
                                value={form.endTime}
                                props={{
                                    type: "time",
                                    InputLabelProps: { shrink: true },
                                }}
                            />
                        </Grid>

                        <Grid >
                            <Button
                                sx={{ width: "200px" }}
                                variant="contained"
                                type="submit"
                                fullWidth
                                disabled={checking}
                            >
                                {checking ? <CircularProgress size={24} /> : "Check Availability"}
                            </Button>
                        </Grid>

                        {isAvailable !== null && (
                            <Grid >
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
                            <Grid >
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={handleBooking}
                                >
                                    Confirm Booking
                                </Button>
                            </Grid>
                        )}

                        {bookingStatus === "success" && (
                            <Grid >
                                <Alert severity="success">Booking confirmed!</Alert>
                            </Grid>
                        )}
                        {bookingStatus === "error" && (
                            <Grid >
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
