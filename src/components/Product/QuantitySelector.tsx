/**
 * QuantitySelector Component
 * 
 * Handles quantity selection for the product.
 * Includes quantity limits and validation.
 * 
 * @component
 * @example
 * ```tsx
 * <QuantitySelector
 *   quantity={1}
 *   onQuantityChange={(quantity) => console.log(quantity)}
 *   productId="one-and-done"
 * />
 * ```
 */

import React from 'react';
import { Minus, Plus, Package, PackageCheck } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  productId: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  productId
}) => {
  const MIN_QUANTITY = 1;
  const MAX_QUANTITY = 5;

  // Check if shipping applies based on product and quantity
  const hasShippingCost = productId === "one-and-done" && quantity === 1;

  const handleIncrement = () => {
    if (quantity < MAX_QUANTITY) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > MIN_QUANTITY) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= MIN_QUANTITY && newValue <= MAX_QUANTITY) {
      onQuantityChange(newValue);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        Quantity
      </label>
      
      <div className="flex flex-col space-y-3">
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= MIN_QUANTITY}
            className="bg-black/50 border border-white/20 rounded-l-xl w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <input
            type="number"
            min={MIN_QUANTITY}
            max={MAX_QUANTITY}
            value={quantity}
            onChange={handleInputChange}
            className="bg-black/30 border-y border-white/20 h-12 w-full text-center focus:outline-none focus:ring-1 focus:ring-fuchsia-500 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            aria-label="Quantity"
          />
          
          <button
            type="button"
            onClick={handleIncrement}
            disabled={quantity >= MAX_QUANTITY}
            className="bg-black/50 border border-white/20 rounded-r-xl w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/20 border border-white/10">
          {!hasShippingCost ? (
            <div className="flex items-center text-fuchsia-400 text-sm">
              <PackageCheck className="w-4 h-4 mr-1.5" />
              Free Shipping
            </div>
          ) : (
            <div className="flex items-center text-gray-400 text-sm">
              <Package className="w-4 h-4 mr-1.5" />
              + Shipping ($9.95)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};