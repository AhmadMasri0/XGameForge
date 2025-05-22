import { useContext, useState } from "react";
import {
    AppBar, Box, Toolbar, Typography, IconButton,
    Button, Drawer, List, ListItem, ListItemText, Switch, Badge
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { ColorModeContext } from "../../contexts/ThemeContext";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/logo.png";
import { useAuth } from "../../contexts/AuthContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../contexts/CartContext";
import CartPopover from "./CartPopover";

export default function Header() {
    const theme = useTheme();
    const location = useLocation();
    const { toggleColorMode } = useContext(ColorModeContext);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();
    const { cartItems, removeFromCart } = useCart();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleCartHover = (event) => setAnchorEl(event.currentTarget);
    const handleCartClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    const toggleDrawer = () => setMobileOpen((prev) => !prev);

    let navItems = [
        { name: "Booking", path: "/booking" },
        { name: "Shop", path: "/shop" },
        { name: "Bar Corner", path: "/bar" },
        { name: "About Us", path: "/about" },
    ];
    if (!isAuthenticated) {
        navItems = [...navItems, { name: "Login", path: "/login" }]
    } else {
        navItems = [...navItems, { name: user.username, path: "/profile" }, { name: 'Logout', path: 'logout' }]

    }

    const drawer = (
        <Box onClick={toggleDrawer} sx={{ textAlign: "center" }}>
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
                        selected={location.pathname === item.path}

                    >
                        <ListItemText primary={item.name} sx={{
                            color: location.pathname === item.path ? theme.customColors.activelink : theme.customColors.inactivelink,
                            '&:hover': {
                                color: theme.customColors.activelink
                            }
                        }} />
                    </ListItem> : null
                ))}
                {/* <Switch onChange={toggleColorMode} /> */}
                <ListItem component={Link} to="/cart" onClick={toggleDrawer}>
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
    );

    return (
        <>
            <AppBar component="nav" position="static">
                <Toolbar>
                    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, }}                    >
                        <img src={logo} alt="logo" style={{ height: 40, marginRight: 8 }} />
                        <Typography variant="h6" fontWeight={700} component={Link}
                            to="/" sx={{
                                textDecoration: "none",
                                color: "inherit",
                                '&:hover': {
                                    color: theme.customColors.activelink
                                }
                            }}>
                            XGameForge
                        </Typography>
                    </Box>

                    <Box sx={{
                        display: { xs: "none", sm: "flex" },
                        gap: 2, flexWrap: 'wrap', justifyContent: 'flex-end'
                    }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.name}
                                component={Link}
                                to={item.path}
                                sx={{
                                    fontWeight: location.pathname === item.path ? 700 : 400,
                                    color: location.pathname === item.path ? theme.customColors.activelink : 'inherit',
                                    '&:hover': {
                                        color: theme.customColors.activelink
                                    }
                                }}
                            >
                                {item.name}
                            </Button>
                        ))}
                        <IconButton
                            color="inherit"
                            // onClick={handleCartHover}
                            onMouseEnter={handleCartHover}
                            // onMouseLeave={handleCartClose}
                            sx={{ position: "relative", marginLeft: 2 }}
                        >
                            <Badge badgeContent={cartItems.length || '0'} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>


                        <CartPopover anchorEl={anchorEl} onClose={handleCartClose} cartItems={cartItems} removeItem={removeFromCart} />

                        {/* <Switch onChange={toggleColorMode} /> */}
                    </Box>

                    <IconButton
                        color="inherit"
                        edge="end"
                        sx={{ display: { sm: "none" } }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { width: 240 },
                }} >
                {drawer}
            </Drawer >
        </>
    );
}
