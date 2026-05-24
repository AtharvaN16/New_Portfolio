'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inter } from 'next/font/google';
import DirectorySidebar from './DirectorySidebar';
import DirectoryTopBar from './DirectoryTopBar';
import { LibraryServiceItem } from './LibraryServiceItem';
import { LIBRARY_DIRECTORY_DATA, FREQUENTLY_VISITED_DATA } from '@/lib/data/library-directory-data';

const inter = Inter({ subsets: ['latin'] });

const LibraryServicesDirectory: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Library Basics");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("-Any-");
  const [activeTab, setActiveTab] = useState<"all" | "frequently">("all");

  const categories = LIBRARY_DIRECTORY_DATA.map(cat => cat.name);

  // Helper function to apply search and audience filters
  const applyFilters = (services: any[]) => {
    let filtered = [...services];

    // Filter by Audience
    if (selectedAudience !== "-Any-") {
      filtered = filtered.filter(service => {
        if (!service.audiences) return false;
        
        // Match exact audience
        if (service.audiences.includes(selectedAudience)) return true;
        
        // Handle Students / Undergrads / Grads relationship
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

  const filteredServices = useMemo(() => {
    const categoryData = LIBRARY_DIRECTORY_DATA.find(cat => cat.name === activeCategory);
    const services = categoryData ? categoryData.services : [];
    return applyFilters(services);
  }, [activeCategory, selectedAudience, searchQuery]);

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

  return (
    <div className={`w-full bg-white border border-[#E5E5E5] flex flex-col overflow-hidden rounded-none ${inter.className}`}>
      {/* Top Bar */}
      <DirectoryTopBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeAudience={selectedAudience}
        onSelectAudience={setSelectedAudience}
      />

      <div className="flex flex-1 min-h-[600px]">
        {/* Sidebar */}
        <div className="w-[240px] flex-shrink-0 border-r border-[#E5E5E5]">
          <DirectorySidebar 
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              setActiveTab("all");
            }}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Tabs */}
          <div className="flex border-b border-[#E5E5E5] px-8">
            <button 
              onClick={() => setActiveTab("all")}
              className={`relative py-4 px-2 text-[14px] font-medium transition-colors duration-200 mr-8
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
              onClick={() => setActiveTab("frequently")}
              className={`relative py-4 px-2 text-[14px] font-medium transition-colors duration-200
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
          <div className="flex-1 p-8 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTab === "all" ? (
                <motion.div
                  key="all-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-[#265D38] text-[20px] font-bold mb-6">
                    {activeCategory}
                  </h2>
                  
                  {filteredServices.length > 0 ? (
                    <div className="flex flex-col">
                      {filteredServices.map((service) => (
                        <LibraryServiceItem 
                          key={service.title}
                          title={service.title}
                          description={service.description}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center text-[#707070]">
                      No services found matching your criteria.
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="frequently-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-10"
                >
                  {hasFrequentlyVisitedResults ? (
                    <>
                      {/* Last Visited */}
                      {frequentlyVisitedServices.lastVisited.length > 0 && (
                        <div>
                          <h2 className="text-[#265D38] text-[20px] font-bold mb-4">
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
                          <h2 className="text-[#265D38] text-[20px] font-bold mb-4">
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
  );
};

export default LibraryServicesDirectory;
