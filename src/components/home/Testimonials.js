import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

const testimonials = [
  { user: "Ali", text: "Best gaming spot in town!" },
  { user: "Noura", text: "Loved the VR experience and the coffee." },
];

const Testimonials = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>What Our Customers Say</Typography>
    <Grid container spacing={3}>
      {testimonials.map((t, i) => (
        <Grid item xs={12} sm={6} key={i}>
          <Card>
            <CardContent>
              <Typography variant="body1" sx={{ mb: 1 }}>{t.text}</Typography>
              <Typography variant="subtitle2" color="text.secondary">— {t.user}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Testimonials;
