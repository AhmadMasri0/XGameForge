import { useEffect, useState } from 'react';
import {
  Container, TextField, Button, Typography,
  Grid, Paper, MenuItem
} from '@mui/material';
import api from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const categories = ['Beverage', 'Snack', 'Cocktail', 'Meal', 'Other'];

const BarItemForm = () => {

  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Other',
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchBarItem = async () => {
        try {
          const res = await api.get('/api/bar/' + id, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          setFormData({ ...res.data });
          setPreview(`${res.data.image}`);

        } catch (error) {
          console.error(error);
          alert('Failed to add bar item');
        }
      }
      fetchBarItem();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    try {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    } catch (e) {
      console.log(e)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    if (imageFile) data.append('image', imageFile);

    try {
      if (id) {
        await api.put(`/api/bar/${id}`, data);
        alert('Bar item updated successfully!');
      } else {
        await api.post('/api/bar', data);
        alert('Bar item added successfully!');
      }
      navigate('/menu');
    } catch (error) {
      console.error(error);
      alert('Failed to submit bar item');
    }
  };

  return (
    <Container maxWidth="sm">


      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Button
          color=""

          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/menu")}
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Typography variant="h5" mb={3}>
          {id ? 'Update' : 'Add'} Bar Item
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                name="price"
                type="number"
                fullWidth
                required
                value={formData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Category"
                name="category"
                select
                fullWidth
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth>
                Upload Image
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
              </Button>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  style={{ marginTop: 10, width: '100%', borderRadius: 8, height: 200, objectFit: 'contain' }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                {id ? 'Update' : 'Add'} Item
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default BarItemForm;
