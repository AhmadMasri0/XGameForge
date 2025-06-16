import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "../../types/types";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <Grid container spacing={3} justifyContent="center">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductGrid;