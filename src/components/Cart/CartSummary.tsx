/**
 * CartSummary Component
 * 
 * Displays cart totals and checkout button.
 * 
 * @component
 * @example
 * ```tsx
 * <CartSummary cartTotal={4999} onClose={() => {}} />
 * ```
 */

import React from 'react';
import { ShoppingCart, Truck, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import { useCheckout } from '../../hooks/useCheckout';

interface CartSummaryProps {
  cartTotal: number;
  onClose: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cartTotal, onClose }) => {
  const { cart } = useCart();
  const { handleCheckout: processCheckout, isLoading } = useCheckout();

  // Check if we need to apply shipping:
  // 1. Only if it's only the "one-and-done" product
  // 2. With quantity = 1
  // 3. And it's the only item in the cart
  const shouldApplyShipping = 
    cart.length === 1 && 
    cart[0].id === "one-and-done" && 
    cart[0].quantity === 1;
  
  // Shipping cost
  const shippingCost = shouldApplyShipping ? 995 : 0; // $9.95 in cents
  
  // Final total with shipping
  const finalTotal = cartTotal + shippingCost;

  return (
    <div className="p-4 border-t border-white/10">      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-white/70">Subtotal</span>
          <span>${formatPrice(cartTotal)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1 text-white/70">
            <Truck className="w-4 h-4" /> Shipping
          </span>
          {shippingCost === 0 ? (
            <span className="text-fuchsia-400 font-medium">Free</span>
          ) : (
            <span>${formatPrice(shippingCost)}</span>
          )}
        </div>
        
        {shouldApplyShipping && (
          <div className="flex items-start gap-2 px-3 py-2 bg-fuchsia-950/30 border border-fuchsia-500/20 rounded-lg mt-2">
            <AlertCircle className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
            <p className="text-sm text-white/80">
              Add one more bottle or increase quantity to qualify for <span className="text-fuchsia-400 font-medium">free shipping</span>!
            </p>
          </div>
        )}
        
        <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/10">
          <span>Total</span>
          <span>${formatPrice(finalTotal)}</span>
        </div>
      </div>
      
      <button 
        onClick={processCheckout}
        disabled={isLoading || cart.length === 0}
        className="w-full bg-gradient-to-r from-[#ff00ff] via-[#ff66ff] to-[#00ffff] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,255,0.3)] flex items-center justify-center gap-2 disabled:opacity-70"
        aria-label="Proceed to checkout"
      >
        <ShoppingCart className="w-5 h-5" />
        {isLoading ? 'Processing...' : 'Checkout'}
      </button>
      
      <button 
        onClick={onClose}
        className="w-full mt-2 bg-transparent border border-white/20 text-white px-6 py-2 rounded-xl hover:bg-white/5 transition-colors"
        aria-label="Continue shopping"
      >
        Continue Shopping
      </button>
    </div>
  );
}