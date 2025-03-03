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

import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import { useCheckout } from '../../hooks/useCheckout';
import { Check, X } from 'lucide-react';

interface CartSummaryProps {
  cartTotal: number;
  onClose: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cartTotal, onClose }) => {
  const { cart, discountAmount, voucherCode, setVoucherCode, applyVoucher, isVoucherValid, voucherMessage } = useCart();
  const [tempVoucherCode, setTempVoucherCode] = useState(voucherCode);
  const { handleCheckout: processCheckout, isLoading } = useCheckout();

  // Determine if free shipping applies (orders over $50)
  const FREE_SHIPPING_THRESHOLD = 50;
  const shippingCost = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 995; // $9.95 in cents
  
  // Final total with shipping and discount
  const finalTotal = cartTotal - discountAmount + shippingCost;

  const handleApplyVoucher = () => {
    applyVoucher(tempVoucherCode);
  };

  return (
    <div className="p-4 border-t border-white/10">
      <div className="mt-4 mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Voucher Code"
            value={tempVoucherCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempVoucherCode(e.target.value)}
            className="flex-grow bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
          />
          <button 
            onClick={handleApplyVoucher}
            className="bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20 transition-colors"
          >
            Apply
          </button>
        </div>
        
        {voucherMessage && (
          <div className={`flex items-center mt-2 text-sm ${isVoucherValid ? 'text-[#00ffff]' : 'text-red-400'}`}>
            {isVoucherValid ? <Check className="w-4 h-4 mr-1" /> : <X className="w-4 h-4 mr-1" />}
            {voucherMessage}
          </div>
        )}
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-white/70">Subtotal</span>
          <span>${formatPrice(cartTotal)}</span>
        </div>
        
        {isVoucherValid && discountAmount > 0 && (
          <div className="flex justify-between text-[#00ffff]">
            <span>Discount (10%)</span>
            <span>-${formatPrice(discountAmount)}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-white/70">Shipping</span>
          {shippingCost === 0 ? (
            <span className="text-[#ff00ff]">Free</span>
          ) : (
            <span>${formatPrice(shippingCost)}</span>
          )}
        </div>
        
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