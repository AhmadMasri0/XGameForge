import React, { useState } from "react";
import {
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TimeSlotGrid from "./TimeSlotGrid";

const gameTypes = ["PlayStation", "VR", "PC", "Racing Rig"];

const BookingForm = () => {
    const [date, setDate] = useState(new Date());
    const [gameType, setGameType] = useState("");
    const [timeSlot, setTimeSlot] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!gameType || !timeSlot) return;
        alert(`Booking confirmed for ${gameType} on ${date.toDateString()} at ${timeSlot}`);
    };

    const isFormValid = gameType && timeSlot;

    return (
        <form onSubmit={handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={12} sm={6}>
                        <DatePicker
                            label="Select Date"
                            value={date}
                            minDate={new Date()}
                            onChange={(newValue) => setDate(newValue)}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth sx={{ width: '150px' }}>
                            <InputLabel>Game Type</InputLabel>
                            <Select
                                value={gameType}
                                onChange={(e) => setGameType(e.target.value)}
                                label="Game Type"
                            >
                                {gameTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            Select a Time Slot
                        </Typography>
                        <TimeSlotGrid selectedSlot={timeSlot} onSelect={setTimeSlot} />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth disabled={!isFormValid}>
                            Confirm & Reserve
                        </Button>
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </form>
    );
};

export default BookingForm;