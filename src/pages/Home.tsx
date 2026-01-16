
import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import SEO from '../components/seo/SEO';

const Home: React.FC = () => {
  return (
    <div className="page-container">
      <SEO />
      <Hero />
      {/* <About />
      <Developments />
      <Services />
      <Mantras />
      <Amenities />
      <Testimonials /> */}
    </div>
  );
};

export default Home;
