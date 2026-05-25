'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DirectoryTopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeAudience: string;
  onSelectAudience: (audience: string) => void;
  paddingX?: string;
}

const AUDIENCES = [
  { label: '-Any-', value: '-Any-' },
  { label: 'Alumni', value: 'Alumni' },
  { label: 'Faculty', value: 'Faculty' },
  { label: 'Researchers', value: 'Researchers' },
  { 
    label: 'Students', 
    value: 'Students',
    subItems: [
      { label: 'Undergrads', value: 'Undergrads' },
      { label: 'Grads', value: 'Grads' }
    ]
  }
];

const DirectoryTopBar: React.FC<DirectoryTopBarProps> = ({
  searchQuery,
  onSearchChange,
  activeAudience,
  onSelectAudience,
  paddingX = '0px',
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center w-full py-4 bg-white" style={{ paddingLeft: paddingX, paddingRight: paddingX }}>
      {/* Search Bar Content Container - now full width of screen */}
      <div className="flex-1 flex items-center gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search"
            className="w-full h-[40px] px-4 bg-[#FFFFFF] border border-[#E5E5E5] focus:border-[#265D38] outline-none text-[14px] text-[#383838] placeholder:text-[#383838]/40 transition-all duration-200 rounded-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#383838]/40">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        {/* Audience Dropdown */}
        <div className="relative pr-4" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`
            flex items-center justify-between w-[200px] h-[40px] px-4 border text-[14px] transition-all duration-200 rounded-none
            ${isDropdownOpen ? 'border-[#265D38] bg-white text-[#383838]' : 'border-[#E5E5E5] bg-white text-[#383838] hover:bg-[#F9F9F9]'}
          `}
        >
          <span className="truncate">
            {activeAudience === '-Any-' ? 'Audience Type' : activeAudience}
          </span>
          <motion.div
            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
            className="text-[#383838]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute right-0 mt-1 w-full bg-white border border-[#E5E5E5] shadow-lg z-50 overflow-hidden rounded-none"
            >
              <div className="py-1">
                {AUDIENCES.map((item) => (
                  <div key={item.value}>
                    <button
                      onClick={() => {
                        onSelectAudience(item.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`
                        w-full px-4 py-2 text-left text-[14px] transition-colors duration-200 flex items-center justify-between
                        ${activeAudience === item.value ? 'bg-[#3183CB] text-white' : 'hover:bg-[#F5F5F5] text-[#383838]'}
                      `}
                    >
                      {item.label}
                      {activeAudience === item.value && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </button>
                    
                    {item.subItems && item.subItems.map((subItem) => (
                      <button
                        key={subItem.value}
                        onClick={() => {
                          onSelectAudience(subItem.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`
                          w-full pl-8 pr-4 py-2 text-left text-[14px] transition-colors duration-200 flex items-center justify-between
                          ${activeAudience === subItem.value ? 'bg-[#3183CB] text-white' : 'hover:bg-[#F5F5F5] text-[#383838]'}
                        `}
                      >
                        {subItem.label}
                        {activeAudience === subItem.value && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  </div>
);
};

export default DirectoryTopBar;
