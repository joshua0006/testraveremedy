/**
 * IngredientsHeader Component
 * 
 * Displays the header section for ingredients list.
 */

import React from 'react';

export const IngredientsHeader: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-block mb-4">
        <span className="px-4 py-1 bg-purple-900/30 rounded-full text-[#ff00ff] text-sm font-medium uppercase tracking-wider border border-[#ff00ff]/20">
          Premium Quality
        </span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-6 relative">
        <span className="gradient-text relative z-10">What's in Every Scoop?</span>
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-[#ff00ff]/0 via-[#ff00ff]/50 to-[#ff00ff]/0"></div>
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        At RaveRemedy, we've carefully crafted our Post-party Pack to provide you with the essential vitamins and minerals your body needs to recover and thrive.
      </p>
    </div>
  );
};