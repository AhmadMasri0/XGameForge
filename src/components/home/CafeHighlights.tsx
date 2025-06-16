import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { Link } from "react-router-dom";
import MotionFade from "../common/MotionFade";

const highlights = [
  { icon: <FastfoodIcon color="secondary" />, label: "Coffee & Snacks" },
  { icon: <LocalCafeIcon color="secondary" />, label: "Gamer-Themed Drinks" },
  { icon: <EventSeatIcon color="secondary" />, label: "Cozy Lounge Seating" },
];

const CafeHighlights = () => (
  <Box sx={{
    textAlign: "center",
    py: 6,
    px: 2,
  }}>
    <MotionFade>

      <Typography variant="h4" gutterBottom mb={4}>
        ☕ Game Fuel Highlights
      </Typography>
      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        {highlights.map((item, i) => (
          <Grid key={i} sx={{ width: '200px' }}>
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
          to="/menu"
          size="large"
        >
          Discover More at Our Bar Corner
        </Button>
      </Box>
    </MotionFade>
  </Box>
);

export default CafeHighlights;
