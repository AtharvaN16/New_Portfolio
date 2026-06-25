'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { m } from 'framer-motion';
import { Inter } from 'next/font/google';
import DirectorySidebar from './DirectorySidebar';
import DirectoryTopBar from './DirectoryTopBar';
import { LibraryServiceItem } from './LibraryServiceItem';
import { LIBRARY_DIRECTORY_DATA, FREQUENTLY_VISITED_DATA } from '@/lib/data/library-directory-data';

const inter = Inter({ subsets: ['latin'] });

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
  const [activeCategory, setActiveCategory] = useState<string | null>("Library Basics");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("-Any-");
  const [activeTab, setActiveTab] = useState<"all" | "frequently" | "bookmarked">("all");
  
  const bookmarks = externalBookmarks || internalBookmarks;

  const isAutoScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const categories = LIBRARY_DIRECTORY_DATA.map(cat => cat.name);
  const allServices = useMemo(() => LIBRARY_DIRECTORY_DATA.flatMap(cat => cat.services), []);

  const bookmarkedServicesList = useMemo(() => {
    return allServices.filter(s => bookmarks[s.title]);
  }, [allServices, bookmarks]);

  const applyFilters = (services: any[]) => {
    let filtered = [...services];
    if (selectedAudience !== "-Any-") {
      filtered = filtered.filter(service => {
        if (!service.audiences) return false;
        if (service.audiences.includes(selectedAudience)) return true;
        if (selectedAudience === "Students") {
          return service.audiences.includes("Undergrads") || service.audiences.includes("Grads");
        }
        if (selectedAudience === "Undergrads" || selectedAudience === "Grads") {
          return service.audiences.includes("Students");
        }
        return false;
      });
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(service => 
        service.title.toLowerCase().includes(query) || 
        service.description.toLowerCase().includes(query)
      );
    }
    return filtered;
  };

  const frequentlyVisitedServices = useMemo(() => {
    const lastVisited = FREQUENTLY_VISITED_DATA.lastVisited
      .map(title => allServices.find(s => s.title === title))
      .filter((s): s is any => s !== undefined);
      
    const frequentlyVisited = FREQUENTLY_VISITED_DATA.frequentlyVisited
      .map(title => allServices.find(s => s.title === title))
      .filter((s): s is any => s !== undefined);
    
    return {
      lastVisited: applyFilters(lastVisited),
      frequentlyVisited: applyFilters(frequentlyVisited)
    };
  }, [allServices, selectedAudience, searchQuery]);

  const hasFrequentlyVisitedResults = 
    frequentlyVisitedServices.lastVisited.length > 0 || 
    frequentlyVisitedServices.frequentlyVisited.length > 0;

  const handleToggleBookmark = (title: string) => {
    if (onToggleBookmark) {
      onToggleBookmark(title);
    } else {
      setInternalBookmarks(prev => ({
        ...prev,
        [title]: !prev[title]
      }));
    }
  };

  const handleCategorySelect = (category: string) => {
    setActiveTab("all");
    setActiveCategory(category);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    const target = categoryRefs.current[category];
    if (target && scrollContainerRef.current) {
      isAutoScrollingRef.current = true;
      scrollContainerRef.current.scrollTo({
        top: target.offsetTop - 40,
        behavior: 'smooth'
      });
      scrollTimeoutRef.current = setTimeout(() => {
        isAutoScrollingRef.current = false;
        scrollTimeoutRef.current = null;
      }, 1000);
    }
  };

  const handleTabSwitch = (tab: "all" | "frequently" | "bookmarked") => {
    setActiveTab(tab);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0 });
    }
    if (tab === "frequently" || tab === "bookmarked") {
      setActiveCategory(null);
    } else {
      setActiveCategory("Library Basics");
    }
  };

  // Showcase: external trigger scrolls to a named category
  useEffect(() => {
    if (!externalCategory) return;
    handleCategorySelect(externalCategory);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalCategory]);

  useEffect(() => {
    if (activeTab !== "all") return;
    const currentScrollContainer = scrollContainerRef.current;
    if (!currentScrollContainer) return;
    const observerOptions = {
      root: currentScrollContainer,
      rootMargin: '0px 0px -70% 0px',
      threshold: 0
    };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isAutoScrollingRef.current) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const categoryName = entry.target.getAttribute('data-category');
          if (categoryName) setActiveCategory(categoryName);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    Object.values(categoryRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [activeTab]);

  return (
    <div
      className={`flex w-full flex-col overflow-hidden border-none rounded-none bg-white ${inter.className}`}
      style={{ height, minHeight }}
    >
      {/* Unified Top Frame: Search + Tabs */}
      <div className="flex flex-col border-b border-[#E5E5E5] pt-6">
        <DirectoryTopBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeAudience={selectedAudience}
          onSelectAudience={(aud) => {
            setSelectedAudience(aud);
            if (activeTab === "all") {
              if (scrollContainerRef.current) scrollContainerRef.current.scrollTo({ top: 0 });
              setActiveCategory("Library Basics");
            }
          }}
          paddingX={paddingX}
        />

        <div className="flex w-full" style={{ paddingLeft: paddingX, paddingRight: paddingX }}>
          <div className="w-[200px] flex-shrink-0" />
          <div className="flex-1 flex pl-10">
            <button 
              onClick={() => handleTabSwitch("all")}
              className={`relative py-3 px-1 text-[13px] font-medium transition-colors duration-200 mr-8
                ${activeTab === "all" ? "text-[#265D38]" : "text-[#707070] hover:text-[#383838]"}`}
            >
              All Services
              {activeTab === "all" && (
                <m.div 
                  layoutId="directoryTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#265D38]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
            <button 
              onClick={() => handleTabSwitch("frequently")}
              className={`relative py-3 px-1 text-[13px] font-medium transition-colors duration-200 mr-8
                ${activeTab === "frequently" ? "text-[#265D38]" : "text-[#707070] hover:text-[#383838]"}`}
            >
              Frequently visited
              {activeTab === "frequently" && (
                <m.div 
                  layoutId="directoryTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#265D38]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
            <button 
              onClick={() => handleTabSwitch("bookmarked")}
              className={`relative py-3 px-1 text-[13px] font-medium transition-colors duration-200
                ${activeTab === "bookmarked" ? "text-[#265D38]" : "text-[#707070] hover:text-[#383838]"}`}
            >
              Bookmarked
              {activeTab === "bookmarked" && (
                <m.div 
                  layoutId="directoryTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#265D38]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ paddingLeft: paddingX, paddingRight: paddingX }}>
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
            className="relative flex-1 overflow-y-auto scroll-smooth bg-white pt-16 pl-10 pr-0 pb-10"
            data-lenis-prevent="true"
          >
            {activeTab === 'all' ? (
              <div className="flex flex-col gap-10 bg-white">
                  {LIBRARY_DIRECTORY_DATA.map((category) => {
                    const filtered = applyFilters(category.services);
                    if (filtered.length === 0 && (searchQuery || selectedAudience !== "-Any-")) return null;
                    return (
                      <div 
                        key={category.name} 
                        ref={(el) => { categoryRefs.current[category.name] = el; }}
                        data-category={category.name}
                        className="scroll-mt-10"
                      >
                        <h2 className="text-[#265D38] text-[18px] font-bold mb-4 uppercase tracking-tight">
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
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : activeTab === 'frequently' ? (
              <div className="flex flex-col gap-8 bg-white">
                  {hasFrequentlyVisitedResults ? (
                    <>
                      {frequentlyVisitedServices.lastVisited.length > 0 && (
                        <div>
                          <h2 className="text-[#265D38] text-[18px] font-bold mb-3 uppercase tracking-tight">
                            Last visited
                          </h2>
                          <div className="flex flex-col">
                            {frequentlyVisitedServices.lastVisited.map((service) => (
                              <LibraryServiceItem 
                                key={`last-${service.title}`}
                                title={service.title}
                                description={service.description}
                                isBookmarked={bookmarks[service.title] || false}
                                onToggleBookmark={() => handleToggleBookmark(service.title)}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      {frequentlyVisitedServices.frequentlyVisited.length > 0 && (
                        <div>
                          <h2 className="text-[#265D38] text-[18px] font-bold mb-3 uppercase tracking-tight">
                            Frequently visited
                          </h2>
                          <div className="flex flex-col">
                            {frequentlyVisitedServices.frequentlyVisited.map((service) => (
                              <LibraryServiceItem 
                                key={`freq-${service.title}`}
                                title={service.title}
                                description={service.description}
                                isBookmarked={bookmarks[service.title] || false}
                                onToggleBookmark={() => handleToggleBookmark(service.title)}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="py-20 text-center text-[#707070]">
                      No frequently visited services found matching your criteria.
                    </div>
                  )}
              </div>
            ) : (
              <div className="flex flex-col gap-8 bg-white">
                  <div>
                    <h2 className="text-[#265D38] text-[18px] font-bold mb-3 uppercase tracking-tight">
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
                          />
                        ))
                      ) : (
                        <div className="py-20 text-center text-[#707070]">
                          You haven't bookmarked any services yet.
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
