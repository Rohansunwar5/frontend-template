import React, { useEffect, useRef } from 'react';
import { gsap } from '@/src/lib/gsap';
import Button from '@/src/components/ui/Button';

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-[#f5f5f0] pt-40 md:pt-64 pb-24 px-6 md:px-24"
    >
    </div>
  );
};

export default Contact;
