
import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Developments from '../components/sections/Developments';
import Amenities from '../components/sections/Amenities';
import Services from '../components/sections/Services';
import Testimonials from '../components/sections/Testimonials';
import Mantras from '../components/sections/Mantras';
import SEO from '../components/seo/SEO';

const Home: React.FC = () => {
  return (
    <div className="page-container">
      <SEO />
      <Hero />
      <About />
      <Developments />
      <Services />
      <Mantras />
      <Amenities />
      <Testimonials />
    </div>
  );
};

export default Home;
