
import React from "react";
import HeroBanner from "../components/home/HeroBanner";
import FeaturedGames from "../components/home/FeaturedGames";
import BookSessionCTA from "../components/home/BookSessionCTA";
import CafeHighlights from "../components/home/CafeHighlights";
import Testimonials from "../components/home/Testimonials";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <FeaturedGames />
      <BookSessionCTA />
      <CafeHighlights />
      {/* <Testimonials /> */}
    </>
  );
};

export default Home;
