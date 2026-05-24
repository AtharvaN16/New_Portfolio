import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import LibraryServicesDirectory from '@/components/case-study/content/LibraryServicesDirectory';
import { LIBRARY_DIRECTORY_DATA } from '@/lib/data/library-directory-data';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('LibraryServicesDirectory', () => {
  it('renders the initial category (Library Basics) and its services', () => {
    render(<LibraryServicesDirectory />);
    
    // Check if category header is present (at least one)
    expect(screen.getAllByText('Library Basics').length).toBeGreaterThanOrEqual(1);
    
    // Check if some services from Library Basics are present
    const firstService = LIBRARY_DIRECTORY_DATA[0].services[0].title;
    expect(screen.getByText(firstService)).toBeInTheDocument();
  });

  it('switches categories when a sidebar button is clicked', () => {
    render(<LibraryServicesDirectory />);
    
    // Click on "Visit" category in sidebar
    const visitButton = screen.getByText('Visit');
    fireEvent.click(visitButton);
    
    // Check if main header updated
    const headers = screen.getAllByText('Visit');
    // One in sidebar, one in main header
    expect(headers.length).toBeGreaterThan(1);
    
    // Check if services from Visit category are present
    const visitService = LIBRARY_DIRECTORY_DATA.find(c => c.name === 'Visit')?.services[0].title;
    if (visitService) {
      expect(screen.getByText(visitService)).toBeInTheDocument();
    }
  });

  it('filters services based on search query', () => {
    render(<LibraryServicesDirectory />);
    
    // Initial state: Library Basics services are visible
    const firstService = LIBRARY_DIRECTORY_DATA[0].services[0].title; // "Accessibility Services"
    const secondService = LIBRARY_DIRECTORY_DATA[0].services[1].title; // "Alumni Services"
    
    expect(screen.getByText(firstService)).toBeInTheDocument();
    expect(screen.getByText(secondService)).toBeInTheDocument();
    
    // Search for "Accessibility"
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Accessibility' } });
    
    // Only "Accessibility Services" should be visible
    expect(screen.getByText(firstService)).toBeInTheDocument();
    expect(screen.queryByText(secondService)).toBeNull();
  });

  it('filters services based on audience selection', () => {
    render(<LibraryServicesDirectory />);
    
    // Open audience dropdown
    const audienceButton = screen.getByText('Audience Type');
    fireEvent.click(audienceButton);
    
    // Select "Alumni"
    const alumniOption = screen.getByText('Alumni');
    fireEvent.click(alumniOption);
    
    // "Alumni Services" should be visible
    expect(screen.getByText('Alumni Services')).toBeInTheDocument();
    
    // "Accessibility Services" is for Students, Faculty, Staff - should be hidden
    expect(screen.queryByText('Accessibility Services')).toBeNull();
  });

  it('switches to Frequently visited tab', () => {
    render(<LibraryServicesDirectory />);
    
    // Click on "Frequently visited" tab
    const freqTab = screen.getByText('Frequently visited');
    fireEvent.click(freqTab);
    
    // Check if "Last visited" section header is present
    expect(screen.getByText('Last visited')).toBeInTheDocument();
    
    // Check if a frequently visited item is present
    // Based on FREQUENTLY_VISITED_DATA: "Publishing"
    // It appears in both "Last visited" and "Frequently visited"
    expect(screen.getAllByText('Publishing').length).toBeGreaterThanOrEqual(1);
  });
});
