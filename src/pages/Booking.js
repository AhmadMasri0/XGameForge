import React, { useState } from "react";
import {
    Container, Typography, Accordion,
    AccordionSummary, AccordionDetails
} from "@mui/material";
import BookingForm from "../components/booking/BookingForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ViewBookings from "../components/booking/ViewBookings";
import { useAuth } from "../contexts/AuthContext";
import AdminReservations from "../components/booking/AdminReservations";

const BookingPage = () => {

    const { user, isAuthenticated } = useAuth();
    const [rerender, setRerender] = useState(false);


    return <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Booking and reservations</Typography>

        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Reserve a new seesion</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <BookingForm rerender={rerender} setRerender={setRerender} />
            </AccordionDetails>
        </Accordion>

        {isAuthenticated && <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">View previous reservations</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ViewBookings rerender={rerender} setRerender={setRerender} />
            </AccordionDetails>
        </Accordion>}
        {isAuthenticated && user.isAdmin && <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">All reservations</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <AdminReservations rerender={rerender} setRerender={setRerender} />
            </AccordionDetails>
        </Accordion>}
    </Container>
};

export default BookingPage;
