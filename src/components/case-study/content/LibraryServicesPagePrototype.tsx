'use client';

import React, { useState, useRef } from 'react';
import LibraryServicesNavbar from './LibraryServicesNavbar';
import LibraryServicesHero from './LibraryServicesHero';
import LibraryServicesDirectory from './LibraryServicesDirectory';

const LibraryServicesPagePrototype: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const directoryRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleBookmark = (title: string) => {
    setBookmarks(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const scrollToDirectory = () => {
    if (directoryRef.current) {
      directoryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full mx-auto overflow-hidden">
      {/* Outer Presentation Frame (Original Green Gradient) */}
      <div 
        className="relative w-full overflow-hidden rounded-none border-none shadow-2xl"
        style={{
          background: 'linear-gradient(295deg, #225432 11.56%, #36A459 88.84%)',
          height: '1100px', // Fixed frame height
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '80px 48px 0 48px' // Slightly lower (80px top padding)
        }}
      >
        {/* Inner Scrollable "Screen" Card */}
        <div 
          ref={scrollContainerRef}
          className="w-full bg-white flex flex-col overflow-y-auto rounded-none border-none shadow-none scroll-smooth"
          data-lenis-prevent="true"
          style={{ 
            height: '1100px' // Taller prototype to exceed/fill frame
          }}
        >
          <LibraryServicesNavbar />
          
          {/* Hero Section with its specific Green-to-Gold Gradient */}
          <div style={{ background: 'linear-gradient(111deg, #245D3A 3.15%, #FFF0A0 98.1%)' }}>
            <LibraryServicesHero 
              bookmarks={bookmarks} 
              onToggleBookmark={toggleBookmark}
              onScrollToDirectory={scrollToDirectory}
            />
          </div>
          
          {/* Directory UI on white background, below hero, full width */}
          <div 
            ref={directoryRef} 
            className="w-full" 
          >
            <LibraryServicesDirectory 
              bookmarks={bookmarks} 
              onToggleBookmark={toggleBookmark}
              height="800px"
              paddingX="40px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryServicesPagePrototype;
