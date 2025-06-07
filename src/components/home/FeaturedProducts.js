import { Box, Grid, Card, CardMedia, CardContent, Typography, Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import MotionFade from "../common/MotionFade";

const FeaturedProducts = () => {

  const [products, setProducts] = useState([]);
  const theme = useTheme();

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

  return <Box sx={{ p: 4, }}>
    <MotionFade>
      <Typography variant="h4" gutterBottom textAlign="center">
        🎮 Featured games and accessories
      </Typography>
      <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        {products.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={i} sx={{ width: '250px' }}>
            <Card sx={{
              transition: "transform 0.3s ease",
              height: "100%", display: "flex", flexDirection: "column", '&:hover': {
                transform: "scale(1.03)", boxShadow: 6,
              },
            }}>
              <Link to={'/products/' + item._id} style={{ textDecoration: 'none', color: theme.customColors.primary }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item?.images[0]?.url}
                  alt={item.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={600} textAlign="center">
                    {item.name}
                  </Typography>
                </CardContent>
              </Link>
            </Card>

          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="outlined"
          color={theme.customColors.primary}
          component={Link}
          to="/shop"
          size="large"
          sx={{
            '&:hover': {
              backgroundColor: theme.customColors.activelink,
              color: 'white'
            }
          }}
        >
          Explore more in Our Shop
        </Button>
      </Box>
    </MotionFade>
  </Box>
};

export default FeaturedProducts;
