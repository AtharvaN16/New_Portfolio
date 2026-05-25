'use client';

import React from 'react';
import { Inter } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { LIBRARY_DIRECTORY_DATA } from '@/lib/data/library-directory-data';

const inter = Inter({ subsets: ['latin'] });

interface LibraryServicesHeroProps {
  bookmarks: Record<string, boolean>;
  onToggleBookmark: (id: string) => void;
  onScrollToDirectory: () => void;
}

const ServiceCard = ({ 
  title, 
  description, 
}: { 
  title: string; 
  description: string; 
}) => (
  <div className="bg-white p-4 relative flex flex-col min-h-[160px] group transition-all duration-200 border-none rounded-none shadow-sm hover:shadow-md">
    <h3 className="text-[#265D38] text-[14px] font-semibold mb-3 group-hover:underline decoration-1 underline-offset-2">
      {title}
    </h3>
    <p className="text-[#383838] text-[12px] leading-relaxed opacity-90">
      {description}
    </p>
  </div>
);

const LibraryServicesHero: React.FC<LibraryServicesHeroProps> = ({
  bookmarks,
  onToggleBookmark,
  onScrollToDirectory,
}) => {
  const allServices = LIBRARY_DIRECTORY_DATA.flatMap(cat => cat.services);
  
  const popularServiceNames = [
    "Book a Study Space",
    "Citation Guides",
    "All Library Hours",
    "Off-Campus Access",
    "Interlibrary Loan",
    "Borrower Services + Library Cards"
  ];

  const popularServices = popularServiceNames
    .map(name => allServices.find(s => s.title === name))
    .filter((s): s is any => s !== undefined);

  return (
    <div className={`w-full py-16 px-10 ${inter.className}`}>
      <div className="flex flex-col">
        {/* Breadcrumb - scaled down */}
        <div className="flex items-center gap-2 mb-8 text-[10px] text-white/80 font-medium uppercase tracking-wider">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          <span>/</span>
          <span>Library Services</span>
        </div>

        <h1 className="text-[#FFF0A0] text-[36px] font-bold mb-12 leading-tight tracking-tight">
          Library Services
        </h1>

        {/* Popular Services Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white text-[20px] font-bold tracking-tight">
              Popular Services
            </h2>
            <button 
              onClick={onScrollToDirectory}
              className="text-[14px] font-bold text-[#004C2E] hover:text-white transition-colors flex items-center gap-2 group tracking-wide"
            >
              Go to all services 
              <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {popularServices.map((service) => (
              <ServiceCard 
                key={service.title}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryServicesHero;
