import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import fifa from "../../assets/hero.jpg";
import cod from "../../assets/hero.jpg";
import vr from "../../assets/hero.jpg";
import { useEffect, useState } from "react";
import api, { API_URL } from "../../api/axios";

const games = [
  { title: "FIFA 24", img: fifa },
  { title: "Call of Duty", img: cod },
  { title: "Beat Saber (VR)", img: vr },
];

const FeaturedProducts = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/products/featuredGames");
        setProducts(res.data);
      } catch (err) {
        console.log(err)
        console.error("Failed to fetch products", err.message);
      }
    };

    fetchProducts();
  }, []);

  return <Box sx={{ p: 4, backgroundColor: "#f9f9f9" }}>
    <Typography variant="h4" gutterBottom textAlign="center">
      🎮 Featured Games and accessories
    </Typography>
    <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
      {products.map((item, i) => (
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
              image={API_URL + item?.images[0]?.url}
              alt={item.name}
              sx={{ objectFit: "cover", width: '200px' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" fontWeight={600} textAlign="center">
                {item.name}
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
        Explore more in Our Shop
      </Button>
    </Box>
  </Box>
};

export default FeaturedProducts;
