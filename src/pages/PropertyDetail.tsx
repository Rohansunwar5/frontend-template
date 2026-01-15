import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { PROPERTIES } from '../../constants';
import { gsap } from '../lib/gsap';
import Button from '../components/ui/Button';
import LazyImage from '../components/ui/LazyImage';
import SEO from '../components/seo/SEO';

const PropertyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const property = PROPERTIES.find(p => p.id === slug);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from('.prop-header-content', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
      });

      gsap.from('.prop-spec-item', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        delay: 0.8,
        duration: 0.8
      });

      gsap.to('.prop-hero-img', {
        y: '20%',
        scrollTrigger: {
          trigger: '.prop-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, [slug]);

  if (!property) return <div className="min-h-screen flex items-center justify-center">Property not found.</div>;

  return (
    <div className="bg-[#f5f5f0]">
      <SEO
        title={property.name}
        description={property.description}
        image={property.image}
      />
      {/* Hero */}
      <section className="prop-hero relative h-[90vh] overflow-hidden bg-stone-900">
        <div className="prop-hero-img absolute inset-0 w-full h-[120%] -top-[10%]">
          <LazyImage
            src={property.image}
            className="w-full h-full"
            imgClassName="w-full h-full object-cover brightness-[0.7]"
            alt={property.name}
            priority
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-24 pb-24 text-white">
          <h1 className="prop-header-content text-5xl md:text-9xl serif italic font-light mb-4">{property.name}</h1>
          <p className="prop-header-content text-xl md:text-2xl font-light tracking-wide">{property.location}</p>
        </div>
      </section>

      {/* Specs Bar */}
      <section className="bg-stone-100 py-10 px-6 md:px-24 border-b border-stone-200">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8 md:gap-0">
          <div className="prop-spec-item">
            <span className="block text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-1">Status</span>
            <span className="text-xl serif italic">Available</span>
          </div>
          <div className="prop-spec-item">
            <span className="block text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-1">Scale</span>
            <span className="text-xl serif italic">{property.specs.sqft.toLocaleString()} sq.ft.</span>
          </div>
          <div className="prop-spec-item">
            <span className="block text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-1">Sleeping</span>
            <span className="text-xl serif italic">{property.specs.beds} En-Suites</span>
          </div>
          <div className="prop-spec-item">
            <span className="block text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-1">Investment</span>
            <span className="text-xl serif italic">{property.price}</span>
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section className="py-24 md:py-48 px-6 md:px-24">
        <div className="max-w-4xl mx-auto space-y-12 text-center md:text-left">
          <h2 className="text-stone-400 uppercase tracking-[0.3em] text-xs font-medium">Design Intent</h2>
          <p className="text-2xl md:text-5xl serif leading-tight text-[#1a1a1a]">
            {property.description}
          </p>
          <div className="w-12 h-[1px] bg-stone-300 mx-auto md:mx-0"></div>
          <p className="text-lg text-stone-600 font-light leading-relaxed">
            Every corner of {property.name} has been meticulously curated to evoke a sense of weightlessness. From the floor-to-ceiling glass that dissolves the boundary between indoors and out, to the artisanal finishes that ground the space in earthly luxury.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 md:px-24 pb-24 md:pb-48">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {property.gallery.map((img, i) => (
            <div key={i} className={`overflow-hidden aspect-[4/5] ${i % 3 === 0 ? 'md:col-span-2 aspect-video' : ''}`}>
              <LazyImage
                src={img}
                className="w-full h-full"
                imgClassName="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                alt={`Detail ${i}`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry */}
      <section className="bg-stone-900 text-white py-24 md:py-48 px-6 md:px-24 text-center">
        <h2 className="text-4xl md:text-7xl serif italic mb-12">Acquire the Extraordinary</h2>
        <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-black">
          Inquire Privately
        </Button>
      </section>
    </div>
  );
};

export default PropertyDetail;
