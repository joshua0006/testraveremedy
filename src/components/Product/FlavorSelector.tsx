/**
 * FlavorSelector Component
 * 
 * Handles flavor selection for the product.
 * Maintains list of available flavors and selection state.
 * 
 * @component
 * @example
 * ```tsx
 * <FlavorSelector
 *   selectedFlavor="Lemon Squash"
 *   onFlavorChange={(flavor) => console.log(flavor)}
 * />
 * ```
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface FlavorSelectorProps {
  selectedFlavor: string;
  onFlavorChange: (flavor: string) => void;
}

const FLAVORS = [
  "Lemon Squash",
  "Orange Crush",
  "Pineapple Punch"
];

const FLAVOR_COLORS = {
  "Lemon Squash": "yellow",
  "Orange Crush": "orange",
  "Pineapple Punch": "amber"
};

export const FlavorSelector: React.FC<FlavorSelectorProps> = ({
  selectedFlavor,
  onFlavorChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Get color based on selected flavor
  const flavorColor = FLAVOR_COLORS[selectedFlavor as keyof typeof FLAVOR_COLORS] || "fuchsia";

  // Handle clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isOpen) {
        // Start the closing animation
        setIsClosing(true);
        
        // Actually close the dropdown after animation completes
        setTimeout(() => {
          setIsOpen(false);
          setIsClosing(false);
        }, 200);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggleDropdown = () => {
    if (isOpen) {
      // Start the closing animation
      setIsClosing(true);
      
      // Actually close the dropdown after animation completes
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 200);
    } else {
      setIsOpen(true);
    }
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        Flavor
      </label>
      
      <div 
        onClick={handleToggleDropdown}
        className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 flex justify-between items-center cursor-pointer hover:border-white/40 transition-all group"
      >
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full bg-${flavorColor}-500 shadow-sm shadow-${flavorColor}-500/30`}></div>
          <span className="group-hover:text-white transition-colors">{selectedFlavor}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} group-hover:text-white`} />
      </div>
      
      {(isOpen || isClosing) && (
        <div 
          className={`absolute mt-1 w-full z-10 rounded-xl bg-black/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-fuchsia-500/10 overflow-hidden transition-all duration-200 ${isClosing ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
        >
          <div className="py-1 max-h-60 overflow-auto">
            {FLAVORS.map(flavor => {
              const colorKey = flavor as keyof typeof FLAVOR_COLORS;
              const color = FLAVOR_COLORS[colorKey] || "fuchsia";
              
              return (
                <div
                  key={flavor}
                  className={`flex items-center gap-2 px-4 py-2.5 cursor-pointer hover:bg-white/5 transition-colors ${selectedFlavor === flavor ? 'bg-white/10' : ''}`}
                  onClick={() => {
                    onFlavorChange(flavor);
                    setIsClosing(true);
                    setTimeout(() => {
                      setIsOpen(false);
                      setIsClosing(false);
                    }, 200);
                  }}
                >
                  <div className={`w-3 h-3 rounded-full bg-${color}-500 shadow-sm shadow-${color}-500/30`}></div>
                  <span className="hover:text-white transition-colors">{flavor}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};