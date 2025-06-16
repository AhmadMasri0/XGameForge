import {
    Container, Typography, Grid, Box, Divider, Paper,
    Stack, CircularProgress,
} from "@mui/material";
import { LocalCafe, Fastfood, LocalBar, Restaurant, Category } from '@mui/icons-material';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { JSX, useEffect, useState } from "react";
import api from "../api/axios";
import MotionFade from "../components/common/MotionFade";
import AdminButton from "../components/common/AdminButton";
import BarCard from '../components/barCorner/BarCard';
import { BarItem } from "../types/types";



type CategoryType = keyof typeof icons;
type DisplayedItems = Record<CategoryType, BarItem[]>;

const icons = {
    Beverage: <LocalCafe />,
    Snack: <Fastfood />,
    Cocktail: <LocalBar />,
    Meal: <Restaurant />,
    Other: <Category />,
} as const;

const categories: CategoryType[] = ['Beverage', 'Snack', 'Cocktail', 'Meal', 'Other'];

const BarCorner = () => {
    const [menuItems, setMenuItems] = useState<BarItem[]>([]);
    const [displayedItems, setDisplayedItems] = useState<Partial<DisplayedItems>>({});
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const organizedItems: Partial<DisplayedItems> = {};
        
        categories.forEach(category => {
            const itemsForCategory = menuItems.filter(item => item.category === category);
            if (itemsForCategory.length > 0) {
                organizedItems[category] = itemsForCategory;
            }
        });

        setDisplayedItems(organizedItems);
    }, [menuItems]);

    useEffect(() => {
        const fetchBarItems = async () => {
            setIsLoading(true);
            try {
                const res = await api.get<BarItem[]>('/api/bar');
                setMenuItems(res.data);
            } catch (error) {
                console.error('Failed to fetch bar items:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchBarItems();
    }, []);

    const deleteBarItem = async (id: string) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');
        if (!isConfirmed) return;
        
        try {
            await api.delete(`/api/bar/${id}`);
            alert('Item deleted successfully');
            setMenuItems(prev => prev.filter(item => item._id !== id));
        } catch (err) {
            console.error('Failed to delete the item:', err);
            alert('Failed to delete the item');
        }
    };

    const renderMenuSection = (title: CategoryType, icon: JSX.Element, items: BarItem[]) => (
        <MotionFade>
            <Box sx={{ my: 6 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    {icon} {title}
                </Typography>
                <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                    {items.map((item) => (
                        <BarCard 
                            key={item._id}
                            item={item} 
                            icon={icon} 
                            deleteBarItem={deleteBarItem} 
                        />
                    ))}
                </Grid>
            </Box>
        </MotionFade>
    );

    return (
        <Container maxWidth="lg" sx={{ my: 6 }}>
            <Paper elevation={2} sx={{ p: 4, textAlign: "center", mb: 6 }}>
                <Typography variant="h3" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '26px', md: '40px' } }}>
                    🍻 GameFuel Station – Where Every Gamer Refuels
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Take a break, grab a bite, and power through your next session!
                </Typography>
            </Paper>

            <Divider sx={{ mb: 4 }} />
            
            {user?.isAdmin && (
                <Container sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                    <AdminButton 
                        onClick={() => navigate("/bar/create")} 
                        style={{ mb: 2 }} 
                        title={'Add Item'} 
                    />
                </Container>
            )}

            {isLoading ? (
                <Stack alignItems="center" sx={{ mt: 6 }}>
                    <CircularProgress color="primary" />
                </Stack>
            ) : (
                categories.map((category) => {
                    const items = displayedItems[category];
                    return items && items.length > 0 
                        ? renderMenuSection(category, icons[category], items) 
                        : null;
                })
            )}
        </Container>
    );
};

export default BarCorner;