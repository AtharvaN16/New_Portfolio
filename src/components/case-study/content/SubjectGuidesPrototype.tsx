'use client';

import React, { useEffect, useState } from 'react';
import { MaterialSymbolsFont } from '@/components/case-study/MaterialSymbolsFont';
import LibraryServicesNavbar from './LibraryServicesNavbar';
import {
  PrototypePresentationShell,
  type PrototypeVariant,
} from './ualberta/PrototypePresentationShell';
import { ualbertaPrototypeInter } from './ualberta/ualbertaPrototypeFont';

const tabs = ['Subject Guides', 'Course Guides', 'How to Guides', 'General Guides', 'All Guides A-Z'];

const artsLinks = [
  'Anthropology',
  'Archaeology',
  'Art & Design',
  'Classics',
  'Communications & Technology (MACT)',
  'Digital Humanities',
  'Drama',
  'East Asian Studies',
  'Economics',
  'English & Film Studies',
  'German 274: Shaping Modern Austria',
  'History',
  'History 290: Historiography & Research Methods',
  'History 395: Early British Empire',
  'Human Geography & Planning',
  'Intersectionality',
  'Linguistics',
  'Media Studies',
  'Modern Languages and Cultural Studies (MLCS)',
  'Music',
  'Philosophy',
  'Political Science',
  'Psychology',
  'Religious Studies',
  'Social Work',
  'Sociology',
  "Women's and Gender Studies",
];

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
    iconName: 'eco',
    interactive: true,
    links: ['Agriculture and the Environment','Forestry','Plant Biosystems','ALES 354 – Communication Fundamentals','Human Ecology: Children, Youth, Family & Aging','Renewable Resources','Animal Science','Human Ecology: Clothing, Textiles & Material Culture','Resource Economics & Environmental Sociology','Food Science & Bioresource Technology','Human Nutrition','Soil Science'],
    button: 'ALES Databases',
  },
  {
    id: 'arts',
    name: 'Arts: Humanities & Social Sciences',
    iconName: 'palette',
    interactive: true,
    links: artsLinks,
    button: 'Arts Databases',
  },
  {
    id: 'augustana',
    name: 'Augustana Campus Library',
    iconName: 'account_balance',
    interactive: false,
  },
  {
    id: 'bsj',
    name: 'Bibliothèque Saint-Jean',
    iconName: 'library_books',
    interactive: true,
    links: ['Administration des affaires','Gestion des Sciences de Recherche','Ressources en ligne','Apprentissage linguistique','IA générative – utilisation','Robotique et Programmation','Arts et Sciences sociales','Loisirs et bien-être','Sciences','Citation et Logiciels de Gestion Bibliographique','Réduction Scientifique','Sciences de la santé','Éducation: Fondements, Psychopédagogie, Méthodologie'],
    button: 'BSJ Databases',
  },
  {
    id: 'business',
    name: 'Business',
    iconName: 'business_center',
    interactive: false,
  },
  {
    id: 'education',
    name: 'Education',
    iconName: 'school',
    interactive: false,
  },
  {
    id: 'engineering',
    name: 'Engineering',
    iconName: 'engineering',
    interactive: false,
  },
  {
    id: 'health',
    name: 'Health Sciences',
    iconName: 'medical_services',
    interactive: false,
  },
  {
    id: 'interdisciplinary',
    name: 'Interdisciplinary Studies',
    iconName: 'hub',
    interactive: false,
  },
  {
    id: 'law',
    name: 'Law',
    iconName: 'gavel',
    interactive: false,
  },
  {
    id: 'maps',
    name: 'Maps/Geospatial',
    iconName: 'location_on',
    interactive: false,
  },
  {
    id: 'native',
    name: 'Native Studies',
    iconName: 'groups',
    interactive: false,
  },
  {
    id: 'sciences',
    name: 'Sciences',
    iconName: 'science',
    interactive: false,
  },
];

function subjectLinkId(link: string) {
  return `subject-link-${link.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`;
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
  highlightedLink,
}: {
  item: (typeof subjectItems)[0];
  isOpen: boolean;
  onToggle?: () => void;
  highlightedLink?: string | null;
}) {
  const isInteractive = Boolean(item.interactive && onToggle);

  return (
    <div className="border-[#CACACA] overflow-hidden" style={{ borderWidth: '0.6px' }}>
      <div
        className={`flex items-center gap-3 py-2.5 px-3 bg-[#EDEDED] transition-colors ${
          isInteractive ? 'cursor-pointer hover:bg-[#E0E0E0]' : ''
        }`}
        onClick={isInteractive ? onToggle : undefined}
      >
        <div className="w-[26px] h-[26px] flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-rounded text-[#265D38]" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>
            {item.iconName}
          </span>
        </div>
        <span className="flex-1 text-[11px] font-semibold text-[#383838]">{item.name}</span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#383838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? <path d="M18 15l-6-6-6 6" /> : <path d="M6 9l6 6 6-6" />}
        </svg>
      </div>
      {isOpen && item.links && (
        <div className="border-t border-[#CACACA] bg-[#FAFAFA] px-4 py-3" style={{ borderTopWidth: '0.6px' }}>
          <div className="mb-6 grid grid-cols-3 gap-x-6 gap-y-1.5">
            {item.links.map((link) => (
              <a
                key={link}
                id={subjectLinkId(link)}
                href="#"
                className="text-[10px] text-[#265D38] hover:underline"
              >
                {highlightedLink === link ? (
                  <mark className="bg-[#FFDB05] text-inherit">{link}</mark>
                ) : (
                  link
                )}
              </a>
            ))}
          </div>
          {item.button && (
            <div className="flex justify-end">
              <button className="bg-[#265D38] px-3 py-1.5 text-[10px] font-semibold text-white">{item.button}</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface SubjectGuidesPrototypeProps {
  variant?: PrototypeVariant;
}

export function SubjectGuidesPrototype({ variant = 'embedded' }: SubjectGuidesPrototypeProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    ales: true,
    bsj: true,
    arts: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedLink, setHighlightedLink] = useState<string | null>(null);
  const isFullscreen = variant === 'fullscreen';

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSearchSubmit = () => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    for (const item of subjectItems) {
      if (!item.interactive || !item.links) continue;

      const match = item.links.find((link) => link.toLowerCase().includes(query));
      if (match) {
        setOpenItems((prev) => ({ ...prev, [item.id]: true }));
        setHighlightedLink(match);
        return;
      }
    }

    setHighlightedLink(null);
  };

  useEffect(() => {
    if (!highlightedLink) return;

    const frame = requestAnimationFrame(() => {
      document.getElementById(subjectLinkId(highlightedLink))?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [highlightedLink, openItems]);

  return (
    <>
      <MaterialSymbolsFont />
      <PrototypePresentationShell
      variant={variant}
      outerClassName={ualbertaPrototypeInter.className}
      innerClassName="w-full bg-[#F7F7F7] flex flex-col rounded-none border-none shadow-none"
      innerStyle={isFullscreen ? undefined : { height: '1100px' }}
    >
      <LibraryServicesNavbar />

      <div className="flex border-b border-[#E0E0E0] bg-white px-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-[11px] px-4 py-3 font-medium text-[#383838] ${tab === 'Subject Guides' ? 'text-[#265D38] border-b-[3px] border-[#FFDB05]' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={`pt-6 px-8 pb-10 ${isFullscreen ? '' : 'flex-1 overflow-y-auto'}`}>
        <h1 className="text-[22px] font-bold text-[#1F5C35] mb-2">Subject Guides</h1>
        <p className="text-[10px] text-[#555] mb-8 leading-normal max-w-[480px]">
          A subject guide on a university website is a curated resource designed to help students and researchers explore and navigate a specific field of study. It typically includes recommended readings, key databases, journals, research tools, and contact information for subject librarians who can provide assistance.
        </p>

        <div className="flex gap-6 mb-8">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold text-[#383838]">Search</span>
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(event) => {
                const value = event.target.value;
                setSearchQuery(value);
                if (!value.trim()) {
                  setHighlightedLink(null);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleSearchSubmit();
                }
              }}
              className="w-[180px] border border-[#BDBDBD] px-2 py-1.5 text-[10px] text-[#383838] placeholder:text-[#888]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold text-[#383838]">Sort</span>
            <select className="border border-[#BDBDBD] px-2 py-1.5 text-[10px] w-[140px] text-[#383838]">
              <option value="alpha">Alphabetically</option>
              <option value="dept">By department</option>
              <option value="all">All</option>
            </select>
          </div>
          <a href="#" className="text-[10px] text-[#265D38] underline mt-auto mb-1 ml-auto">Export all subjects</a>
        </div>

        <div className="flex gap-10 items-start">
          <div className="flex-1 space-y-3">
            {subjectItems.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={Boolean(openItems[item.id])}
                onToggle={item.interactive ? () => toggleItem(item.id) : undefined}
                highlightedLink={highlightedLink}
              />
            ))}
          </div>

          <div className="w-[180px] flex-shrink-0">
            <div className="bg-white px-4 py-4 mb-6 border-[#CACACA]" style={{ borderWidth: '0.6px' }}>
              <div className="text-[12px] font-bold mb-1 text-[#265D38]">A-Z Databases</div>
              <div className="text-[10px] text-[#555] opacity-80">Full list of Databases the library subscribes to, including data…</div>
            </div>
            <div className="text-[11px] font-bold text-[#383838] mb-2">More Guides</div>
            <div className="space-y-2">
              {moreGuideLinks.map((link) => (
                <a key={link} href="#" className="block text-[10px] text-[#265D38]">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PrototypePresentationShell>
    </>
  );
}

export default SubjectGuidesPrototype;
