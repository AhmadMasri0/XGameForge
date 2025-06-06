import { Box, Button, Card, CardContent, CardMedia, Chip, Container, Stack, Typography, useTheme } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { API_URL } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import AdminButton from "../common/AdminButton";
import CustomCard from "../common/CustomCard";



const BarCard = ({ item, icon, deleteBarItem }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();

    const Buttons = user?.isAdmin ?
        <Box sx={{ px: 2, pb: 2 }}>
            <AdminButton color={'info'} style={{ marginBottom: '5px' }} props={{ fullWidth: true }}
                onClick={() => navigate('/bar/edit/' + item._id)} title={'Edit Item'} />
            <AdminButton color={'secondary'} style={{ marginBottom: '5px' }} props={{ fullWidth: true }}
                onClick={() => deleteBarItem(item._id)} title={'Remove Item'} />
        </Box> : null


    const content = <CardContent sx={{ flexGrow: 1, }} color={theme.customColors.primary}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={600} sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden', height: '30px', whiteSpace: 'nowrap'
            }}>
                {item.name}
            </Typography>
            <Chip
                label={item.Category}
                icon={icon}
                size="small"
                color="primary"
            />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {item.description}
        </Typography>
    </CardContent>

    return <CustomCard imgAlt={item.name} imgSrc={item.image} Buttons={Buttons} content={content} />
}

export default BarCard;