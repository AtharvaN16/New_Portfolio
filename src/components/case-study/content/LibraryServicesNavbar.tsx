'use client';

import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const LibraryServicesNavbar: React.FC = () => {
  return (
    <nav className={`w-full h-[64px] bg-[#245D3A] flex items-center justify-between px-6 text-white ${inter.className}`}>
      {/* Left section: Logo and Links */}
      <div className="flex items-center gap-8 h-full">
        {/* Logo Placeholder - stylized UAlberta style */}
        <div className="flex items-center gap-2">
           <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="4" fill="white"/>
            <path d="M10 10H30V30H10V10Z" fill="#245D3A"/>
            <path d="M15 15H25V25H15V15Z" fill="white"/>
          </svg>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-[14px] font-medium h-full">
          <a href="#" className="hover:underline underline-offset-4 decoration-2">Library Services</a>
          <a href="#" className="hover:underline underline-offset-4 decoration-2">Subject Guides</a>
          <a href="#" className="hover:underline underline-offset-4 decoration-2">Hours + Locations</a>
          <a href="#" className="hover:underline underline-offset-4 decoration-2">My Account</a>
          <a href="#" className="hover:underline underline-offset-4 decoration-2">Ask Us</a>
        </div>
      </div>

      {/* Right section: Icons and Language */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Dark Mode Toggle Placeholder */}
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Toggle dark mode">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </button>

        {/* Language */}
        <button className="text-[14px] font-medium hover:underline underline-offset-4 decoration-2">
          Français
        </button>

        {/* Search */}
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Search site">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default LibraryServicesNavbar;
