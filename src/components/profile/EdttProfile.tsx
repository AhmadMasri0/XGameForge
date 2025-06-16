import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import {
    TextField, Button, Typography, Box, Paper
} from '@mui/material';
import api from '../../api/axios';
import { useAuth } from '../../contexts/AuthContext';
import { AxiosError, AxiosResponse } from 'axios';
import { User } from '../../types/types';

interface ApiUserResponse {
    user: {
        username?: string;
        email?: string;
        phone?: string;
    };
    message?: string;
    error?: string;
}

const EditProfile: React.FC = () => {
    const [formData, setFormData] = useState<User>({ 
        username: '', 
        email: '', 
        phone: '' 
    });
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { setUser } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data }: AxiosResponse<ApiUserResponse> = await api.get('/api/user/me');
                setFormData({
                    username: data.user.username || '',
                    email: data.user.email || '',
                    phone: data.user.phone || ''
                });
            } catch (err) {
                setError('Failed to load user info.');
                console.error('Error fetching user data:', err);
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');
        setError('');
        
        try {
            const { data }: AxiosResponse<ApiUserResponse> = await api.put(
                '/api/user/editprofile', 
                formData
            );
            
            if (data.user && setUser) {
                console.log(data.user);
                setUser(data.user);
            }
            
            setMessage(data.message || 'Profile updated successfully');
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } catch (err) {
            const axiosError = err as AxiosError<ApiUserResponse>;
            setError(
                axiosError.response?.data?.error || 
                'Failed to update profile. Please try again.'
            );
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
                {error && (
                    <Typography color="error" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}
                {message && (
                    <Typography color="success.main" sx={{ mt: 1 }}>
                        {message}
                    </Typography>
                )}
                <Button 
                    type="submit" 
                    variant="contained" 
                    sx={{ mt: 2 }} 
                    fullWidth
                >
                    Save Changes
                </Button>
            </Box>
        </Paper>
    );
};

export default EditProfile;