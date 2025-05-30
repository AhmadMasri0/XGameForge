import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <Grid container spacing={3} justifyContent="center">
      {products.map((product,i) => (
        // <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
        <ProductCard key={i} product={product} />
        // </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
