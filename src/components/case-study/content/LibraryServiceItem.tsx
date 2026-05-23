'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LibraryServiceItemProps {
  title: string;
  description: string;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

const BookmarkAddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 2C7.22876 2 5.34315 2 4.17157 3.12874C3 4.25748 3 6.07416 3 9.70753V17.9808C3 20.2867 3 21.4396 3.77285 21.8523C5.26947 22.6514 8.0768 19.9852 9.41 19.1824C10.1832 18.7168 10.5698 18.484 11 18.484C11.4302 18.484 11.8168 18.7168 12.59 19.1824C13.9232 19.9852 16.7305 22.6514 18.2272 21.8523C19 21.4396 19 20.2867 19 17.9808V13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    <path d="M17 10L17 2M13 6H21" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
  </svg>
);

const BookmarkOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 19.9429C19.9381 20.9761 19.7617 21.5725 19.259 21.8481C17.7592 22.6701 14.946 19.9276 13.61 19.1019C12.8352 18.623 12.4478 18.3836 12.0167 18.3836C11.5856 18.3836 11.1982 18.623 10.4234 19.1019C9.08741 19.9276 6.27421 22.6701 4.77446 21.8481C4 21.4236 4 20.2377 4 17.866V9.35632C4 7.18055 4 5.63815 4.23168 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    <path d="M20 16V9.70753C20 6.07416 20 4.25748 18.8284 3.12874C17.6569 2 15.7712 2 12 2C9.39647 2 7.69163 2 6.5 2.37139" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    <path d="M2 2L22 22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

export const LibraryServiceItem: React.FC<LibraryServiceItemProps> = ({
  title,
  description,
  isBookmarked: isBookmarkedProp,
  onToggleBookmark,
}) => {
  const [internalIsBookmarked, setInternalIsBookmarked] = useState(false);

  const isBookmarked = isBookmarkedProp !== undefined ? isBookmarkedProp : internalIsBookmarked;

  const handleToggle = () => {
    setInternalIsBookmarked(!internalIsBookmarked);
    if (onToggleBookmark) {
      onToggleBookmark();
    }
  };

  return (
    <motion.div
      className="group py-6 border-b border-[#E5E5E5] last:border-0 flex justify-between items-start"
      initial="initial"
      whileHover="hover"
    >
      <div className="flex-1 pr-8">
        <div className="flex items-center gap-3 mb-1">
          <h4 className="text-[#265D38] text-[20px] font-semibold transition-colors duration-200 group-hover:text-[#1a4127] relative inline-block cursor-pointer">
            {title}
            <motion.span
              className="absolute left-0 bottom-0 w-full h-[1px] bg-[#265D38] origin-left"
              variants={{
                initial: { scaleX: 0 },
                hover: { scaleX: 1 }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </h4>
          <AnimatePresence>
            {isBookmarked && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-[#265D38] text-[14px] font-medium"
              >
                Bookmarked
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <p className="text-[#383838] text-[16px] leading-relaxed">
          {description}
        </p>
      </div>

      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
        variants={{
          initial: { opacity: 0, x: 10 },
          hover: { opacity: 1, x: 0 }
        }}
        className="text-[#265D38] p-2 outline-none hover:scale-110 active:scale-95"
        aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        {isBookmarked ? <BookmarkOffIcon /> : <BookmarkAddIcon />}
      </motion.button>
    </motion.div>
  );
};
