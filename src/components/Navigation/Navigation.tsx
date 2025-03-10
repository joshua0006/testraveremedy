/**
 * Navigation Component
 * 
 * Primary navigation bar that appears at the top of every page. Handles:
 * - Logo and brand display
 * - Navigation links
 * - Shopping cart integration
 * - Mobile responsiveness
 * 
 * @component
 */

import React, { useState } from 'react';
import { CartButton } from './CartButton';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  scrollToProduct: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showAboutModal: boolean;
  setShowAboutModal: React.Dispatch<React.SetStateAction<boolean>>;
  showContactModal: boolean;
  setShowContactModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  scrollToProduct,
  isMenuOpen,
  setIsMenuOpen,
  showAboutModal,
  setShowAboutModal,
  showContactModal,
  setShowContactModal
}) => {
  const menuItems = [
    { label: 'Shop Now', href: undefined, onClick: scrollToProduct },
    { label: 'About', href: '/about', onClick: () => setShowAboutModal(true) },
    { label: 'FAQs', href: '/faqs', onClick: undefined },
    { label: 'Contact', href: '/contact', onClick: () => setShowContactModal(true) },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Returns', href: '/returns' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/60 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Brand Logo */}
          <div className="flex items-center">
            <a href="/">
              <img 
                src="/01.png"
                alt="RaveRemedy Logo" 
                className="h-16 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => item.href ? window.location.href = item.href : item.onClick?.()}
                className="text-white hover:text-[#ff00ff] transition-colors"
              >
                {item.label}
              </button>
            ))}
            <CartButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <CartButton />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 hover:text-[#ff00ff] transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-2 pb-6 space-y-2 bg-black/90 backdrop-blur-lg border-b border-white/20">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setIsMenuOpen(false);
                  item.href ? window.location.href = item.href : item.onClick?.();
                }}
                className="block w-full text-left px-4 py-3 text-white hover:text-[#ff00ff] transition-colors"
              >
                {item.label}
              </button>
            ))}
            
            <div className="border-t border-white/10 mt-4 pt-4">
              <p className="px-4 text-sm text-gray-400 mb-2">Legal</p>
              {legalLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:text-[#ff00ff] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};