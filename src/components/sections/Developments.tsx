
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import { PROPERTIES } from '../../../constants';
import LazyImage from '../ui/LazyImage';

const Developments: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = gsap.utils.toArray('.dev-section');

    sections.forEach((section: any) => {
      const img = section.querySelector('.dev-img');
      const text = section.querySelector('.dev-text');

      gsap.to(img, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.from(text, {
        y: 40,
        opacity: 0,
        scrollTrigger: {
          trigger: text,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, []);

  return (
    <section ref={containerRef} className="bg-[#1a1a1a] text-[#f5f5f0]">
      <div className="px-6 md:px-24 pt-24 md:pt-48">
        <h2 className="text-stone-500 uppercase tracking-[0.3em] text-xs font-medium mb-4">
          The Portfolio
        </h2>
        <h3 className="text-4xl md:text-7xl serif italic mb-24 md:mb-48">Select Developments</h3>
      </div>

      {PROPERTIES.map((prop, idx) => (
        <div
          key={prop.id}
          className={`dev-section relative min-h-screen flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center px-6 md:px-24 py-24 gap-12 md:gap-24 overflow-hidden`}
        >
          <div className="w-full md:w-3/5 aspect-[16/9] md:aspect-[4/5] overflow-hidden relative group">
            <Link to={`/developments/${prop.id}`}>
              <div className="dev-img w-full h-[120%] absolute -top-[10%] left-0">
                <LazyImage
                  src={prop.image}
                  alt={prop.name}
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                <span className="text-white text-xs tracking-widest uppercase border border-white/30 px-6 py-3">View Experience</span>
              </div>
            </Link>
          </div>

          <div className="dev-text w-full md:w-2/5 flex flex-col items-start space-y-6">
            <span className="text-stone-500 text-sm tracking-widest">{prop.location}</span>
            <h4 className="text-4xl md:text-6xl serif font-light">{prop.name}</h4>
            <p className="text-stone-400 font-light leading-relaxed max-w-sm">
              {prop.description}
            </p>
            <Link
              to={`/developments/${prop.id}`}
              className="group flex items-center gap-4 text-xs tracking-widest uppercase mt-4"
            >
              <span>Explore Details</span>
              <div className="w-8 h-[1px] bg-white group-hover:w-16 transition-all duration-500"></div>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Developments;
