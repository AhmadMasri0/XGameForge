import {
  Box, Container,
  Typography, IconButton,
  Button, useMediaQuery,
  Grid
} from "@mui/material";
import { Facebook, Instagram, YouTube, X } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import React from "react";


const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const socialLinks: { icon: React.ElementType; path: string }[] = [
    { icon: Facebook, path: "facebook" },
    { icon: X, path: "x" },
    { icon: Instagram, path: "instagram" },
    { icon: YouTube, path: "youtube" },
  ];

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
        <Grid container spacing={4} sx={{ justifyContent: { xs: "center" } }}>
          <Grid
            // item={true}
            // size={{ xs: 12, sm: 6, md: 3 }}
            // xs={12}
            // sm={6}
            // md={3}
            sx={{ textAlign: isMobile ? "center" : "left" }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              XGameForge
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              width={"150px"}
            >
              More than a gaming center — a social hub for gamers, coffee lovers, and tech enthusiasts.
            </Typography>
          </Grid>

          <Grid
            // item
            // xs={12}
            // sm={6}
            // md={2}

            sx={{
              width: { xs: "100%", sm: "inherit" },
              flexDirection: { xs: "row", sm: "column" },
              textAlign: isMobile ? "center" : "left"
            }}
          >
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Pages
            </Typography>
            {["Home", "Booking", "Shop", "Game Fuel", "About"].map((page) => (
              <Button
                key={page}
                component={Link}
                to={
                  page === "Home"
                    ? "/"
                    : page === "Game Fuel"
                      ? "/menu"
                      : `/${page.toLowerCase()}`
                }
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

          <Grid
            // item
            // xs={12}
            // sm={6}
            // md={3}
            sx={{ textAlign: isMobile ? "center" : "left" }}
          >
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              contact@xgameforge.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              +123 456 7890
            </Typography>
            <Box mt={1}>
              {socialLinks.map(({ icon: Icon, path }, idx) => (
                <IconButton
                  key={idx}
                  component={Link}
                  to={`https://${path}.com`}
                  target="_blank"
                  color="inherit"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid
            // item
            // xs={12}
            // sm={6}
            // md={4}
            sx={{ textAlign: isMobile ? "center" : "left" }}
          >
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Visit Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              📍 Rafidia Street, Nablus
            </Typography>
            <Typography variant="body2" color="text.secondary">
              🕒 7 days a week: 10am – 12am
            </Typography>
            <Box
              sx={{
                mt: 2,
                borderRadius: 1,
                overflow: "hidden",
                width: "100%",
              }}
            >
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
