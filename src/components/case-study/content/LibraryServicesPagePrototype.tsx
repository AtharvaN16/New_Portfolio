'use client';

import React, { useState, useRef } from 'react';
import LibraryServicesNavbar from './LibraryServicesNavbar';
import LibraryServicesHero from './LibraryServicesHero';
import LibraryServicesDirectory from './LibraryServicesDirectory';
import {
  PrototypePresentationShell,
  type PrototypeVariant,
} from './ualberta/PrototypePresentationShell';

interface LibraryServicesPagePrototypeProps {
  variant?: PrototypeVariant;
}

const LibraryServicesPagePrototype: React.FC<LibraryServicesPagePrototypeProps> = ({
  variant = 'embedded',
}) => {
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const directoryRef = useRef<HTMLDivElement>(null);

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
    <PrototypePresentationShell
      variant={variant}
      innerClassName="w-full bg-white flex flex-col rounded-none border-none shadow-none"
      innerStyle={variant === 'embedded' ? { height: '1100px' } : undefined}
    >
      <LibraryServicesNavbar />

      <div style={{ background: 'linear-gradient(111deg, #245D3A 3.15%, #FFF0A0 98.1%)' }}>
        <LibraryServicesHero
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
          onScrollToDirectory={scrollToDirectory}
        />
      </div>

      <div ref={directoryRef} className="w-full">
        <LibraryServicesDirectory
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
          height="800px"
          paddingX="40px"
        />
      </div>
    </PrototypePresentationShell>
  );
};

export default LibraryServicesPagePrototype;
