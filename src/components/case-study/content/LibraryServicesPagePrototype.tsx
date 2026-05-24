'use client';

import React, { useState, useRef } from 'react';
import LibraryServicesNavbar from './LibraryServicesNavbar';
import LibraryServicesHero from './LibraryServicesHero';
import LibraryServicesDirectory from './LibraryServicesDirectory';

const LibraryServicesPagePrototype: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const directoryRef = useRef<HTMLDivElement>(null);

  const toggleBookmark = (title: string) => {
    setBookmarks(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const scrollToDirectory = () => {
    directoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full bg-white overflow-hidden rounded-xl border border-gray-200 shadow-2xl max-h-[800px] overflow-y-auto">
      <LibraryServicesNavbar />
      <LibraryServicesHero 
        bookmarks={bookmarks} 
        onToggleBookmark={toggleBookmark}
        onScrollToDirectory={scrollToDirectory}
      />
      <div ref={directoryRef}>
        <LibraryServicesDirectory 
          bookmarks={bookmarks} 
          onToggleBookmark={toggleBookmark}
        />
      </div>
    </div>
  );
};

export default LibraryServicesPagePrototype;
