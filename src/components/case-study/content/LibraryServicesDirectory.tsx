'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inter } from 'next/font/google';
import DirectorySidebar from './DirectorySidebar';
import DirectoryTopBar from './DirectoryTopBar';
import { LibraryServiceItem } from './LibraryServiceItem';
import { LIBRARY_DIRECTORY_DATA, FREQUENTLY_VISITED_DATA } from '@/lib/data/library-directory-data';

const inter = Inter({ subsets: ['latin'] });

const LibraryServicesDirectory: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>("Library Basics");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("-Any-");
  const [activeTab, setActiveTab] = useState<"all" | "frequently">("all");
  
  // Track auto-scrolling with a ref to avoid state-triggering re-renders
  const isAutoScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const categories = LIBRARY_DIRECTORY_DATA.map(cat => cat.name);

  // Helper function to apply search and audience filters
  const applyFilters = (services: any[]) => {
    let filtered = [...services];

    // Filter by Audience
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

    // Filter by Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(service => 
        service.title.toLowerCase().includes(query) || 
        service.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  // Frequently Visited Logic
  const allServices = useMemo(() => LIBRARY_DIRECTORY_DATA.flatMap(cat => cat.services), []);
  
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

  // Handle Sidebar Category Click
  const handleCategorySelect = (category: string) => {
    // Ensure we are in "All Services" tab
    setActiveTab("all");
    setActiveCategory(category);
    
    // Clear any existing scroll timeout
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    // Scroll to the category heading
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

  // Switch Tabs Logic
  const handleTabSwitch = (tab: "all" | "frequently") => {
    setActiveTab(tab);
    if (tab === "frequently") {
      setActiveCategory(null); // Deselect sidebar
    } else {
      // Returning to "All Services"
      setActiveCategory("Library Basics");
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Intersection Observer to update active category on scroll
  useEffect(() => {
    // Only observe if in "All Services" tab and not auto-scrolling
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
          if (categoryName) {
            setActiveCategory(categoryName);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    Object.values(categoryRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [activeTab]);

  return (
    <div className={`w-full ${inter.className}`}>
      {/* Outer Gradient Frame */}
      <div 
        className="relative w-full overflow-hidden rounded-none"
        style={{
          background: 'linear-gradient(295deg, #225432 11.56%, #36A459 88.84%)',
          padding: '80px 64px 0 64px',
          height: '1000px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}
      >
        {/* Inner Directory Card */}
        <div 
          className="w-full bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden rounded-none"
          style={{ height: '900px' }}
        >
          {/* Top Bar */}
          <DirectoryTopBar 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeAudience={selectedAudience}
            onSelectAudience={(aud) => {
              setSelectedAudience(aud);
              if (activeTab === "all") {
                // When filtering in "All Services", reset scroll to top to stay synced
                if (scrollContainerRef.current) scrollContainerRef.current.scrollTo({ top: 0 });
                setActiveCategory("Library Basics");
              }
            }}
          />

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-[200px] flex-shrink-0 border-r border-[#E5E5E5] overflow-y-auto pt-[45px]">
              <DirectorySidebar 
                categories={categories}
                activeCategory={activeCategory || ""}
                onSelectCategory={handleCategorySelect}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-[#E5E5E5] px-10">
                <button 
                  onClick={() => handleTabSwitch("all")}
                  className={`relative py-3 px-1 text-[13px] font-medium transition-colors duration-200 mr-8
                    ${activeTab === "all" ? "text-[#265D38]" : "text-[#707070] hover:text-[#383838]"}`}
                >
                  All Services
                  {activeTab === "all" && (
                    <motion.div 
                      layoutId="tabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#265D38]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
                <button 
                  onClick={() => handleTabSwitch("frequently")}
                  className={`relative py-3 px-1 text-[13px] font-medium transition-colors duration-200
                    ${activeTab === "frequently" ? "text-[#265D38]" : "text-[#707070] hover:text-[#383838]"}`}
                >
                  Frequently visited
                  {activeTab === "frequently" && (
                    <motion.div 
                      layoutId="tabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#265D38]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              </div>

              {/* Content Area */}
              <div 
                ref={scrollContainerRef}
                className="flex-1 pt-16 px-10 pb-10 overflow-y-auto relative scroll-smooth"
              >
                <AnimatePresence mode="wait">
                  {activeTab === "all" ? (
                    <motion.div
                      key="all-tab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-10"
                    >
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
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* Empty State */}
                      {LIBRARY_DIRECTORY_DATA.every(cat => applyFilters(cat.services).length === 0) && (
                        <div className="py-20 text-center text-[#707070]">
                          No services found matching your criteria.
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="frequently-tab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-8"
                    >
                      {hasFrequentlyVisitedResults ? (
                        <>
                          {/* Last Visited */}
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
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Frequently Visited */}
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryServicesDirectory;
