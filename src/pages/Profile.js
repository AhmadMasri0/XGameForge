import React, { useState } from 'react';
import {
    Container, Typography, Paper, Tabs, Tab,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import ChangePasswordForm from '../components/profile/ChangePassword';
import EditProfileForm from '../components/profile/EdttProfile';
import ViewOrders from '../components/profile/ViewOrders';
import AllOrders from '../components/profile/ViewAllOrders';

const UserProfile = () => {
    const [tab, setTab] = useState(0);
    const { user } = useAuth();

    const handleTabChange = (_, newValue) => {
        setTab(newValue);
    };

    return (
        <Container maxWidth="md" sx={{ my: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    My Profile
                </Typography>
                <Tabs textColor='primary'
                    value={tab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{
                        mb: 2,
                        '& .MuiTabs-flexContainer': {
                            flexWrap: { xs: 'nowrap', sm: 'wrap' }
                        }
                    }}
                >
                    <Tab label="Profile Details" />
                    <Tab label="Change Password" />
                    <Tab label="Order History" />
                    {user?.isAdmin && <Tab label="All orders" />}
                </Tabs>


                {tab === 0 && (
                    <EditProfileForm />
                )}

                {tab === 1 && (
                    <ChangePasswordForm />
                )}

                {tab === 2 && (
                    <ViewOrders />
                )}
                {tab === 3 && (
                    <AllOrders />
                )}
            </Paper>
        </Container>
    );
};

export default UserProfile;
