'use client';

import React, { useState } from 'react';
import { LibraryServiceItem } from './LibraryServiceItem';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const SERVICES_DATA = [
  {
    id: 'accessibility',
    title: 'Accessibility Services',
    description: 'Support and resources to ensure an inclusive library experience for all users.',
  },
  {
    id: 'alumni',
    title: 'Alumni Services',
    description: 'Resources and services available to UofA Alumni.',
  },
  {
    id: 'borrower',
    title: 'Borrower Services + Library Cards',
    description: 'Information on borrowing materials, renewing items, and obtaining a library card.',
  },
  {
    id: 'distance',
    title: 'Distance Services',
    description: 'Delivery of library materials to your home or work address.',
  },
  {
    id: 'interlibrary',
    title: 'Interlibrary Loan',
    description: 'A service that allows you to borrow materials from other libraries not available in our collection.',
  },
];

export const LibraryBasicsPrototype: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={`w-full ${inter.className}`}>
      <div
        className="relative w-full overflow-hidden rounded-none"
        style={{
          background: 'linear-gradient(295deg, #225432 11.56%, #36A459 88.84%)',
          padding: '64px 64px 0 64px',
          height: '520px', // Reduced from 620px to clip more from bottom
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}
      >
        <div
          className="w-full bg-white p-10 shadow-[0_-15px_40px_rgba(0,0,0,0.1)] flex flex-col rounded-none mx-auto"
          style={{ 
            height: '460px', // Reduced height to fit clipped frame
            maxWidth: '100%' 
          }}
        >
          {/* Header */}
          <div className="flex-shrink-0 mb-4">
            <h2 className="text-[#265D38] text-[20px] font-bold leading-tight">
              Library Basics
            </h2>
          </div>

          {/* Services List */}
          <div className="flex-1">
            <div className="flex flex-col">
              {SERVICES_DATA.map((service) => (
                <LibraryServiceItem
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  isBookmarked={!!bookmarks[service.id]}
                  onToggleBookmark={() => toggleBookmark(service.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryBasicsPrototype;
