'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isRevealed, setIsRevealed] = useState(false);
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={`w-full max-w-[1044px] mx-auto ${inter.className}`}>
      <motion.div
        className="relative w-full aspect-[16/9] overflow-hidden cursor-pointer rounded-none"
        style={{
          background: 'linear-gradient(295deg, #225432 11.56%, #36A459 88.84%)',
        }}
        onHoverStart={() => setIsRevealed(true)}
        onHoverEnd={() => setIsRevealed(false)}
        onClick={() => setIsRevealed(!isRevealed)}
      >
        <motion.div
          className="absolute left-[64px] right-[64px] top-[64px] bottom-0 bg-white p-16 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] flex flex-col"
          initial={{ y: 'calc(100% - 140px)' }}
          animate={{ y: isRevealed ? '0%' : 'calc(100% - 140px)' }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 24,
            mass: 1,
          }}
          style={{
            borderTopLeftRadius: '32px',
            borderTopRightRadius: '32px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
          }}
        >
          {/* Header - Always visible when peeking */}
          <div className="flex-shrink-0 mb-8">
            <h2 className="text-[#265D38] text-[32px] font-bold leading-tight">
              Library Basics
            </h2>
          </div>

          {/* Services List */}
          <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#265D38]/20 scrollbar-track-transparent">
            <div className="space-y-2">
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
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LibraryBasicsPrototype;
