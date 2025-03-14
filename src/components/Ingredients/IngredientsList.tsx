/**
 * IngredientsList Component
 * 
 * Displays the scrolling list of ingredients with detailed information.
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { INGREDIENTS } from './ingredients.data';
import { IngredientModal } from './IngredientModal';

export const IngredientsList: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<typeof INGREDIENTS[0] | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.querySelector('.ingredients-scroll-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => handleScroll('left')}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/80 p-2 rounded-full border border-[#ff00ff]/20 text-white/60 hover:text-white transition-colors hover:bg-black"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={() => handleScroll('right')}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/80 p-2 rounded-full border border-[#ff00ff]/20 text-white/60 hover:text-white transition-colors hover:bg-black"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="overflow-x-auto hide-scrollbar ingredients-scroll-container">
        <div className="flex gap-6 py-8 px-12">
          {INGREDIENTS.map((ingredient, index) => (
            <div 
              key={index}
              onClick={() => setSelectedIngredient(ingredient)}
              className="flex-shrink-0"
              role="button"
              tabIndex={0}
              aria-label={`View details for ${ingredient.name}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedIngredient(ingredient);
                }
              }}
            >
              <div className="group relative glass-panel rounded-xl p-6 border border-white/10 hover:border-[#ff00ff]/20 hover-glow cursor-pointer overflow-hidden h-[300px] w-[240px] transition-all duration-300 transform hover:scale-[1.02]">
                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ff00ff]/10 to-[#00ffff]/10 rounded-full blur-2xl transform translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#ff00ff]/10 to-[#00ffff]/10 rounded-full blur-2xl transform -translate-x-6 translate-y-6 group-hover:scale-150 transition-transform duration-500" />
                
                <div className="relative flex flex-col items-center justify-center text-center h-full">
                  {/* Powder image */}
                  <div className="w-32 h-32 mb-6 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-black/10 to-purple-900/10 blur-md group-hover:opacity-70 transition-opacity duration-300"></div>
                    <img 
                      src={ingredient.image} 
                      alt={ingredient.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(255,0,255,0.4)]"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Ingredient info */}
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-white group-hover:from-[#ff66ff] group-hover:to-[#00ffff] bg-clip-text text-transparent transition-colors duration-300">
                    {ingredient.name}
                  </h3>
                  <p className="text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                    {ingredient.desc}
                  </p>
                  
                  {/* View details hint */}
                  <div className="absolute bottom-4 w-full left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-[#ff00ff]">
                    Click for details
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedIngredient && (
        <IngredientModal 
          ingredient={selectedIngredient} 
          onClose={() => setSelectedIngredient(null)} 
        />
      )}
    </div>
  );
};