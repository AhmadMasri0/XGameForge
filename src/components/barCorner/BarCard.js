import { Box, Button, Card, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { API_URL } from "../../api/axios";
import { useNavigate } from "react-router-dom";



const BarCard = ({ item, icon, deleteBarItem }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return <Card
        sx={{
            width: { xs: '80%', sm: '250px' },
            maxWidth: '250px',
            height: 350,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            '&:hover': {
                transform: "translateY(-5px)",
                boxShadow: 6,
            },
        }}
    >
        <CardMedia
            component="img"
            image={API_URL + item.image}
            alt={item.name}
            sx={{
                height: 160,
                objectFit: "cover",
            }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={600}>
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
        {user.isAdmin &&
            <Box sx={{ px: 2, pb: 2 }}>
                <Button variant="contained" color="info" sx={{ marginBottom: '5px' }} fullWidth onClick={() => navigate('/bar/edit/' + item._id)}>
                    Edit item
                </Button>
                <Button variant="contained" color="secondary" fullWidth onClick={() => deleteBarItem(item._id)}>
                    Remove item
                </Button>
            </Box>}
    </Card>
}

export default BarCard;