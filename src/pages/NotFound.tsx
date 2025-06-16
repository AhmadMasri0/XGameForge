import { Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 10 }}>
      <Typography variant="h2" fontWeight={700} gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        The page you're looking for doesn't exist or was moved.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Back to Home
      </Button>
    </Container>
  );
};

export default NotFound;
