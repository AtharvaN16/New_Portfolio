'use client';

import React from 'react';
import { Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import { LIBRARY_DIRECTORY_DATA } from '@/lib/data/library-directory-data';

const inter = Inter({ subsets: ['latin'] });

interface LibraryServicesHeroProps {
  bookmarks: Record<string, boolean>;
  onToggleBookmark: (id: string) => void;
  onScrollToDirectory: () => void;
}

const BookmarkIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill={active ? "#245D3A" : "none"} stroke="#245D3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const ServiceCard = ({ 
  title, 
  description, 
  isBookmarked, 
  onToggle 
}: { 
  title: string; 
  description: string; 
  isBookmarked: boolean; 
  onToggle: () => void;
}) => (
  <div className="bg-white p-6 relative flex flex-col min-h-[160px] group transition-all duration-200 hover:shadow-lg">
    <button 
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <BookmarkIcon active={isBookmarked} />
    </button>
    <h3 className="text-[#265D38] text-[18px] font-bold pr-8 mb-2 group-hover:underline decoration-1 underline-offset-2">
      {title}
    </h3>
    <p className="text-[#383838] text-[14px] leading-relaxed line-clamp-3">
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

  const bookmarkedServices = Object.keys(bookmarks)
    .filter(title => bookmarks[title])
    .map(title => allServices.find(s => s.title === title))
    .filter((s): s is any => s !== undefined)
    .slice(0, 6);

  return (
    <div className={`w-full py-20 px-6 md:px-12 bg-[linear-gradient(111deg,#245D3A_3.15%,#FFF0A0_98.1%)] ${inter.className}`}>
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-[#FFF0A0] text-[48px] md:text-[72px] font-bold mb-16 leading-tight tracking-tight">
          Library Services
        </h1>

        {/* Popular Services Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white text-[24px] font-bold">
              Popular Services
            </h2>
            <button 
              onClick={onScrollToDirectory}
              className="text-[14px] font-semibold text-white/90 hover:text-white transition-colors flex items-center gap-2 group"
            >
              Go to all services 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularServices.map((service) => (
              <ServiceCard 
                key={service.title}
                title={service.title}
                description={service.description}
                isBookmarked={bookmarks[service.title] || false}
                onToggle={() => onToggleBookmark(service.title)}
              />
            ))}
          </div>
        </div>

        {/* Your Services Section */}
        {bookmarkedServices.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h2 className="text-white text-[24px] font-bold mb-8">
              Your Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedServices.map((service) => (
                <ServiceCard 
                  key={`your-${service.title}`}
                  title={service.title}
                  description={service.description}
                  isBookmarked={true}
                  onToggle={() => onToggleBookmark(service.title)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LibraryServicesHero;
