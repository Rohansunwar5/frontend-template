
import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from '../../lib/gsap';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1,
        ease: 'power4.inOut'
      });
      gsap.fromTo('.menu-link',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.8,
        ease: 'power4.inOut'
      });
    }
  }, [isOpen]);

  const handleLifestyleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    if (location.pathname === '/') {
      const el = document.getElementById('lifestyle-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/?scroll=lifestyle');
    }
  };

  const navItems: Array<{ label: string; path: string; onClick?: (e: React.MouseEvent) => void }> = [
    { label: 'The Vision', path: '/about' },
    { label: 'Developments', path: '/developments' },
    { label: 'Services', path: '/services' },
    // { label: 'Lifestyle', path: '#lifestyle', onClick: handleLifestyleClick },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[60] bg-[#1a1a1a] text-[#f5f5f0] flex flex-col justify-center px-10 md:px-24 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
    >
      text
    </div>
  );
};

export default MenuOverlay;