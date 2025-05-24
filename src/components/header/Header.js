import { useContext, useState } from "react";
import {
    AppBar, Box, Toolbar, Typography, IconButton,
    Button, Badge
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
// import { ColorModeContext } from "../../contexts/ThemeContext";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/logo.png";
import { useAuth } from "../../contexts/AuthContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../contexts/CartContext";
import CartPopover from "./CartPopover";
import MobileDrawer from "./MobileDrawer";

const Header = () => {
    const theme = useTheme();
    const location = useLocation();
    // const { toggleColorMode } = useContext(ColorModeContext);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, isAuthenticated } = useAuth();
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

    return (
        <>
            <AppBar component="nav" position="static">
                <Toolbar>
                    <Box
                        sx={{
                            width: '100%', maxWidth: 'lg', mx: 'auto',
                            px: 2, display: 'flex', alignItems: 'center',
                            justifyContent: 'space-between', flexWrap: 'wrap', flexDirection: {
                                xs: 'row',
                                sm: 'column',
                                md: 'row'

                            }
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, }}>
                            <img src={logo} alt="logo" style={{ height: 40, marginRight: 8 }} />
                            <Typography
                                variant="h6" fontWeight={700}
                                component={Link} to="/"
                                sx={{
                                    textDecoration: "none",
                                    // width: '',
                                    color: "inherit",
                                    '&:hover': { color: theme.customColors.activelink }
                                }}
                            >
                                XGameForge
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: { xs: "none", sm: "flex" },
                                gap: 2,
                                flexWrap: 'wrap',
                                justifyContent: {
                                    sm: 'center',
                                    md: 'flex-end'
                                }
                            }}
                        >
                            {navItems.map((item, index) => {
                                return <><Button
                                    key={item.name}
                                    component={Link}
                                    to={item.path}
                                    sx={{
                                        fontWeight: location.pathname === item.path ? 700 : 400,
                                        color: location.pathname === item.path ? theme.customColors.activelink : 'inherit',
                                        '&:hover': { color: theme.customColors.activelink }
                                    }}
                                >
                                    {item.name}
                                </Button>
                                    {index === 4 && <IconButton
                                        color="inherit"
                                        onMouseEnter={handleCartHover}
                                        sx={{ position: "relative", marginLeft: 2 }}
                                    >
                                        <Badge badgeContent={cartItems.length || '0'} color="secondary">
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </IconButton>}
                                </>

                            })}


                            <CartPopover anchorEl={anchorEl} onClose={handleCartClose} cartItems={cartItems} removeItem={removeFromCart} />
                        </Box>

                        <IconButton
                            color="inherit"
                            edge="end"
                            sx={{ display: { sm: "none" } }}
                            onClick={toggleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <MobileDrawer navItems={navItems} cartItems={cartItems} toggleDrawer={toggleDrawer} mobileOpen={mobileOpen} />
        </>
    );
}
export default Header;