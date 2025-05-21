import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { Link } from "react-router-dom";

const highlights = [
  { icon: <FastfoodIcon color="secondary" />, label: "Coffee & Snacks" },
  { icon: <LocalCafeIcon color="secondary" />, label: "Gamer-Themed Drinks" },
  { icon: <EventSeatIcon color="secondary" />, label: "Cozy Lounge Seating" },
];

const CafeHighlights = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom textAlign="center">
      ☕ Café Highlights
    </Typography>
    <Grid container spacing={3}>
      {highlights.map((item, i) => (
        <Grid item xs={12} sm={4} key={i}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
              gap: 2,
              textAlign: "center",
            }}
          >
            <Box>
              {item.icon}
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                {item.label}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>

    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Button
        variant="outlined"
        color="secondary"
        component={Link}
        to="/bar"
        size="large"
      >
        Discover More at Our Bar Corner
      </Button>
    </Box>
  </Box>
);

export default CafeHighlights;
