import { useState, MouseEvent, JSX } from "react";
import {
    AppBar, Toolbar, IconButton,
    Button, Badge, Box, useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import CartPopover from "./CartPopover";
import MobileDrawer from "./MobileDrawer";
import Logo from "./Logo";
import ThemeSwitch from "../common/ThemeSwitch";
import { NavItem } from "../../types/types";

const Header = (): JSX.Element => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const { user } = useAuth();
    const { cartItems, removeFromCart } = useCart();

    const handleCartHover = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCartClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = () => {
        setMobileOpen((prev) => !prev);
    };

    let navItems: NavItem[] = [
        { name: "Booking", path: "/booking" },
        { name: "Shop", path: "/shop" },
        { name: "Game Fuel", path: "/menu" },
        { name: "About Us", path: "/about" },
    ];

    if (isMobile && user) {
        navItems = [...navItems, { name: "Logout", path: "/logout" }];
    }

    const renderNavLink = (item: NavItem) => (
        <Button
            key={item.name} component={Link} to={item.path}
            sx={{
                whiteSpace: "nowrap", fontWeight: location.pathname === item.path ? 700 : 400,
                color: location.pathname === item.path ? theme.customColors.activelink : "inherit",
                "&:hover": { color: theme.customColors.activelink },
            }}
        >
            {item.name}
        </Button>
    );

    return (
        <>
            <AppBar position="sticky" component="nav" elevation={1}>
                <Toolbar>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "row", sm: "column", md: "row" },
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            maxWidth: "1200px",
                            mx: "auto",
                            px: 2,
                        }}
                    >
                        <Logo />
                        {!isMobile && (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    flexWrap: { sm: "wrap", md: "nowrap" },
                                    justifyContent: "center",
                                }}
                            >
                                {navItems.map(renderNavLink)}
                                <ThemeSwitch />
                                <IconButton
                                    color="inherit"
                                    onMouseEnter={handleCartHover}
                                    sx={{ ml: 1 }}
                                >
                                    <Badge badgeContent={cartItems.length} color="secondary">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                                {user?.username ? (
                                    <>
                                        <Button
                                            component={Link}
                                            to="/profile"
                                            sx={{
                                                fontWeight:
                                                    location.pathname === "/profile" ? 700 : 400,
                                                color:
                                                    location.pathname === "/profile"
                                                        ? theme.customColors.activelink
                                                        : "inherit",
                                                "&:hover": { color: theme.customColors.activelink },
                                            }}
                                        >
                                            {user.username}
                                        </Button>
                                        <Button
                                            component={Link}
                                            to="/logout"
                                            sx={{
                                                fontWeight:
                                                    location.pathname === "/logout" ? 700 : 400,
                                                color:
                                                    location.pathname === "/logout"
                                                        ? theme.customColors.activelink
                                                        : "inherit",
                                                "&:hover": { color: theme.customColors.activelink },
                                            }}
                                        >
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        component={Link}
                                        to="/login"
                                        sx={{
                                            fontWeight:
                                                location.pathname === "/login" ? 700 : 400,
                                            color:
                                                location.pathname === "/login"
                                                    ? theme.customColors.activelink
                                                    : "inherit",
                                            "&:hover": { color: theme.customColors.activelink },
                                        }}
                                    >
                                        Login
                                    </Button>
                                )}
                            </Box>
                        )}
                        {isMobile && (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <IconButton color="inherit" onMouseEnter={handleCartHover}>
                                    <Badge badgeContent={cartItems.length} color="secondary">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                                {user?.username ? (
                                    <Button
                                        component={Link}
                                        to="/profile"
                                        sx={{ color: "inherit", textTransform: "none" }}
                                    >
                                        {user.username}
                                    </Button>
                                ) : (
                                    <Button
                                        component={Link}
                                        to="/login"
                                        sx={{ color: "inherit", textTransform: "none" }}
                                    >
                                        Login
                                    </Button>
                                )}
                                <IconButton color="inherit" edge="end" onClick={toggleDrawer}>
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <CartPopover anchorEl={anchorEl} onClose={handleCartClose}
                cartItems={cartItems} removeItem={removeFromCart} />

            <MobileDrawer navItems={navItems} toggleDrawer={toggleDrawer} mobileOpen={mobileOpen} />
        </>
    );
};

export default Header;
