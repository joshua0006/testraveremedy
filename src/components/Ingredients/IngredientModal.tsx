/**
 * IngredientModal Component
 * 
 * Displays detailed information about a selected ingredient.
 */

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import type { INGREDIENTS } from './ingredients.data';

interface IngredientModalProps {
  ingredient: typeof INGREDIENTS[0];
  onClose: () => void;
}

export const IngredientModal: React.FC<IngredientModalProps> = ({ 
  ingredient, 
  onClose 
}) => {
  // Add keyboard event listener to close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const formatDetails = (details: string) => {
    return details.split('\n').map((line, index) => {
      if (line.startsWith('•')) {
        const [bullet, ...content] = line.split('**');
        const [boldText, ...rest] = content.join('').split('**');
        return (
          <div key={index} className="flex items-start space-x-2 mb-3">
            <span className="text-[#ff00ff]">•</span>
            <p className="text-gray-300">
              <strong className="text-[#ff00ff]">{boldText}</strong>
              {rest}
            </p>
          </div>
        );
      }
      return <p key={index} className="text-gray-300">{line}</p>;
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ingredient-modal-title"
    >
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-black/90 rounded-2xl border border-[#ff00ff]/20 p-8 max-w-2xl w-full hover-glow overflow-y-auto max-h-[90vh] animate-slide-up">
        {/* Decorative elements */}
        <div className="absolute -z-10 top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#ff00ff]/10 to-[#00ffff]/10 rounded-full blur-3xl"></div>
        <div className="absolute -z-10 bottom-0 left-0 w-40 h-40 bg-gradient-to-tl from-[#ff00ff]/10 to-[#00ffff]/10 rounded-full blur-3xl"></div>
        
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-12 h-12 flex items-center justify-center bg-black/90 rounded-full border border-[#ff00ff]/20 text-white/60 hover:text-white transition-colors shadow-lg shadow-[#ff00ff]/10"
          aria-label="Close details"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          {/* Powder image with enhanced visual effects */}
          <div className="w-40 h-40 relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff00ff]/5 to-[#00ffff]/5 rounded-full blur-md"></div>
            <div className="absolute inset-0 border-2 border-[#ff00ff]/10 rounded-full"></div>
            <img 
              src={ingredient.image}
              alt={ingredient.name}
              className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,0,255,0.4)] p-2"
            />
          </div>
          
          <div>
            <h2 id="ingredient-modal-title" className="text-3xl font-bold gradient-text mb-3 text-center md:text-left">
              {ingredient.name}
            </h2>
            <div className="inline-block px-3 py-1 rounded-full bg-[#ff00ff]/10 text-[#ff00ff] text-sm mb-4">
              {ingredient.desc}
            </div>
            <div className="text-gray-300 mt-2">
              <p>This premium ingredient is a key component in our recovery formula, helping to restore your body and mind after intense experiences.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#ff00ff]/10 pt-6 mt-6">
          <h3 className="text-xl font-bold gradient-text mb-4">Benefits & Properties</h3>
          <div className="space-y-2">
            {formatDetails(ingredient.details)}
          </div>
        </div>
      </div>
    </div>
  );
};