import React from "react";
import {
  Box, Container, Grid, Typography,
  IconButton, Button, useMediaQuery,
} from "@mui/material";
import { Facebook, Instagram, YouTube, X } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        <Grid container spacing={4} sx={{ justifyContent: { xs: 'center' } }}>
          {/* Brand */}
          <Grid item xs={12} sm={6} md={3} textAlign={isMobile ? "center" : "left"}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              XGameForge
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Unleash your inner gamer. Play. Shop. Chill.
            </Typography>
          </Grid>

          {/* Navigation */}
          <Grid item xs={12} sm={6} md={2} textAlign={isMobile ? "center" : "left"}
            sx={{ width: { xs: '100%', sm: 'inherit' }, flexDirection: { xs: 'row', sm: 'column' } }}>
            <Typography variant="subtitle1" gutterBottom>
              Pages
            </Typography>
            {["Home", "Booking", "Shop", "Café", "About"].map((page) => (
              <Button
                key={page}
                component={Link}
                to={page === "Home" ? "/" : page === "Café" ? "/bar" : `/${page.toLowerCase()}`}
                sx={{
                  display: "block",
                  textTransform: "none",
                  color: theme.palette.text.secondary,
                }}
              >
                {page}
              </Button>
            ))}
          </Grid>

          {/* Contact & Social */}
          <Grid item xs={12} sm={6} md={3} textAlign={isMobile ? "center" : "left"}>
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

          {/* Location & Hours */}
          <Grid item xs={12} sm={6} md={4} textAlign={isMobile ? "center" : "left"}>
            <Typography variant="subtitle1" gutterBottom>
              Visit Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              📍Rafidia Street, Nablus
            </Typography>
            <Typography variant="body2" color="text.secondary">
              🕒  7 days a week: 10am – 12am
            </Typography>
            {/* Embedded Google Map */}
            <Box sx={{ mt: 2, borderRadius: 1, overflow: "hidden", width: "100%" }}>
              <iframe
                title="XGameForge Location"
                width="100%"
                height="150"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4430.855740792187!2d35.22217462221021!3d32.22741465658412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1748069761111!5m2!1sen!2s"
              ></iframe>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Note */}
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
