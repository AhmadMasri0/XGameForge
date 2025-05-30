import { useEffect, useState } from 'react';
import {
    TextField, Button, Typography, Box, Paper
} from '@mui/material';
import api from '../../api/axios';
import { SetMealRounded } from '@mui/icons-material';

const ChangePasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (confirmPassword !== newPassword) {
            setError('New password and confirm passwrd must match.')
        } else {
            setError('');
        }

    }, [newPassword, confirmPassword]);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        setMessage('');
        setError('');
        try {
            const res = await api.put('/api/user/change-password', { currentPassword, newPassword, confirmPassword });

            setMessage(res.data.message);
            setTimeout(() => {
                setMessage('')
            }, [3000])
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update password');
        }
    };

    return (
        <Paper sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 4 }}>
            <Typography variant="h6" mb={2}>Change Password</Typography>
            <Box component="form" onSubmit={handleChangePassword}>
                <TextField
                    label="Current Password"
                    type="password"
                    fullWidth
                    required
                    margin="normal"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    required
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    required
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <Typography color="error" mt={1}>{error}</Typography>}
                {message && <Typography color="success.main" mt={1}>{message}</Typography>}
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}
                    disabled={currentPassword === '' || newPassword === '' || confirmPassword === '' || confirmPassword !== newPassword}>
                    Update Password
                </Button>
            </Box>
        </Paper>
    );
};

export default ChangePasswordForm;
