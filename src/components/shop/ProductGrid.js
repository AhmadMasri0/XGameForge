import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <Grid container spacing={3} justifyContent="center">
      {products.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </Grid>
  );
};

export default ProductGrid;
