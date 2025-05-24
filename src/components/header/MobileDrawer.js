import { Box, Drawer, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../contexts/CartContext";
import logo from "../../assets/logo.png";

const MobileDrawer = ({ toggleDrawer, navItems, mobileOpen }) => {
    const theme = useTheme();
    const { cartItems } = useCart();


    return <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}
        sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: 240 },
        }} ><Box onClick={toggleDrawer} sx={{ textAlign: "center" }}>
            <Box component={Link}
                to="/" sx={{
                    display: "flex", justifyContent: "center", alignItems: "center", my: 2, cursor: 'pointer',
                    textDecoration: "none",
                }}>
                <img src={logo} alt="logo" style={{ height: 32, marginRight: 8 }} />
                <Typography variant="h6">XGameForge</Typography>
            </Box>

            <List>
                {navItems.map((item) => (
                    item ? <ListItem
                        key={item.name}
                        component={Link}
                        to={item.path}
                        selected={window.location.pathname === item.path}
                    >
                        <ListItemText primary={item.name} sx={{
                            color: window.location.pathname === item.path ? theme.customColors.activelink : theme.customColors.inactivelink,
                            '&:hover': {
                                color: theme.customColors.activelink
                            }
                        }} />
                    </ListItem> : null
                ))}
                {/* <Switch onChange={toggleColorMode} /> */}
                <ListItem component={Link} to="/cart">
                    <ListItemText
                        primary={
                            <>
                                <ShoppingCartIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                                Cart ({cartItems.length})
                            </>
                        }
                    />
                </ListItem>

            </List>
        </Box>
    </Drawer>;
}

export default MobileDrawer;