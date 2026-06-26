'use client';

import React, { useRef } from 'react';
import { MaterialSymbolsFont } from '@/components/case-study/MaterialSymbolsFont';
import LibraryHoursSidebar from './LibraryHoursSidebar';
import LibraryLocationCard from './LibraryLocationCard';
import {
  HoursLocationCardSpotlight,
  isCameronSpotlightLibrary,
} from './ualberta/HoursLocationCardSpotlight';
import { LIBRARY_HOURS_DATA } from '@/lib/data/library-hours-data';
import LibraryServicesNavbar from './LibraryServicesNavbar';
import {
  PrototypePresentationShell,
  type PrototypeVariant,
} from './ualberta/PrototypePresentationShell';
import { smoothScrollToId } from './ualberta/smoothScrollToId';
import { ualbertaPrototypeInter } from './ualberta/ualbertaPrototypeFont';

const CATEGORY_JUMPS = [
  { id: 'edmonton', label: 'On Edmonton Campus' },
  { id: 'augustana', label: 'On Augustana & Saint-Jean Campus' },
  { id: 'special', label: 'Special Collections and Archives' },
] as const;

const handleCategoryJump = (
  event: React.MouseEvent<HTMLButtonElement>,
  id: string
) => {
  event.preventDefault();
  smoothScrollToId(id);
};

const SectionHeading = ({ label }: { label: string }) => (
  <div className="flex items-center gap-6 mb-8">
    <h2 className="text-[#383838] text-[16px] font-bold whitespace-nowrap">{label}</h2>
    <div className="h-[1px] flex-1 bg-[#E0E0E0]" />
  </div>
);

interface LibraryHoursPagePrototypeProps {
  variant?: PrototypeVariant;
}

export const LibraryHoursPagePrototype: React.FC<LibraryHoursPagePrototypeProps> = ({
  variant = 'embedded',
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isFullscreen = variant === 'fullscreen';

  const edmontonLibraries = LIBRARY_HOURS_DATA.filter((l) => l.campus === 'Edmonton');
  const augustanaSaintJeanLibraries = LIBRARY_HOURS_DATA.filter(
    (l) => l.campus === 'Augustana' || l.campus === 'Saint-Jean'
  );
  const specialCollections = LIBRARY_HOURS_DATA.filter((l) => l.campus === 'Special Collections');

  return (
    <>
      <MaterialSymbolsFont />
      <PrototypePresentationShell
      variant={variant}
      outerClassName={ualbertaPrototypeInter.className}
      innerClassName="w-full bg-[#F7F7F7] flex flex-col rounded-none border-none shadow-none"
      innerStyle={isFullscreen ? undefined : { height: '1100px' }}
    >
      <div ref={isFullscreen ? undefined : scrollContainerRef} className="flex flex-col">
        <LibraryServicesNavbar />

        <div className={`flex ${isFullscreen ? '' : 'flex-1 overflow-hidden'}`}>
          <div className="flex-shrink-0">
            <LibraryHoursSidebar />
          </div>

          <main
            className="flex-1 overflow-y-auto scroll-smooth pl-14 pr-10 pt-10 pb-10"
          >
            <h1 className="text-[#1F5C35] text-[22px] font-bold mb-4 tracking-tight leading-tight">
              Library Hours &amp; Locations
            </h1>

            <button className="flex items-center gap-1.5 bg-[#265D38] hover:bg-[#1F4A2C] text-white text-[11px] font-medium px-3 py-2 rounded-sm mb-5 transition-colors">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              See a map of all library locations
            </button>

            <div className="mb-10">
              <p className="text-[13px] text-[#383838] font-medium mb-1.5">Jump to category:</p>
              <div className="flex items-center gap-0">
                {CATEGORY_JUMPS.map((category, index) => (
                  <React.Fragment key={category.id}>
                    {index > 0 ? (
                      <span className="mx-3 text-[#BDBDBD] text-[11px]">|</span>
                    ) : null}
                    <button
                      type="button"
                      onClick={(event) => handleCategoryJump(event, category.id)}
                      className="text-[#265D38] text-[11px] font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity"
                    >
                      {category.label}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <section id="edmonton" className="mb-14 scroll-mt-10">
              <SectionHeading label="On Edmonton Campus" />
              <div className="space-y-6">
                {edmontonLibraries.map((library) =>
                  isFullscreen && isCameronSpotlightLibrary(library) ? (
                    <HoursLocationCardSpotlight
                      key={library.id}
                      library={library}
                      enabled
                    />
                  ) : (
                    <LibraryLocationCard key={library.id} library={library} />
                  )
                )}
              </div>
            </section>

            <section id="augustana" className="mb-14 scroll-mt-10">
              <SectionHeading label="On Augustana &amp; Saint-Jean Campus" />
              <div className="space-y-6">
                {augustanaSaintJeanLibraries.map((library) => (
                  <LibraryLocationCard key={library.id} library={library} />
                ))}
              </div>
            </section>

            <section id="special" className="mb-14 scroll-mt-10">
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
    </PrototypePresentationShell>
    </>
  );
};

export default LibraryHoursPagePrototype;
