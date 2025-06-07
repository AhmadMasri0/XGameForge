import { useState } from 'react';
import {
    Container, Typography, Paper, Tabs, Tab,
    useTheme,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import ChangePasswordForm from '../components/profile/ChangePassword';
import EditProfileForm from '../components/profile/EdttProfile';
import ViewOrders from '../components/profile/ViewOrders';
import AllOrders from '../components/profile/ViewAllOrders';

const UserProfile = () => {
    const [tab, setTab] = useState(0);
    const { user } = useAuth();
    const theme = useTheme();

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
                    <Tab label="Profile Details" sx={{ color: tab === 0 ? `${theme.customColors.activeTab} !important` : theme.customColors.inactiveTab }} />
                    <Tab label="Change Password" sx={{ color: tab === 1 ? `${theme.customColors.activeTab} !important` : theme.customColors.inactiveTab }} />
                    <Tab label="Order History" sx={{ color: tab === 2 ? `${theme.customColors.activeTab} !important` : theme.customColors.inactiveTab }} />
                    {user?.isAdmin && <Tab label="All orders" sx={{ color: tab === 3 ? `${theme.customColors.activeTab} !important` : theme.customColors.inactiveTab }} />}
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
