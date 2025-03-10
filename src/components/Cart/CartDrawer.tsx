/**
 * CartDrawer Component
 * 
 * Slide-out cart drawer that displays cart contents and handles checkout.
 * 
 * Features:
 * - Cart item display and management
 * - Quantity adjustments
 * - Price calculations
 * - Checkout process
 * - Smooth slide animations
 * 
 * @component
 * @example
 * ```tsx
 * <CartDrawer />
 * ```
 */

import React, { useEffect, useState } from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { EmptyCart } from './EmptyCart';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    cartTotal,
    cartCount
  } = useCart();

  // Track animation state separately from open/close state
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  
  // Manage animations with useEffect
  useEffect(() => {
    if (isCartOpen) {
      // When opening, show container immediately and animate drawer in
      setIsVisible(true);
      setIsAnimatingOut(false);
    } else if (!isCartOpen && isVisible) {
      // When closing, trigger closing animation then hide after it completes
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimatingOut(false);
      }, 300); // Match this to the animation duration
      return () => clearTimeout(timer);
    }
  }, [isCartOpen, isVisible]);

  // If cart is not open and animation has completed, don't render anything
  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ease-in-out ${
        isAnimatingOut ? 'opacity-0' : 'opacity-100'
      }`}
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="cart-title"
    >
      {/* Backdrop with click-away handler */}
      <div 
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isAnimatingOut ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />
      
      {/* Cart drawer content */}
      <div 
        className={`absolute top-0 right-0 h-full w-full max-w-md border-l border-[#ff00ff]/20 bg-black/90 ${
          isAnimatingOut ? 'animate-slide-out-right' : 'animate-slide-in-right'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingCart className="w-6 h-6 text-[#ff00ff] mr-2" />
              <h2 id="cart-title" className="text-xl font-bold">Your Cart ({cartCount})</h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <EmptyCart onClose={() => setIsCartOpen(false)} />
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItem key={`${item.id}-${item.flavor}`} item={item} />
                ))}
              </div>
            )}
          </div>
          
          {/* Summary and Checkout */}
          {cart.length > 0 && (
            <CartSummary 
              cartTotal={cartTotal} 
              onClose={() => setIsCartOpen(false)} 
            />
          )}
        </div>
      </div>
    </div>
  );
};