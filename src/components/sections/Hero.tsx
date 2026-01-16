
import React, { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import Button from '../ui/Button';
import LazyImage from '../ui/LazyImage';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      gsap.from('.hero-title-line', {
        y: '100%',
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
      });

      gsap.from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        delay: 1.5
      });

      // Parallax effect
      gsap.to(imageRef.current, {
        y: '20%',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section>
      <div>
        text
      </div>
    </section>
  );
};

export default Hero;
