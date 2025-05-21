import React, { useState, useEffect } from "react";
import {
    Container, Typography, Box,
    Divider, Grid, Pagination, Stack,
} from "@mui/material";
import ProductFilter from "../components/shop/ProductFilter";
import ProductGrid from "../components/shop/ProductGrid";
import { allProducts } from "../data/products";

const PRODUCTS_PER_PAGE = 8;

const Shop = () => {
    const [filters, setFilters] = useState({
        category: "",
        platform: "",
        price: "",
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [page, setPage] = useState(1);

    // Debounce logic
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedQuery(searchQuery), 400);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

    // Filtering
    const filteredProducts = allProducts.filter((product) => {
        const matchesCategory = filters.category ? product.category === filters.category : true;
        const matchesPlatform = filters.platform ? product.platform === filters.platform : true;
        const matchesSearch = debouncedQuery
            ? product.name.toLowerCase().includes(debouncedQuery.toLowerCase())
            : true;

        return matchesCategory && matchesPlatform && matchesSearch;
    });

    // Sorting
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (filters.price === "low") return a.price - b.price;
        if (filters.price === "high") return b.price - a.price;
        return 0;
    });

    // Pagination
    const pageCount = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = sortedProducts.slice(
        (page - 1) * PRODUCTS_PER_PAGE,
        page * PRODUCTS_PER_PAGE
    );

    const handlePageChange = (_, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Container maxWidth="xl" sx={{ my: 6 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={9} sx={{ width: "100%" }}>
                    <Box sx={{ mb: 4, textAlign: "center" }}>
                        <Typography variant="h3" fontWeight={700} gutterBottom>
                            Explore Our Shop
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Find the best games and accessories for your setup
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 4 }} />



                    <ProductFilter filters={filters} onFilterChange={handleFilterChange}
                        searchQuery={searchQuery} handleSearchChange={handleSearchChange} />

                    {paginatedProducts.length > 0 ? (
                        <>
                            <ProductGrid products={paginatedProducts} />
                            <Stack alignItems="center" sx={{ mt: 4 }}>
                                <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" />
                            </Stack>
                        </>
                    ) : (
                        <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
                            No results found.
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Shop;
