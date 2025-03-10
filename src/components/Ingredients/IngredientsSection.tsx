/**
 * IngredientsSection Component
 * 
 * Displays the ingredients used in RaveRemedy with detailed information.
 */

import React from 'react';
import { IngredientsHeader } from './IngredientsHeader';
import { IngredientsList } from './IngredientsList';

export const IngredientsSection: React.FC = () => {
  return (
    <div className="relative py-16 overflow-hidden" id="ingredients-section">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/30 to-black" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')] opacity-5 mix-blend-overlay" />
        
        {/* Animated particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-[#ff00ff]/5 to-[#00ffff]/5 blur-3xl animate-pulse" />
          <div className="absolute top-40 right-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-[#00ffff]/5 to-[#ff00ff]/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-1/3 w-40 h-40 rounded-full bg-gradient-to-r from-[#ff00ff]/5 to-purple-500/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 right-1/4 w-36 h-36 rounded-full bg-gradient-to-r from-purple-500/5 to-[#00ffff]/5 blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Ingredient powder decorative image in the background */}
        <div className="absolute -top-10 -right-32 w-64 h-64 opacity-10 rotate-12">
          <img src="/Turmeric Vibrant yellow-orange-1.png" alt="Decorative ingredient" className="w-full h-full object-contain" />
        </div>
        <div className="absolute -bottom-10 -left-32 w-64 h-64 opacity-10 -rotate-12">
          <img src="/Ashwagandha Light beige-2.png" alt="Decorative ingredient" className="w-full h-full object-contain" />
        </div>
        
        {/* Main content */}
        <div className="relative z-10">
          <IngredientsHeader />
          <div className="mt-4 mb-8 max-w-3xl mx-auto text-center text-gray-300">
            <p>Our premium recovery formula contains scientifically-backed ingredients to help you bounce back fast. Each ingredient is carefully selected for optimal absorption and effectiveness.</p>
          </div>
          <IngredientsList />
        </div>
      </div>
    </div>
  );
};