import { useState, useEffect } from 'react';
import {
    TextField, Button, Typography, Box, Paper
} from '@mui/material';
import api from '../../api/axios';
import { useAuth } from '../../contexts/AuthContext';

const EditProfileForm = () => {
    const [formData, setFormData] = useState({ username: '', email: '', phone: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await api.get('/api/user/me'); 
                setFormData({
                    username: data.user.username || '',
                    email: data.user.email || '',
                    phone: data.user.phone || ''
                });
            } catch (err) {
                setError('Failed to load user info.');
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const { data } = await api.put('/api/user/editprofile', formData);
            setUser(data.user)
            setMessage('Profile updated successfully');
            setTimeout(() => {
                setMessage('')
            }, [3000])
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update profile');
        }
    };

    return (
        <Paper sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 4 }}>
            <Typography variant="h6" mb={2}>Edit Profile</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    name="username"
                    label="Name"
                    fullWidth
                    margin="normal"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="email"
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                />
                <TextField
                    name="phone"
                    label="Phone"
                    fullWidth
                    margin="normal"
                    value={formData.phone}
                    onChange={handleChange}
                />
                {error && <Typography color="error">{error}</Typography>}
                {message && <Typography color="success.main">{message}</Typography>}
                <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
                    Save Changes
                </Button>
            </Box>
        </Paper>
    );
};

export default EditProfileForm;
