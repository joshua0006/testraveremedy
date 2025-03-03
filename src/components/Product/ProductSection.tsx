/**
 * ProductSection Component
 * 
 * Main product display section. Handles:
 * - Displaying 2x2 grid of product cards
 * - Showcasing four recovery options
 * - Each card has 2-column layout: product info (left) and purchase options (right)
 * 
 * @component
 * @example
 * ```tsx
 * <ProductSection />
 * ```
 */

import React, { useState, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import { FlavorSelector } from './FlavorSelector';
import { QuantitySelector } from './QuantitySelector';

// Toast notification component
interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className="fixed top-6 right-6 z-50 transition-all duration-300 transform translate-y-0 opacity-100 animate-slide-down">
      <div className={`px-6 py-4 rounded-lg shadow-lg flex items-center ${
        type === 'success' 
          ? 'bg-gradient-to-r from-purple-900/90 to-fuchsia-900/90 border border-fuchsia-500/30' 
          : 'bg-red-900/90 border border-red-500/30'
      } backdrop-blur-md`}>
        <div className={`mr-3 text-2xl ${type === 'success' ? 'text-fuchsia-400' : 'text-red-400'}`}>
          {type === 'success' ? '✓' : '✗'}
        </div>
        <p className="text-white font-medium">{message}</p>
        <button 
          onClick={onClose}
          className="ml-4 text-white/70 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Product card component with 2-column internal layout
interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imagePlaceholder: string;
  gradientFrom: string;
  gradientTo: string;
  buttonFrom: string;
  buttonTo: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  imagePlaceholder,
  gradientFrom,
  gradientTo,
  buttonFrom,
  buttonTo
}) => {
  const [flavor, setFlavor] = useState('Lemon Squash');
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Get the correct bottle image
    const bottleImage = getBottleImage();
    
    addToCart({
      id,
      name,
      description: `Premium ${name}`,
      images: [bottleImage], // Use the same bottle image from the product card
      unitPrice: price,
      quantity,
      flavor
    });
    
    // Show toast instead of opening cart
    setShowToast(true);
  };

  // Get the appropriate bottle image based on product ID
  const getBottleImage = () => {
    if (id === "one-and-done") return "/1-bottle.jpg";
    if (id === "dynamic-duo") return "/2-bottles.jpg";
    if (id === "triple-threat") return "/3-bottles.jpg";
    return imagePlaceholder;
  };

  const totalPrice = price * quantity;

  return (
    <div className="glass-panel rounded-3xl p-6 h-full">
      {/* Main grid with 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column - Product image, name, and price */}
        <div className="flex flex-col">
          <div className={`aspect-video bg-gradient-to-br from-${gradientFrom}-500/20 to-${gradientTo}-500/20 rounded-2xl overflow-hidden mb-4 relative group`}>
            <img 
              src={getBottleImage()}
              alt={name}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = imagePlaceholder;
              }}
            />
            {/* Add a subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Add product badge */}
            <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-sm font-medium text-white">
              {id === "one-and-done" ? "Basic" : id === "dynamic-duo" ? "Popular" : "Premium"}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <p className="text-gray-300 mb-4">{description}</p>
          
          {/* Price display */}
          <div className="mt-auto">
            <p className="text-xl font-bold">${formatPrice(totalPrice)}</p>
            <div className="flex items-center gap-2 mt-1">
              {(id !== "one-and-done" || quantity >= 2) ? (
                <p className="text-fuchsia-400 text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M3 3v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3"></path>
                    <path d="M2 12h20v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7z"></path>
                    <path d="M12 12v9"></path>
                    <path d="M12 3v9"></path>
                  </svg>
                  Free Shipping
                </p>
              ) : (
                <p className="text-gray-400 text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <rect width="18" height="12" x="3" y="8" rx="2"></rect>
                    <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  + Shipping ($9.95)
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Right column - Flavor, quantity selectors and add to cart button */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <FlavorSelector 
              selectedFlavor={flavor}
              onFlavorChange={setFlavor}
            />
            
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
              productId={id}
            />
          </div>
          
          <button 
            onClick={handleAddToCart}
            className={`w-full bg-gradient-to-r from-fuchsia-600 to-violet-600 py-3 px-6 rounded-full text-white font-medium hover:from-fuchsia-700 hover:to-violet-700 transition relative overflow-hidden group`}
          >
            <span className="relative z-10 flex items-center justify-center">
              Add to Cart
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          </button>
          
          {/* Toast notification */}
          {showToast && (
            <Toast 
              message={`Added ${quantity} ${quantity === 1 ? 'pack' : 'packs'} of ${name} to cart!`}
              type="success"
              onClose={() => {
                setShowToast(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Video card component with YouTube embed
const VideoCard: React.FC = () => {
  const [isVideoActive, setIsVideoActive] = useState(false);
  

  
  const handleVideoActivation = () => {
    setIsVideoActive(true);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 h-full relative overflow-hidden group">
      {/* Background gradient overlay with animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-fuchsia-500/10 to-blue-500/20 z-0 animate-pulse"></div>
      
      {/* Glow effects */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl"></div>
      
      {/* Full card video area */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="aspect-video w-full bg-gradient-to-br from-fuchsia-600/20 via-purple-500/20 to-blue-600/20 rounded-2xl overflow-hidden mb-4 relative border border-white/10">
          {isVideoActive ? (
            <iframe 
            src="https://www.youtube.com/embed/4qz6x8y3tNw?autoplay=1&mute=1&enablejsapi=1&controls=0&loop=1&playlist=4qz6x8y3tNw&rel=0"
            className="w-full h-full absolute inset-0 z-10"
            title="Recovery Product Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          
          
          ) : (
            <>
              {/* Video thumbnail with play overlay */}
              <img 
                src="https://img.youtube.com/vi/4qz6x8y3tNw/maxresdefault.jpg"
                alt="Recovery Product Video"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://img.youtube.com/vi/4qz6x8y3tNw/0.jpg"; // Fallback to default thumbnail
                }}
              />
              
              {/* Play button with hover effect */}
              <div 
                className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                onClick={handleVideoActivation}
              >
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(255,0,255,0.5)]">
                  <div className="w-0 h-0 border-t-10 border-t-transparent border-l-20 border-l-white border-b-10 border-b-transparent ml-2"></div>
                </div>
                
                {/* YouTube logo to indicate source */}
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white flex items-center">
                  <svg className="h-4 w-4 mr-1 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </div>
                
                {/* Pulsing ring animation */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 rounded-full border-2 border-fuchsia-500/50 animate-ping opacity-50"></div>
                </div>
              </div>
            </>
          )}
        </div>
        
       
      </div>
    </div>
  );
};

export const ProductSection: React.FC = () => {
  return (
    <div id="product-section" className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold gradient-text text-center mb-12">
          Recovery Solutions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* One and Done Recovery */}
          <ProductCard 
            id="one-and-done"
            name="One and Done Recovery"
            description="Our basic recovery formula for quick bounce-back after a night out. Single-dose perfection."
            price={2999}
            imagePlaceholder="https://images.unsplash.com/photo-1626621331470-563493c8c779?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
            gradientFrom="purple"
            gradientTo="fuchsia"
            buttonFrom="purple"
            buttonTo="fuchsia"
          />
          
          {/* Dynamic Duo Recovery */}
          <ProductCard 
            id="dynamic-duo"
            name="Dynamic Duo Recovery"
            description="Double-powered recovery solution combining two synergistic formulas for complete restoration."
            price={4999}
            imagePlaceholder="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
            gradientFrom="blue"
            gradientTo="fuchsia"
            buttonFrom="blue"
            buttonTo="fuchsia"
          />
          
          {/* Triple Threat Recovery */}
          <ProductCard 
            id="triple-threat"
            name="Triple Threat Recovery"
            description="Our ultimate three-stage recovery system for extended events. Complete body restoration."
            price={6999}
            imagePlaceholder="https://images.unsplash.com/photo-1647870190030-dabe01a24006?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
            gradientFrom="fuchsia"
            gradientTo="amber"
            buttonFrom="fuchsia"
            buttonTo="amber"
          />
          
          {/* Product Video */}
          <VideoCard />
        </div>
      </div>
    </div>
  );
};