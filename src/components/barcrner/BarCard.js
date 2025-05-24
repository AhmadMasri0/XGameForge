import { Box, Button, Card, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";

import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';

const BarCard = ({ item }) => {

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
            image={item.image}
            alt={item.name}
            sx={{
                height: 160,
                // objectFit: "cover",
            }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={600}>
                    {item.name}
                </Typography>
                <Chip
                    label={item.type}
                    icon={item.type === "Food" ? <RestaurantMenuIcon /> : <LocalCafeIcon />}
                    size="small"
                    color="primary"
                />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {item.description}
            </Typography>
        </CardContent>
        <Box sx={{ px: 2, pb: 2 }}>
            <Button variant="contained" color="secondary" fullWidth>
                Order Now
            </Button>
        </Box>
    </Card>
}

export default BarCard;