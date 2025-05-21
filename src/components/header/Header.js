import React, { useContext } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { ColorModeContext } from "../../contexts/ThemeContext";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/logo.png";

const navItems = [
    { name: "Booking", path: "/booking" },
    { name: "Shop", path: "/shop" },
    { name: "Bar Corner", path: "/bar" },
    { name: "About Us", path: "/about" },
    { name: "Login", path: "/login" },
];

export default function Header() {
    const theme = useTheme();
    const location = useLocation();
    const { toggleColorMode } = useContext(ColorModeContext);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const toggleDrawer = () => setMobileOpen((prev) => !prev);

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
                    <ListItem
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
                    </ListItem>
                ))}
                {/* <Switch onChange={toggleColorMode} /> */}

            </List>
        </Box>
    );

    return (
        <>
            <AppBar component="nav" position="static">
                <Toolbar>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexGrow: 1,
                        }}
                    >
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

                    {/* Desktop nav */}
                    <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
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
                        {/* <Switch onChange={toggleColorMode} /> */}
                    </Box>

                    {/* Mobile Hamburger */}
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

            {/* Drawer menu */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={toggleDrawer}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { width: 240 },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
}
