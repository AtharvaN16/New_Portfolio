'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DirectorySidebarProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const DirectorySidebar: React.FC<DirectorySidebarProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <aside className="w-full h-full bg-white">
      <nav className="flex flex-col py-4">
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`
                relative flex items-center px-6 py-4 text-left transition-colors duration-200
                ${isActive ? 'bg-[#F9F9F9]' : 'hover:bg-[#F5F5F5]'}
              `}
            >
              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeCategoryIndicator"
                  className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#EAB308]"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}

              <span
                className={`
                  text-[16px] transition-colors duration-200
                  ${isActive ? 'text-[#265D38] font-bold' : 'text-[#383838] font-normal'}
                `}
              >
                {category}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default DirectorySidebar;
