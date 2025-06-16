import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import {
    TextField, Button, Typography, Box, Paper,
    useTheme
} from '@mui/material';
import api from '../../api/axios';
import { AxiosError, AxiosResponse } from 'axios';

interface ApiResponse {
    message?: string;
    error?: string;
}

const ChangePasswordForm: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const theme = useTheme();

    useEffect(() => {
        if (confirmPassword !== newPassword) {
            setError('New password and confirm password must match.');
        } else {
            setError('');
        }
    }, [newPassword, confirmPassword]);

    const handleChangePassword = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        setMessage('');
        setError('');

        try {
            const res: AxiosResponse<ApiResponse> = await api.put(
                '/api/user/change-password', 
                { currentPassword, newPassword, confirmPassword }
            );

            setMessage(res.data.message || 'Password updated successfully');
            
            setTimeout(() => {
                setMessage('');
            }, 3000);
            
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            const axiosError = err as AxiosError<ApiResponse>;
            setError(
                axiosError.response?.data?.error || 
                'Failed to update password. Please try again.'
            );
        }
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
        (e: ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
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
                    onChange={handleInputChange(setCurrentPassword)}
                />
                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    required
                    margin="normal"
                    value={newPassword}
                    onChange={handleInputChange(setNewPassword)}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    required
                    margin="normal"
                    value={confirmPassword}
                    onChange={handleInputChange(setConfirmPassword)}
                />
                {error && <Typography color="error" mt={1}>{error}</Typography>}
                {message && <Typography color="success.main" mt={1}>{message}</Typography>}
                <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth
                    sx={{ 
                        mt: 2, 
                        border: theme.palette.mode === 'light' ? '' : '1px solid gray' 
                    }}
                    disabled={
                        !currentPassword || 
                        !newPassword || 
                        !confirmPassword || 
                        confirmPassword !== newPassword
                    }
                >
                    Update Password
                </Button>
            </Box>
        </Paper>
    );
};

export default ChangePasswordForm;