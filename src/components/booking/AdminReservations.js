import { useEffect, useState } from "react";
import {
    Container, Typography, Table, TableHead, TableBody,
    TableRow, TableCell, Paper, TableContainer, Select,
    MenuItem, FormControl, InputLabel, Pagination, Stack,
    TableSortLabel, TextField, Box
} from "@mui/material";
import api from "../../api/axios";

const AdminReservations = ({ rerender, setRerender }) => {
    const [bookings, setBookings] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "date", direction: "asc" });

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
        let list = [...bookings];

        if (statusFilter !== "all") {
            list = list.filter(b => b.status === statusFilter);
        }

        if (search.trim()) {
            const s = search.toLowerCase();
            list = list.filter(
                b =>
                    b.user?.username?.toLowerCase().includes(s) ||
                    b.user?.email?.toLowerCase().includes(s) ||
                    b.sessionType?.toLowerCase().includes(s)
            );
        }

        if (sortConfig.key) {
            list.sort((a, b) => {
                const valA = a[sortConfig.key];
                const valB = b[sortConfig.key];
                if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
                if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
                return 0;
            });
        }

        setFiltered(list);
        setPage(1);
    }, [bookings, statusFilter, search, sortConfig]);

    const handleSort = (column) => {
        setSortConfig(prev => ({
            key: column,
            direction: prev.key === column && prev.direction === "asc" ? "desc" : "asc"
        }));
    };

    const updateReservation = async (id, isCancel = false) => {
        const confirmed = window.confirm(`Are you sure you want to ${isCancel ? 'cancel' : 'delete'} this reservation?`);
        if (!confirmed) return;
        try {

            const url = `/api/bookings/admin/${isCancel ? 'cancel' : 'delete'}/${id}`;
            await api.delete(url);
            setRerender(pre => !pre);
        } catch (err) {
            console.error(`Failed to ${isCancel ? 'cancel' : 'delete'}`, err);
        }
    }
    const paginated = filtered.slice((page - 1) * BOOKINGS_PER_PAGE, page * BOOKINGS_PER_PAGE);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>All Reservations</Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, gap: 2, flexWrap: 'wrap' }}>
                <FormControl sx={{ minWidth: 200 }}>
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

                <TextField
                    label="Search by name, email or session type"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ flex: 1, minWidth: 240 }}
                />
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {["username", "email", "date", "startTime", "endTime", "sessionType", "status", "Cancel", "Delete"].map((col, i) => (
                                <TableCell
                                    key={i}
                                    sortDirection={sortConfig.key === col ? sortConfig.direction : false}
                                    sx={{ textAlign: 'center' }}
                                >
                                    <TableSortLabel
                                        active={sortConfig.key === col}
                                        direction={sortConfig.key === col ? sortConfig.direction : "asc"}
                                        onClick={() => handleSort(col)}
                                    >
                                        {col.charAt(0).toUpperCase() + col.slice(1)}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
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
                                <TableCell sx={{ textAlign: 'center' }}>{booking.sessionType}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{booking.status}</TableCell>
                                <TableCell sx={{
                                    textAlign: 'center',
                                    "&:hover": {
                                        textDecoration: booking.status === 'upcoming' ? 'underline' : 'none',
                                        cursor: booking.status === 'upcoming' ? 'pointer' : 'auto',
                                        color: booking.status === 'upcoming' ? 'red' : 'inherit'
                                    }
                                }} onClick={() => booking.status === 'upcoming' && updateReservation(booking._id, true  )}>
                                    {booking.status === 'upcoming' ? 'Cancel' : '-'}
                                </TableCell>
                                <TableCell sx={{
                                    textAlign: 'center',
                                    "&:hover": {
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                        color: 'red'
                                    }
                                }} onClick={() => updateReservation(booking._id)}>
                                    {'Delete'}
                                </TableCell>
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
