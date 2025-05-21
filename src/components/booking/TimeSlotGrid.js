import React from "react";
import { Grid, Button } from "@mui/material";

const hours = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM"
];

const getUnavailableSlots = () => {
  const indices = new Set();
  while (indices.size < 3) {
    indices.add(Math.floor(Math.random() * hours.length));
  }
  return Array.from(indices).map(i => hours[i]);
};

const TimeSlotGrid = ({ selectedSlot, onSelect }) => {
  const unavailableSlots = getUnavailableSlots();

  return (
    <Grid container spacing={1}>
      {hours.map((time) => {
        const isUnavailable = unavailableSlots.includes(time);
        const isSelected = time === selectedSlot;

        return (
          <Grid item xs={6} sm={4} key={time}>
            <Button
              fullWidth
              variant={isSelected ? "contained" : "outlined"}
              color={isUnavailable ? "error" : isSelected ? "primary" : "inherit"}
              disabled={isUnavailable}
              onClick={() => onSelect(time)}
            >
              {time}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TimeSlotGrid;