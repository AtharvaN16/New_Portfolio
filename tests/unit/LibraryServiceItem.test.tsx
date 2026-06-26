import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LibraryServiceItem } from '@/components/case-study/content/LibraryServiceItem';

// Mock framer-motion to avoid animation-related issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('LibraryServiceItem', () => {
  const defaultProps = {
    title: 'Test Service',
    description: 'Test Description',
  };

  it('toggles "Bookmarked" text when bookmark icon is clicked', async () => {
    render(<LibraryServiceItem {...defaultProps} />);
    
    // Initially, "Bookmarked" should NOT be present
    expect(screen.queryByText('Bookmarked')).toBeNull();
    
    // Find and click the bookmark button
    const bookmarkButton = screen.getByRole('button', { name: /add bookmark/i });
    fireEvent.click(bookmarkButton);
    
    // Now, "Bookmarked" should be present
    expect(screen.getByText('Bookmarked')).toBeInTheDocument();
    
    // Click again to remove
    fireEvent.click(screen.getByRole('button', { name: /remove bookmark/i }));
    
    // "Bookmarked" should be gone again
    expect(screen.queryByText('Bookmarked')).toBeNull();
  });

  it('highlights matching search text in title and description', () => {
    render(
      <LibraryServiceItem
        {...defaultProps}
        title="Citation Guides"
        description="Help with citation styles and references"
        searchQuery="citation"
      />,
    );

    const marks = document.querySelectorAll('mark');
    expect(marks).toHaveLength(2);
    expect(marks[0]).toHaveTextContent('Citation');
    expect(marks[1]).toHaveTextContent('citation');
  });
});
