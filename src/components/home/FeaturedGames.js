import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import fifa from "../../assets/hero.jpg";
import cod from "../../assets/hero.jpg";
import vr from "../../assets/hero.jpg";

const games = [
  { title: "FIFA 24", img: fifa },
  { title: "Call of Duty", img: cod },
  { title: "Beat Saber (VR)", img: vr },
];

const FeaturedGames = () => (
  <Box sx={{ p: 4, backgroundColor: "#f9f9f9" }}>
    <Typography variant="h4" gutterBottom textAlign="center">
      🎮 Featured Games
    </Typography>
    <Grid container spacing={4}>
      {games.map((game, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Card sx={{
            transition: "transform 0.3s ease",
            height: "100%", display: "flex", flexDirection: "column", '&:hover': {
              transform: "scale(1.03)",
              boxShadow: 6,
            },
          }}>
            <CardMedia
              component="img"
              height="200"
              image={game.img}
              alt={game.title}
              sx={{ objectFit: "cover" }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" fontWeight={600} textAlign="center">
                {game.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/shop"
        size="large"
      >
        Explore All Games in Our Shop
      </Button>
    </Box>
  </Box>
);

export default FeaturedGames;
