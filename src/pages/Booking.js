import { useState } from "react";
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
        <Typography variant="h4" textAlign="center" gutterBottom>
            Book Your Gaming Experience – Seamless Reservations Await!
        </Typography>
        <Typography variant="subtitle1" textAlign="center" color="textSecondary" sx={{ mb: 3 }}>
            Secure your spot for an immersive console or VR session. Plan ahead and avoid the wait – it's fast, easy, and flexible.
        </Typography>



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
