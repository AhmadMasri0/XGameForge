// src/components/Footer.jsx
import React from "react";
import { Box, Container, Grid, Typography, IconButton, Button } from "@mui/material";
import { Facebook, Instagram, YouTube, X } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        py: 4,
        mt: 5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              XGameForge
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Unleash your inner gamer. Play. Shop. Chill.
            </Typography>
          </Grid>

          {/* Navigation */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" gutterBottom>
              Pages
            </Typography>
            {["Home", "Booking", "Shop", "Café", "About"].map((page) => (
              <Button sx={{
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
                component={Link}
                to={page == 'Home' ? '/' : page == 'Café' ? 'bar' : `/${page.toLowerCase()}`}
                key={page}
                underline="hover"
                color="text.secondary"
                display="block"
                variant="body2"
              >
                {page}
              </Button>
            ))}
          </Grid>

          {/* Contact & Social */}
          <Grid item xs={6} sm={4} md={3}>
            <Typography variant="subtitle1" gutterBottom>
              Connect
            </Typography>
            <Typography variant="body2" color="text.secondary">
              contact@xgameforge.com
            </Typography>

            <Typography variant="body2" color="text.secondary">
              +123 456 7890
            </Typography>
            <Box mt={1}>
              {[Facebook, X, Instagram, YouTube].map((Icon, idx) => (
                <IconButton
                  key={idx}
                  color="inherit"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Bottom note */}
        <Box textAlign="center" pt={4}>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} XGameForge. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
