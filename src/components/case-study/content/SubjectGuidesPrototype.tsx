'use client';

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import LibraryServicesNavbar from './LibraryServicesNavbar';

const inter = Inter({ subsets: ['latin'] });

const tabs = ['Subject Guides', 'Course Guides', "'How to' Guides", 'General Guides', 'All Guides A-Z'];

const moreGuideLinks = [
  'Audio, Video & Gaming Resources',
  'Citation Guides',
  'eBooks',
  'Government Information',
  'Newspapers',
  'Primary Sources',
  'Research and Writing',
  'Technology at the Library',
  'Thesis and Dissertations',
];

const subjectItems = [
  {
    id: 'ales',
    name: 'Agricultural, Life & Environmental Sciences',
    icon: <path d="M17 8C8 10 5.9 16.17 3.82 19c1.72-1 5.35-3 8.18-3 0-4 4-6 4-6-1 2-2.18 3.98-3 5 2.69-.23 5.56-2 6-6z" fill="white" />,
    interactive: true,
    links: ['Agriculture and the Environment','Forestry','Plant Biosystems','ALES 354 – Communication Fundamentals','Human Ecology: Children, Youth, Family & Aging','Renewable Resources','Animal Science','Human Ecology: Clothing, Textiles & Material Culture','Resource Economics & Environmental Sociology','Food Science & Bioresource Technology','Human Nutrition','Soil Science'],
    button: 'ALES Databases',
  },
  {
    id: 'arts',
    name: 'Arts: Humanities & Social Sciences',
    icon: <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="1.5" fill="none" />,
    interactive: false,
  },
  {
    id: 'augustana',
    name: 'Augustana Campus Library',
    icon: <path d="M3 21h18M6 21V7l6-4 6 4v14M9 21V15h6v6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    interactive: false,
  },
  {
    id: 'bsj',
    name: 'Bibliothèque Saint-Jean',
    icon: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="white" strokeWidth="1.5" fill="none" />
      </>
    ),
    interactive: true,
    links: ['Administration des affaires','Gestion des Sciences de Recherche','Ressources en ligne','Apprentissage linguistique','IA générative – utilisation','Robotique et Programmation','Arts et Sciences sociales','Loisirs et bien-être','Sciences','Citation et Logiciels de Gestion Bibliographique','Réduction Scientifique','Sciences de la santé','Éducation: Fondements, Psychopédagogie, Méthodologie'],
    button: 'BSJ Databases',
  },
  {
    id: 'business',
    name: 'Business',
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="white" strokeWidth="1.5" fill="none" />
      </>
    ),
    interactive: false,
  },
  {
    id: 'education',
    name: 'Education',
    icon: (
      <>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </>
    ),
    interactive: false,
  },
  {
    id: 'engineering',
    name: 'Engineering',
    icon: (
      <>
        <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </>
    ),
    interactive: false,
  },
  {
    id: 'health',
    name: 'Health Sciences',
    icon: <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />,
    interactive: false,
  },
  {
    id: 'interdisciplinary',
    name: 'Interdisciplinary Studies',
    icon: (
      <>
        <circle cx="12" cy="12" r="2" stroke="white" strokeWidth="1.5" fill="none" />
        <circle cx="4" cy="6" r="2" stroke="white" strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="6" r="2" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M6 6h4m4 6h4M6 18h4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </>
    ),
    interactive: false,
  },
  {
    id: 'law',
    name: 'Law',
    icon: (
      <>
        <path d="M12 3v18M3 9h18M6 15l-3 6h6zM18 15l-3 6h6z" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    interactive: false,
  },
  {
    id: 'maps',
    name: 'Maps/Geospatial',
    icon: <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white" />,
    interactive: false,
  },
  {
    id: 'native',
    name: 'Native Studies',
    icon: <path d="M17 8C8 10 5.9 16.17 3.82 19" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />,
    interactive: false,
  },
  {
    id: 'sciences',
    name: 'Sciences',
    icon: (
      <>
        <circle cx="12" cy="12" r="2" stroke="white" strokeWidth="1.5" fill="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="white" strokeWidth="1.5" fill="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="white" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
      </>
    ),
    interactive: false,
  },
];

function AccordionItem({ item, isOpen, onToggle }: { item: typeof subjectItems[0]; isOpen: boolean; onToggle?: () => void }) {
  return (
    <div className="border-b border-[#E0E0E0]">
      <div
        className="flex items-center gap-3 py-2.5 px-3 cursor-pointer hover:bg-[#F5F5F5]"
        onClick={onToggle}
      >
        <div className="w-[26px] h-[26px] rounded-full bg-[#265D38] flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            {item.icon}
          </svg>
        </div>
        <span className="flex-1 text-[11px] font-semibold text-[#383838]">{item.name}</span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#383838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? <path d="M18 15l-6-6-6 6" /> : <path d="M6 9l6 6 6-6" />}
        </svg>
      </div>
      {isOpen && item.links && (
        <div className="bg-[#FAFAFA] px-4 py-3 border-t border-[#E0E0E0]">
          <div className="grid grid-cols-3 gap-x-6 gap-y-1.5 mb-3">
            {item.links.map((link) => (
              <a key={link} href="#" className="text-[10px] text-[#265D38] hover:underline">{link}</a>
            ))}
          </div>
          <button className="bg-[#265D38] text-white text-[10px] px-3 py-1.5 font-semibold">{item.button}</button>
        </div>
      )}
    </div>
  );
}

export function SubjectGuidesPrototype() {
  const [alesOpen, setAlesOpen] = useState(true);
  const [bsjOpen, setBsjOpen] = useState(true);

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
        className="w-full bg-[#F7F7F7] flex flex-col overflow-y-auto rounded-none border-none shadow-none scroll-smooth"
        data-lenis-prevent="true"
        style={{ height: '1100px' }}
      >
        <LibraryServicesNavbar />

        <div className="flex border-b border-[#E0E0E0] bg-white">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`text-[11px] px-4 py-3 font-medium text-[#383838] ${tab === 'Subject Guides' ? 'text-[#265D38] border-b-[3px] border-[#FFDB05]' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex">
          <div className="w-[180px] flex-shrink-0 px-4 pt-6">
            <div className="bg-[#265D38] text-white px-4 py-4 mb-6">
              <div className="text-[12px] font-bold mb-1">A-Z Databases</div>
              <div className="text-[10px] opacity-80 mb-3">Full list of Databases the library subscribes to, including data…</div>
              <button className="bg-white text-[#265D38] text-[10px] font-bold px-3 py-1.5">ALEX Databases</button>
            </div>
            <div className="text-[11px] font-bold text-[#383838] mb-2">More Guides</div>
            <div className="space-y-2">
              {moreGuideLinks.map((link) => (
                <a key={link} href="#" className="block text-[10px] text-[#265D38]">{link}</a>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pt-6 pr-6 pl-8">
            <h1 className="text-[22px] font-bold text-[#1F5C35] mb-2">Subject Guides</h1>
            <p className="text-[10px] text-[#555] mb-4 leading-relaxed max-w-[600px]">
              A subject guide on a university website is a curated resource designed to help students and researchers explore and navigate a specific field of study. It typically includes recommended readings, key databases, journals, research tools, and contact information for subject librarians who can provide assistance.
            </p>

            <div className="flex items-center gap-4 mb-2">
              <span className="text-[10px] font-semibold text-[#383838]">Search</span>
              <input type="text" className="border border-[#CCC] px-2 py-1 text-[10px] w-[140px]" />
              <span className="text-[10px] font-semibold text-[#383838]">Display</span>
              <select className="border border-[#CCC] px-2 py-1 text-[10px]">
                <option>-- select --</option>
                <option>All</option>
                <option>By department</option>
              </select>
              <a href="#" className="text-[10px] text-[#265D38] underline ml-auto">Export all subjects</a>
            </div>

            <div className="space-y-0">
              {subjectItems.map((item) => {
                if (item.id === 'ales') {
                  return <AccordionItem key={item.id} item={item} isOpen={alesOpen} onToggle={() => setAlesOpen(!alesOpen)} />;
                }
                if (item.id === 'bsj') {
                  return <AccordionItem key={item.id} item={item} isOpen={bsjOpen} onToggle={() => setBsjOpen(!bsjOpen)} />;
                }
                return <AccordionItem key={item.id} item={item} isOpen={false} />;
              })}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default SubjectGuidesPrototype;
