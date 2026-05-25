'use client';

import React, { useRef } from 'react';
import { Inter } from 'next/font/google';
import LibraryHoursSidebar from './LibraryHoursSidebar';
import LibraryLocationCard from './LibraryLocationCard';
import { LIBRARY_HOURS_DATA } from '@/lib/data/library-hours-data';
import LibraryServicesNavbar from './LibraryServicesNavbar';

const inter = Inter({ subsets: ['latin'] });

const SectionHeading = ({ label }: { label: string }) => (
  <div className="flex items-center gap-6 mb-8">
    <h2 className="text-[#383838] text-[16px] font-bold whitespace-nowrap">{label}</h2>
    <div className="h-[1px] flex-1 bg-[#E0E0E0]" />
  </div>
);

export const LibraryHoursPagePrototype: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const edmontonLibraries = LIBRARY_HOURS_DATA.filter((l) => l.campus === 'Edmonton');
  const augustanaSaintJeanLibraries = LIBRARY_HOURS_DATA.filter(
    (l) => l.campus === 'Augustana' || l.campus === 'Saint-Jean'
  );
  const specialCollections = LIBRARY_HOURS_DATA.filter((l) => l.campus === 'Special Collections');

  return (
    <div className={`w-full mx-auto overflow-hidden ${inter.className}`}>
      <div
        className="relative w-full overflow-hidden rounded-none border-none shadow-2xl"
        style={{
          background: 'linear-gradient(295deg, #225432 11.56%, #36A459 88.84%)',
          height: '1100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '80px 48px 0 48px',
        }}
      >
        <div
          ref={scrollContainerRef}
          className="w-full bg-[#F7F7F7] flex flex-col overflow-y-auto rounded-none border-none shadow-none scroll-smooth"
          data-lenis-prevent="true"
          style={{ height: '1100px' }}
        >
          <LibraryServicesNavbar />

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="flex-shrink-0">
              <LibraryHoursSidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pl-14 pr-10 pt-10 pb-10">
              {/* Page Header */}
              <h1 className="text-[#1F5C35] text-[22px] font-bold mb-4 tracking-tight leading-tight">
                Library Hours &amp; Locations
              </h1>

              {/* Map Button */}
              <button className="flex items-center gap-1.5 bg-[#265D38] hover:bg-[#1F4A2C] text-white text-[11px] font-medium px-3 py-2 rounded-sm mb-5 transition-colors">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                See a map of all library locations
              </button>

              {/* Jump to Category */}
              <div className="mb-10">
                <p className="text-[13px] text-[#383838] font-medium mb-1.5">Jump to category:</p>
                <div className="flex items-center gap-0">
                  <a href="#edmonton" className="text-[#265D38] text-[11px] font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">
                    On Edmonton Campus
                  </a>
                  <span className="mx-3 text-[#BDBDBD] text-[11px]">|</span>
                  <a href="#augustana" className="text-[#265D38] text-[11px] font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">
                    On Augustana &amp; Saint-Jean Campus
                  </a>
                  <span className="mx-3 text-[#BDBDBD] text-[11px]">|</span>
                  <a href="#special" className="text-[#265D38] text-[11px] font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity">
                    Special Collections and Archives
                  </a>
                </div>
              </div>

              {/* Edmonton Section */}
              <section id="edmonton" className="mb-14">
                <SectionHeading label="On Edmonton Campus" />
                <div className="space-y-6">
                  {edmontonLibraries.map((library) => (
                    <LibraryLocationCard key={library.id} library={library} />
                  ))}
                </div>
              </section>

              {/* Augustana & Saint-Jean Section */}
              <section id="augustana" className="mb-14">
                <SectionHeading label="On Augustana &amp; Saint-Jean Campus" />
                <div className="space-y-6">
                  {augustanaSaintJeanLibraries.map((library) => (
                    <LibraryLocationCard key={library.id} library={library} />
                  ))}
                </div>
              </section>

              {/* Special Collections Section */}
              <section id="special" className="mb-14">
                <SectionHeading label="Special Collections and Archives" />
                <div className="space-y-6">
                  {specialCollections.map((library) => (
                    <LibraryLocationCard key={library.id} library={library} />
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryHoursPagePrototype;
