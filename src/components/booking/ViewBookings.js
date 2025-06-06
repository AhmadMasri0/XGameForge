import { useEffect, useState } from "react";
import {
    Container, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, TablePagination, Tabs, Tab, Chip
} from "@mui/material";
import dayjs from "dayjs";
import api from "../../api/axios";
import utc from 'dayjs/plugin/utc';

const rowsPerPage = 5;

const MyBookings = ({ rerender, setRerender }) => {
    dayjs.extend(utc)
    const [bookings, setBookings] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [tab, setTab] = useState("upcoming");
    const [page, setPage] = useState(0);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await api.get("/api/bookings");
                setBookings(res.data || []);
            } catch (err) {
                console.error("Failed to fetch bookings", err);
            }
        };
        fetchBookings();
    }, [rerender]);

    useEffect(() => {
        const filtered = bookings.filter(b =>
            tab === 'past' ?
                b.status === 'completed' || b.status === 'cancelled' :
                b.status === tab);
        setFiltered(filtered);
        setPage(0);
    }, [tab, bookings]);

    const handleCancel = async (id) => {
        const confirmed = window.confirm("Are you sure you want to cancel this reservation?");
        if (!confirmed) return;
        try {
            await api.delete(`/api/bookings/cancel/${id}`);
            setBookings(prev =>
                prev.map(b => b._id === id ? { ...b, status: "cancelled" } : b)
            );
            setRerender(pre => !pre)
        } catch (err) {
            console.error("Failed to cancel", err);
        }
    };


    const getStatusChip = (status) => {
        const color = status === "cancelled" ? "default"
            : status === "upcoming" ? "primary"
                : status === "inprogress" ? "info"
                    : "secondary";
        return <Chip label={status.toUpperCase()} color={color} size="small" />;
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>My Bookings</Typography>


            <Tabs value={tab} onChange={(_, val) => setTab(val)} sx={{
                mb: 2, '& .MuiTabs-flexContainer': {
                    flexWrap: { xs: 'nowrap', sm: 'wrap' }
                }
            }} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile>
                <Tab value="upcoming" label="Upcoming"/>
                <Tab value="inprogress" label="In-progress" />
                <Tab value="past" label="Completed / Cancelled" />
            </Tabs>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ textAlign: 'center' }}>Date</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Start</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>End</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Session</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtered
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(b => (
                                <TableRow key={b._id}>
                                    <TableCell sx={{ textAlign: 'center' }}>{dayjs(b.date).format("YYYY-MM-DD")}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{b.startTime}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{b.endTime}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{b.sessionType}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{getStatusChip(b.status)}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        {b.status === "upcoming" && (
                                            <Button color="error" onClick={() => handleCancel(b._id)} size="small">Cancel</Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>

                <TablePagination
                    component="div"
                    count={filtered.length}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[rowsPerPage]}
                />
            </TableContainer>
        </Container>
    );
};

export default MyBookings;