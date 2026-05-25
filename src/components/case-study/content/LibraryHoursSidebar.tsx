'use client';

import React from 'react';

const SidebarSection = ({ title, links }: { title: string; links: string[] }) => (
  <div className="mb-1">
    <div className="bg-[#E8E8E8] px-4 py-2.5">
      <span className="text-[10px] text-[#265D38] font-bold leading-tight">{title}</span>
    </div>
    <div className="py-1">
      {links.map((link) => (
        <a
          key={link}
          href="#"
          className="block px-4 py-2 text-[10px] text-[#383838] leading-snug hover:text-[#265D38] hover:bg-[#F0F0F0] transition-colors"
        >
          {link}
        </a>
      ))}
    </div>
  </div>
);

export const LibraryHoursSidebar: React.FC = () => {
  return (
    <aside className="w-[200px] h-full bg-white border-r border-[#E5E5E5] flex flex-col">
      {/* Breadcrumb */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-1.5 text-[12px] text-[#555]">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        <span className="text-[#888]">›</span>
        <span className="text-[#383838] font-medium">Hours + Locations</span>
      </div>

      {/* Nav Sections */}
      <div className="flex-1 overflow-y-auto">
        <SidebarSection
          title="Hours + Locations"
          links={['All Library Hours', 'Chat hours', 'Locations Accessibility']}
        />
        <SidebarSection
          title="Book Study Room"
          links={[
            'Augustana Library',
            'Bibliothèque Saint-Jean',
            'Cameron Library',
            'Rutherford Library',
            'Sperber Library',
          ]}
        />
        <SidebarSection
          title="Policies"
          links={[
            'Library Cards + Borrowing Privileges',
            'Community Expectations at the U of A Library',
            'Study Area Directory + Noise Zones',
            'Study and Work Space in the Library',
            'Food + Drink Policy',
          ]}
        />
      </div>
    </aside>
  );
};

export default LibraryHoursSidebar;
