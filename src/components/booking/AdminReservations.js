import React, { useEffect, useState } from "react";
import {
    Container, Typography, Table, TableHead, TableBody,
    TableRow, TableCell, Paper, TableContainer, Select,
    MenuItem, FormControl, InputLabel, Pagination, Stack
} from "@mui/material";
import api from "../../api/axios";

const AdminReservations = ({ rerender, setRerender }) => {
    const [bookings, setBookings] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);

    const BOOKINGS_PER_PAGE = 5;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await api.get("/api/bookings/all");
                setBookings(res.data);
            } catch (err) {
                console.error("Error loading bookings", err);
            }
        };
        fetchBookings();
    }, [rerender]);

    useEffect(() => {
        let list = bookings;
        if (statusFilter !== "all") {
            list = bookings.filter(b => b.status === statusFilter);
        }
        setFiltered(list);
        setPage(1);
    }, [bookings, statusFilter]);

    const paginated = filtered.slice((page - 1) * BOOKINGS_PER_PAGE, page * BOOKINGS_PER_PAGE);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>All Reservations</Typography>

            <FormControl sx={{ my: 2, minWidth: 200 }}>
                <InputLabel>Status</InputLabel>
                <Select
                    value={statusFilter}
                    label="Status"
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="upcoming">Upcoming</MenuItem>
                    <MenuItem value="inprogress">In-progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
            </FormControl>

            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ textAlign: 'center' }}>User</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Email</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Date</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Start</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>End</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Session Type</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginated.map((booking) => (
                            <TableRow key={booking._id}>
                                <TableCell sx={{ textAlign: 'center' }}>{booking.user?.username}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{booking.user?.email}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{booking.date}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{booking.startTime}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{booking.endTime}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }} >{booking.sessionType}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{booking.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack alignItems="center" sx={{ mt: 3 }}>
                <Pagination
                    count={Math.ceil(filtered.length / BOOKINGS_PER_PAGE)}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                />
            </Stack>
        </Container>
    );
};

export default AdminReservations;
