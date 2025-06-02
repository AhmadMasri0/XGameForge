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

    const sections = [
        {
            component: <BookingForm rerender={rerender} setRerender={setRerender} />,
            title: 'Reserve a new seesion',
            defaultExpanded: true
        },
        {
            component: <ViewBookings rerender={rerender} setRerender={setRerender} />,
            title: 'View previous reservations',
            isAuthenticated,
        },
        {
            component: <AdminReservations rerender={rerender} setRerender={setRerender} />,
            title: 'All reservations',
            isAuthenticated,
            isAdmin: user?.isAdmin
        }
    ]

    return <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Booking and reservations</Typography>


        {sections.map((section) => {
            if ('isAuthenticated' in section && !section['isAuthenticated']) {
                return;
            }
            if ('isAdmin' in section && !section['isAdmin']) {
                return;
            }

            return <Accordion defaultExpanded={section.defaultExpanded}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">{section.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {section.component}
                </AccordionDetails>
            </Accordion>
        })}

    </Container>
};

export default BookingPage;
