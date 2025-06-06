import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {

    const theme = useTheme();

    return <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'flex-start' }}>
        <img src={'assets/logo.png'} alt="logo" style={{ height: 40, marginRight: 8 }} />
        <Typography
            variant="h6" fontWeight={700} component={Link} to="/"
            sx={{
                textDecoration: "none", fontSize: { xs: '14px', sm: '16px' },
                color: "inherit", '&:hover': { color: theme.customColors.activelink }
            }}>
            XGameForge
        </Typography>
    </Box>
}

export default Logo;