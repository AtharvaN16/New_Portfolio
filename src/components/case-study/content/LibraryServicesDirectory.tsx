'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { m } from 'framer-motion';
import DirectorySidebar from './DirectorySidebar';
import DirectoryTopBar from './DirectoryTopBar';
import { LibraryServiceItem } from './LibraryServiceItem';
import { LIBRARY_DIRECTORY_DATA } from '@/lib/data/library-directory-data';
import { ualbertaPrototypeInter } from './ualberta/ualbertaPrototypeFont';

interface LibraryServicesDirectoryProps {
  bookmarks?: Record<string, boolean>;
  onToggleBookmark?: (title: string) => void;
  height?: string;
  minHeight?: string;
  paddingX?: string;
  externalCategory?: string | null;
}

const LibraryServicesDirectory: React.FC<LibraryServicesDirectoryProps> = ({
  bookmarks: externalBookmarks,
  onToggleBookmark,
  height = '800px',
  minHeight,
  paddingX = '0px',
  externalCategory,
}) => {
  const [internalBookmarks, setInternalBookmarks] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>('Library Basics');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('-Any-');
  const [activeTab, setActiveTab] = useState<'all' | 'bookmarked'>('all');

  const bookmarks = externalBookmarks || internalBookmarks;

  const isAutoScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const categories = LIBRARY_DIRECTORY_DATA.map((cat) => cat.name);
  const allServices = useMemo(
    () => LIBRARY_DIRECTORY_DATA.flatMap((cat) => cat.services),
    [],
  );

  const bookmarkedServicesList = useMemo(() => {
    return allServices.filter((s) => bookmarks[s.title]);
  }, [allServices, bookmarks]);

  const applyFilters = (services: (typeof allServices)[number][]) => {
    let filtered = [...services];
    if (selectedAudience !== '-Any-') {
      filtered = filtered.filter((service) => {
        if (!service.audiences) return false;
        if (service.audiences.includes(selectedAudience)) return true;
        if (selectedAudience === 'Students') {
          return service.audiences.includes('Undergrads') || service.audiences.includes('Grads');
        }
        if (selectedAudience === 'Undergrads' || selectedAudience === 'Grads') {
          return service.audiences.includes('Students');
        }
        return false;
      });
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query),
      );
    }
    return filtered;
  };

  const bookmarkedCount = bookmarkedServicesList.length;

  const handleToggleBookmark = (title: string) => {
    if (onToggleBookmark) {
      onToggleBookmark(title);
    } else {
      setInternalBookmarks((prev) => ({
        ...prev,
        [title]: !prev[title],
      }));
    }
  };

  const handleCategorySelect = (category: string) => {
    setActiveTab('all');
    setActiveCategory(category);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    const target = categoryRefs.current[category];
    if (target && scrollContainerRef.current) {
      isAutoScrollingRef.current = true;
      scrollContainerRef.current.scrollTo({
        top: target.offsetTop - 40,
        behavior: 'smooth',
      });
      scrollTimeoutRef.current = setTimeout(() => {
        isAutoScrollingRef.current = false;
        scrollTimeoutRef.current = null;
      }, 1000);
    }
  };

  const handleTabSwitch = (tab: 'all' | 'bookmarked') => {
    setActiveTab(tab);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0 });
    }
    if (tab === 'bookmarked') {
      setActiveCategory(null);
    } else {
      setActiveCategory('Library Basics');
    }
  };

  useEffect(() => {
    if (!externalCategory) return;
    handleCategorySelect(externalCategory);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalCategory]);

  useEffect(() => {
    if (activeTab !== 'all') return;
    const currentScrollContainer = scrollContainerRef.current;
    if (!currentScrollContainer) return;
    const observerOptions = {
      root: currentScrollContainer,
      rootMargin: '0px 0px -70% 0px',
      threshold: 0,
    };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isAutoScrollingRef.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const categoryName = entry.target.getAttribute('data-category');
          if (categoryName) setActiveCategory(categoryName);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [activeTab]);

  return (
    <div
      className={`flex w-full flex-col overflow-hidden border-none rounded-none bg-white ${ualbertaPrototypeInter.className}`}
      style={{ height, minHeight }}
    >
      <div className="flex flex-col border-b border-[#E5E5E5] pt-6">
        <DirectoryTopBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeAudience={selectedAudience}
          onSelectAudience={(aud) => {
            setSelectedAudience(aud);
            if (activeTab === 'all') {
              if (scrollContainerRef.current) scrollContainerRef.current.scrollTo({ top: 0 });
              setActiveCategory('Library Basics');
            }
          }}
          paddingX={paddingX}
        />

        <div className="flex w-full" style={{ paddingLeft: paddingX, paddingRight: paddingX }}>
          <div className="w-[200px] flex-shrink-0" />
          <div className="flex flex-1 pl-10">
            <button
              onClick={() => handleTabSwitch('all')}
              className={`relative mr-8 px-1 py-3 text-[13px] font-medium transition-colors duration-200 ${
                activeTab === 'all' ? 'text-[#265D38]' : 'text-[#707070] hover:text-[#383838]'
              }`}
            >
              All Services
              {activeTab === 'all' && (
                <m.div
                  layoutId="directoryTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#265D38]"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => handleTabSwitch('bookmarked')}
              className={`relative flex items-center gap-2 px-1 py-3 text-[13px] font-medium transition-colors duration-200 ${
                activeTab === 'bookmarked'
                  ? 'text-[#265D38]'
                  : 'text-[#707070] hover:text-[#383838]'
              }`}
            >
              <span>Bookmarked</span>
              <span
                className={`min-w-[18px] rounded-full px-1.5 py-0.5 text-center text-[10px] font-semibold leading-none ${
                  activeTab === 'bookmarked'
                    ? 'bg-[#265D38] text-white'
                    : 'bg-[#E8F3EC] text-[#265D38]'
                }`}
                aria-label={`${bookmarkedCount} bookmarked services`}
              >
                {bookmarkedCount}
              </span>
              {activeTab === 'bookmarked' && (
                <m.div
                  layoutId="directoryTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#265D38]"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className="flex flex-1 overflow-hidden"
        style={{ paddingLeft: paddingX, paddingRight: paddingX }}
      >
        <div className="w-[200px] flex-shrink-0 overflow-y-auto bg-white pt-12">
          <DirectorySidebar
            categories={categories}
            activeCategory={activeCategory || ''}
            onSelectCategory={handleCategorySelect}
          />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden bg-white">
          <div
            ref={scrollContainerRef}
            className="relative flex-1 overflow-y-auto scroll-smooth bg-white pb-10 pl-10 pr-0 pt-16"
            data-lenis-prevent="true"
          >
            {activeTab === 'all' ? (
              <div className="flex flex-col gap-10 bg-white">
                {LIBRARY_DIRECTORY_DATA.map((category) => {
                  const filtered = applyFilters(category.services);
                  if (filtered.length === 0 && (searchQuery || selectedAudience !== '-Any-')) {
                    return null;
                  }
                  return (
                    <div
                      key={category.name}
                      ref={(el) => {
                        categoryRefs.current[category.name] = el;
                      }}
                      data-category={category.name}
                      className="scroll-mt-10"
                    >
                      <h2 className="mb-4 text-[18px] font-bold uppercase tracking-tight text-[#265D38]">
                        {category.name}
                      </h2>
                      <div className="flex flex-col">
                        {filtered.map((service) => (
                          <LibraryServiceItem
                            key={service.title}
                            title={service.title}
                            description={service.description}
                            isBookmarked={bookmarks[service.title] || false}
                            onToggleBookmark={() => handleToggleBookmark(service.title)}
                            searchQuery={searchQuery}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col gap-8 bg-white">
                <div>
                  <h2 className="mb-3 text-[18px] font-bold uppercase tracking-tight text-[#265D38]">
                    Your Bookmarks
                  </h2>
                  <div className="flex flex-col">
                    {bookmarkedServicesList.length > 0 ? (
                      bookmarkedServicesList.map((service) => (
                        <LibraryServiceItem
                          key={`bookmark-${service.title}`}
                          title={service.title}
                          description={service.description}
                          isBookmarked={true}
                          onToggleBookmark={() => handleToggleBookmark(service.title)}
                          searchQuery={searchQuery}
                        />
                      ))
                    ) : (
                      <div className="py-20 text-center text-[#707070]">
                        You haven&apos;t bookmarked any services yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryServicesDirectory;
