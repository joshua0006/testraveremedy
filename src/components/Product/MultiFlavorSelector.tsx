/**
 * MultiFlavorSelector Component
 * 
 * Handles multiple flavor selection for bundle products.
 * Maintains list of available flavors and multiple selection state.
 * 
 * @component
 * @example
 * ```tsx
 * <MultiFlavorSelector
 *   selectedFlavors={["Lemon Squash", "Orange Crush"]}
 *   onFlavorsChange={(flavors) => console.log(flavors)}
 *   maxSelections={2}
 * />
 * ```
 */

import React, { useState, useRef, useEffect } from 'react';

interface MultiFlavorSelectorProps {
  selectedFlavors: string[];
  onFlavorsChange: (flavors: string[]) => void;
  maxSelections: number;
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

export const MultiFlavorSelector: React.FC<MultiFlavorSelectorProps> = ({
  selectedFlavors,
  onFlavorsChange,
  maxSelections
}) => {
  // Track which flavor slot is being actively edited
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Initialize refs array for slots
  useEffect(() => {
    slotRefs.current = slotRefs.current.slice(0, maxSelections);
    
    // Close dropdown on outside click
    const handleClickOutside = (e: MouseEvent) => {
      if (activeSlot !== null && slotRefs.current[activeSlot] && 
          !slotRefs.current[activeSlot]?.contains(e.target as Node)) {
        setActiveSlot(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeSlot, maxSelections]);
  
  // Get color based on flavor
  const getFlavorColor = (flavor: string) => {
    return FLAVOR_COLORS[flavor as keyof typeof FLAVOR_COLORS] || "fuchsia";
  };
  
  // Set a flavor at specific slot
  const setFlavorAtSlot = (flavor: string, slotIndex: number) => {
    const newSelections = [...selectedFlavors];
    newSelections[slotIndex] = flavor;
    onFlavorsChange(newSelections);
    setActiveSlot(null); // Close dropdown after selection
  };
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        Select {maxSelections} Flavors
      </label>
      
      {/* Flavor slots - show a card for each possible flavor */}
      <div className="space-y-3 mb-5">
        {Array.from({ length: maxSelections }).map((_, slotIndex) => {
          const flavorForSlot = selectedFlavors[slotIndex] || '';
          const color = flavorForSlot ? getFlavorColor(flavorForSlot) : "gray";
          const isActive = activeSlot === slotIndex;
          
          return (
            <div 
              key={`slot-${slotIndex}`} 
              className="relative"
              ref={el => slotRefs.current[slotIndex] = el}
            >
              {/* Slot header with slot number */}
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm text-gray-400">
                  Flavor {slotIndex + 1}
                </div>
                {flavorForSlot && (
                  <div className={`text-xs text-${color}-400`}>
                    {flavorForSlot}
                  </div>
                )}
              </div>
              
              {/* Slot selector */}
              <div
                onClick={() => setActiveSlot(isActive ? null : slotIndex)}
                className={`w-full bg-black/30 border ${flavorForSlot ? `border-${color}-500/60` : 'border-white/20'} 
                  rounded-xl px-4 py-3 flex justify-between items-center cursor-pointer 
                  hover:border-white/40 transition-all ${isActive ? 'bg-black/50' : ''}`}
              >
                <div className="flex items-center gap-2">
                  {flavorForSlot ? (
                    <>
                      <div className={`w-3 h-3 rounded-full bg-${color}-500 shadow-sm shadow-${color}-500/30`}></div>
                      <span>{flavorForSlot}</span>
                    </>
                  ) : (
                    <span className="text-gray-400">Select a flavor</span>
                  )}
                </div>
                
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
              
              {/* Flavor dropdown for this slot */}
              {isActive && (
                <div className="absolute left-0 right-0 mt-1 z-20 rounded-xl bg-black/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-fuchsia-500/10 overflow-hidden transition-all duration-200">
                  <div className="py-1 max-h-40 overflow-auto">
                    {FLAVORS.map(flavor => {
                      const colorKey = flavor as keyof typeof FLAVOR_COLORS;
                      const color = FLAVOR_COLORS[colorKey] || "fuchsia";
                      const isSelected = flavorForSlot === flavor;
                      
                      return (
                        <div
                          key={`slot-${slotIndex}-flavor-${flavor}`}
                          className={`flex items-center gap-2 px-4 py-2.5 cursor-pointer hover:bg-white/5 transition-colors ${isSelected ? 'bg-white/10' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setFlavorAtSlot(flavor, slotIndex);
                          }}
                        >
                          <div className={`w-3 h-3 rounded-full bg-${color}-500 shadow-sm shadow-${color}-500/30`}></div>
                          <span className={`hover:text-white transition-colors ${isSelected ? 'text-white' : ''}`}>
                            {flavor}
                          </span>
                          
                          {isSelected && (
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`ml-auto h-4 w-4 text-${color}-500`} 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path 
                                fillRule="evenodd" 
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                                clipRule="evenodd" 
                              />
                            </svg>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
    
    </div>
  );
}; 