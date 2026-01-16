
import React, { useEffect } from 'react';
import { gsap } from '../lib/gsap';

const About: React.FC = () => {
  useEffect(() => {
    gsap.from('.reveal-text', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
    });
  }, []);

  return (
    <div className="bg-[#f5f5f0] pt-40 pb-24 px-6 md:px-24 overflow-hidden">
    </div>
  );
};

export default About;
