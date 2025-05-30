
import React from "react";
import HeroBanner from "../components/home/HeroBanner";
import FeaturedProducts from "../components/home/FeaturedProducts";
import BookSessionCTA from "../components/home/BookSessionCTA";
import CafeHighlights from "../components/home/CafeHighlights";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <FeaturedProducts />
      <BookSessionCTA />
      <CafeHighlights />
    </>
  );
};

export default Home;
