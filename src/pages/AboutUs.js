// import React from "react";
// import {
//     Container, Typography,
//     Box, Grid,
//     Paper, Divider,
//     Stack,
// } from "@mui/material";
// import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
// import LocalBarIcon from "@mui/icons-material/LocalBar";
// import StorefrontIcon from "@mui/icons-material/Storefront";

// const AboutUs = () => {
//     return (
//         <Box sx={{ py: 6 }}>
//             {/* Hero Section */}
//             <Box
//                 sx={{
//                     background: "linear-gradient(to right, #1c1c1c, #3d3d3d)",
//                     color: "#fff",
//                     py: 8,
//                     textAlign: "center",
//                 }}
//             >
//                 <Typography variant="h3" fontWeight={700}>
//                     About XGameForge
//                 </Typography>
//                 <Typography variant="subtitle1" sx={{ mt: 2, maxWidth: "600px", mx: "auto" }}>
//                     More than a gaming center — a social hub for gamers, coffee lovers, and tech enthusiasts.
//                 </Typography>
//             </Box>

//             <Container maxWidth="lg">
//                 {/* Mission */}
//                 <Box sx={{ my: 6 }}>
//                     <Typography variant="h4" fontWeight={600} gutterBottom>
//                         Our Mission
//                     </Typography>
//                     <Typography color="text.secondary">
//                         At XGameForge, we aim to create a vibrant, welcoming space for gamers and entertainment lovers.
//                         Whether you're here to challenge friends, relax with a drink, or explore the latest gear,
//                         we deliver a premium experience that blends technology, fun, and comfort.
//                     </Typography>
//                 </Box>

//                 <Divider sx={{ my: 4 }} />

//                 {/* What We Offer */}
//                 <Box sx={{ my: 6 }}>
//                     <Typography variant="h4" fontWeight={600} gutterBottom>
//                         What We Offer
//                     </Typography>
//                     <Grid container spacing={4} sx={{ mt: 2 }}>
//                         <Grid item xs={12} md={4}>
//                             <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
//                                 <SportsEsportsIcon fontSize="large" color="primary" />
//                                 <Typography variant="h6" fontWeight={600} sx={{ mt: 1 }}>
//                                     Gaming Lounge
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Play the latest titles on high-end PCs, consoles, and VR.
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
//                                 <LocalBarIcon fontSize="large" color="secondary" />
//                                 <Typography variant="h6" fontWeight={600} sx={{ mt: 1 }}>
//                                     Bar Corner
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Enjoy gourmet snacks and drinks in a relaxing lounge atmosphere.
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
//                                 <StorefrontIcon fontSize="large" color="info" />
//                                 <Typography variant="h6" fontWeight={600} sx={{ mt: 1 }}>
//                                     Game Shop
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Discover and buy games, accessories, and collectibles.
//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                     </Grid>
//                 </Box>

//                 {/* Why Choose Us */}
//                 <Box sx={{ my: 6 }}>
//                     <Typography variant="h4" fontWeight={600} gutterBottom>
//                         Why Choose XGameForge?
//                     </Typography>
//                     <Stack spacing={2} sx={{ mt: 2 }}>
//                         <Typography>🎮 High-performance gaming gear and immersive experiences</Typography>
//                         <Typography>☕ Chill bar corner with quality coffee and snacks</Typography>
//                         <Typography>🛒 Handpicked shop products for gamers and tech lovers</Typography>
//                         <Typography>👥 Community-driven space with events and tournaments</Typography>
//                     </Stack>
//                 </Box>
//             </Container>
//         </Box>
//     );
// };

// export default AboutUs;
// src/pages/AboutUs.js
import React from "react";
import {
  Container, Typography, Box, Grid, Paper, Divider, Stack,
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import StorefrontIcon from "@mui/icons-material/Storefront";

const AboutUs = () => {
  return (
    <Box sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(to right, #1c1c1c, #3d3d3d)",
          color: "#fff",
          py: { xs: 6, md: 8 },
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight={700}>
          About XGameForge
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ mt: 2, maxWidth: 700, mx: "auto", color: "#ccc" }}
        >
          More than a gaming center — a social hub for gamers, coffee lovers, and tech enthusiasts.
        </Typography>
      </Box>

      <Container maxWidth="lg">
        {/* Mission Section */}
        <Box sx={{ my: 8 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Our Mission
          </Typography>
          <Typography color="text.secondary">
            At XGameForge, we aim to create a vibrant, welcoming space for gamers and entertainment lovers.
            Whether you're here to challenge friends, relax with a drink, or explore the latest gear,
            we deliver a premium experience that blends technology, fun, and comfort.
          </Typography>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* What We Offer Section */}
        <Box sx={{ my: 8 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            What We Offer
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {[
              {
                icon: <SportsEsportsIcon fontSize="large" color="primary" />,
                title: "Gaming Lounge",
                desc: "Play the latest titles on high-end PCs, consoles, and VR.",
              },
              {
                icon: <LocalBarIcon fontSize="large" color="secondary" />,
                title: "Bar Corner",
                desc: "Enjoy gourmet snacks and drinks in a relaxing lounge atmosphere.",
              },
              {
                icon: <StorefrontIcon fontSize="large" color="info" />,
                title: "Game Shop",
                desc: "Discover and buy games, accessories, and collectibles.",
              },
            ].map((item, i) => (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ p: 3, textAlign: "center", height: "100%" }}>
                  {item.icon}
                  <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Why Choose Us Section */}
        <Box sx={{ my: 8 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Why Choose XGameForge?
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Typography>🎮 High-performance gaming gear and immersive experiences</Typography>
            <Typography>☕ Chill bar corner with quality coffee and snacks</Typography>
            <Typography>🛒 Handpicked shop products for gamers and tech lovers</Typography>
            <Typography>👥 Community-driven space with events and tournaments</Typography>
          </Stack>
        </Box>

        {/* Location Section */}
        <Box sx={{ my: 8 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Our Location
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Visit us at Rafidia Street, Nablus. We're open 7 days a week!
          </Typography>
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
              width: "100%",
              height: { xs: 300, md: 400 },
            }}
          >
            <iframe
              title="XGameForge Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4430.855740792187!2d35.22217462221021!3d32.22741465658412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1748069761111!5m2!1sen!2s" 
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
