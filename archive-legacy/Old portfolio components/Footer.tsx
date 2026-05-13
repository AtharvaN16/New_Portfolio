'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useTheme } from '@/contexts/ThemeContext';
const RatingModal = dynamic(() => import('./RatingModal'), { ssr: false });
import '@/styles/components/footer.css';

const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [emailCopied, setEmailCopied] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [gradientPosition, setGradientPosition] = useState(50); // 50% is center
  const [targetGradientPosition, setTargetGradientPosition] = useState(50); // Target position for smooth animation
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const ratingArrowRef = useRef<SVGSVGElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();

  // Get last commit date from environment variable or fallback to current date
  const lastCommitDate = process.env.NEXT_PUBLIC_LAST_COMMIT_DATE 
    ? new Date(process.env.NEXT_PUBLIC_LAST_COMMIT_DATE) 
    : new Date();

  const handleMouseEnter = (arrowRef: React.RefObject<SVGSVGElement | null>) => {
    if (arrowRef.current) {
      // Arrow exits to the right, then re-enters from the left
      gsap.timeline()
        .to(arrowRef.current, { 
          x: 30, 
          opacity: 0, 
          duration: 0.2, 
          ease: "power2.in" 
        })
        .set(arrowRef.current, { x: -30 })
        .to(arrowRef.current, { 
          x: 0, 
          opacity: 1, 
          duration: 0.3, 
          ease: "power2.out" 
        });
    }
  };

  const handleMouseLeave = (arrowRef: React.RefObject<SVGSVGElement | null>) => {
    if (arrowRef.current) {
      gsap.to(arrowRef.current, { 
        x: 0, 
        opacity: 1,
        duration: 0.3, 
        ease: "power2.out" 
      });
    }
  };

  // Update time every second
  useEffect(() => {
    let timer: number | null = null;
    const start = () => {
      if (timer !== null) return;
      timer = window.setInterval(() => setCurrentTime(new Date()), 1000);
    };
    const stop = () => {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    };
    // Start initially, pause when tab hidden to reduce background work
    start();
    const onVisibility = () => (document.visibilityState === 'hidden' ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      stop();
    };
  }, []);

  // Handle mouse movement for gradient animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - footerRect.left;
        const footerWidth = footerRect.width;
        const centerX = footerWidth / 2;
        
        // Calculate position as percentage from center
        let position;
        if (mouseX <= centerX) {
          // Left half: red increases (position decreases)
          position = 50 - ((centerX - mouseX) / centerX) * 30; // Max 30% shift
        } else {
          // Right half: blue increases (position increases)
          position = 50 + ((mouseX - centerX) / centerX) * 30; // Max 30% shift
        }
        
        // Clamp between 20% and 80%
        position = Math.max(20, Math.min(80, position));
        setTargetGradientPosition(position);
      }
    };

    const footerElement = footerRef.current;
    if (footerElement) {
      footerElement.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        footerElement.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  // Smooth animation for gradient position with throttling
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      const diff = targetGradientPosition - gradientPosition;
      if (Math.abs(diff) > 0.1) {
        // Throttle the movement - slower when diff is larger
        const throttleFactor = Math.min(0.05, 0.02 + (Math.abs(diff) * 0.001));
        setGradientPosition(prev => prev + diff * throttleFactor);
      }
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [targetGradientPosition, gradientPosition]);

  // Copy email to clipboard
  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText('atharvanayak16@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  // Scroll to top
  const handleGoBackUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle rating modal
  const handleRatingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRatingModalOpen(true);
  };

  const handleCloseRatingModal = (wasSubmitted = false) => {
    setIsRatingModalOpen(false);
    if (wasSubmitted) {
      setFeedbackSubmitted(true);
      setTimeout(() => setFeedbackSubmitted(false), 3000); // Show for 3 seconds
    }
  };

  // Format time and date
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

           return (
             <>
               <footer ref={footerRef} id="footer" className="footer-main-container">
      {/* Top Section - Thank You and Go Back Up */}
      <section className="footer-top-section">
        <div className="footer-top-content-wrapper">
          {/* Left Side - Thank You */}
                                            <div className="footer-thank-you-container">
                   <h3 className="footer-thank-you-heading">Thank you for visiting :)</h3>
                   <div className="footer-rating-info">
                     <div className="footer-rating-content">
                       <div 
                         className="footer-rating-link-container"
                         onMouseEnter={() => handleMouseEnter(ratingArrowRef)}
                         onMouseLeave={() => handleMouseLeave(ratingArrowRef)}
                       >
                          <a 
                            href="#" 
                            className="footer-rating-link navbar-link"
                            onClick={handleRatingClick}
                            style={{ position: 'relative', display: 'inline-block' }}
                          >
                            <span style={{
                              display: 'inline-block',
                              transition: 'opacity 0.25s ease',
                              opacity: 1
                            }} className="footer-link-layer base">
                              Rate my portfolio
                            </span>
                            <span style={{
                              position: 'absolute',
                              inset: 0,
                              display: 'inline-block',
                              transition: 'opacity 0.25s ease',
                              opacity: 0
                            }} className="footer-link-layer hover">
                              Rate my portfolio
                            </span>
                          </a>
                         <div className="footer-rating-arrow">
                           <svg 
                             ref={ratingArrowRef}
                             width="15" 
                             height="13" 
                             viewBox="0 0 15 13" 
                             fill="none"
                             style={{ opacity: 1, transform: 'translateX(0px)' }}
                           >
                             <path d="M14.207 6.49609C14.207 6.28125 14.1094 6.07617 13.9336 5.91016L8.89453 0.88086C8.71877 0.714844 8.52341 0.636719 8.31837 0.636719C7.88867 0.636719 7.55664 0.958984 7.55664 1.39844C7.55664 1.60352 7.625 1.80859 7.77149 1.94531L9.11917 3.3418L12.4199 6.32031L12.5957 5.89062L9.99805 5.70508H0.779296C0.320312 5.70508 -0.00195312 6.03711 -0.00195312 6.49609C-0.00195312 6.95508 0.320312 7.28711 0.779296 7.28711H9.99805L12.5957 7.10156L12.4199 6.68164L9.11917 9.6504L7.77149 11.0469C7.625 11.1836 7.55664 11.3886 7.55664 11.5938C7.55664 12.0332 7.88867 12.3554 8.31837 12.3554C8.52341 12.3554 8.71877 12.2774 8.89453 12.1114L13.9336 7.08203C14.1094 6.91601 14.207 6.71093 14.207 6.49609Z" fill="currentColor"/>
                           </svg>
                         </div>
                         {feedbackSubmitted && (
                           <span className="footer-feedback-submitted-indicator">
                             Feedback Submitted!
                           </span>
                         )}
                       </div>
                       <p className="footer-rating-subtext">Takes less than 5 min and is anonymous, your feedback helps me improve</p>
                     </div>
                   </div>
                 </div>

                           {/* Right Side - Go Back Up */}
                 <div className="footer-go-back-up-container">
                   <button 
                     onClick={handleGoBackUp}
                     className="footer-go-back-up-button"
                   >
                     <span className="footer-go-back-up-text navbar-link">Go back up</span>
                     <div className="footer-go-back-up-arrow">
                       <svg 
                         width="15" 
                         height="13" 
                         viewBox="0 0 15 13" 
                         fill="none"
                       >
                         <path d="M14.207 6.49609C14.207 6.28125 14.1094 6.07617 13.9336 5.91016L8.89453 0.88086C8.71877 0.714844 8.52341 0.636719 8.31837 0.636719C7.88867 0.636719 7.55664 0.958984 7.55664 1.39844C7.55664 1.60352 7.625 1.80859 7.77149 1.94531L9.11917 3.3418L12.4199 6.32031L12.5957 5.89062L9.99805 5.70508H0.779296C0.320312 5.70508 -0.00195312 6.03711 -0.00195312 6.49609C-0.00195312 6.95508 0.320312 7.28711 0.779296 7.28711H9.99805L12.5957 7.10156L12.4199 6.68164L9.11917 9.6504L7.77149 11.0469C7.625 11.1836 7.55664 11.3886 7.55664 11.5938C7.55664 12.0332 7.88867 12.3554 8.31837 12.3554C8.52341 12.3554 8.71877 12.2774 8.89453 12.1114L13.9336 7.08203C14.1094 6.91601 14.207 6.71093 14.207 6.49609Z" fill="currentColor"/>
                       </svg>
                     </div>
                   </button>
                 </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <section className="footer-main-content-section">
        <div className="footer-content-wrapper">
          {/* Left Side - Quick Links and Contact Combined */}
          <div className="footer-left-side-container">
            <div className="footer-quick-links-container">
              <h3 className="footer-quick-links-heading">Quick links</h3>
              <nav className="footer-quick-links-nav">
                <a href="/resume" className="footer-quick-link navbar-link">Resume</a>
                <a href="/work" className="footer-quick-link navbar-link">Work</a>
                <a href="/explorations" className="footer-quick-link navbar-link">Explorations</a>
                <Link href="/writings" className="footer-quick-link navbar-link">Writings</Link>
                <a href="/about" className="footer-quick-link navbar-link">About</a>
              </nav>
            </div>
            
            <div className="footer-contact-container">
              <h3 className="footer-contact-heading">Get in touch</h3>
              <div className="footer-contact-links">
                <a href="https://www.linkedin.com/in/atharva-nayak-142b95184/" target="_blank" rel="noopener noreferrer" className="footer-contact-link navbar-link">
                  LinkedIn
                </a>
                <a href="https://calendly.com/atharvanayak16" target="_blank" rel="noopener noreferrer" className="footer-contact-link navbar-link">
                  Schedule a call
                </a>
                <div className="footer-email-container">
                  <a 
                    href="mailto:atharvanayak16@gmail.com"
                    className="footer-email-link navbar-link"
                  >
                    atharvanayak16@gmail.com
                  </a>
                  <button 
                    onClick={handleEmailCopy}
                    className="footer-email-copy-button"
                    aria-label="Copy email to clipboard"
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                  {emailCopied && (
                    <span className="footer-email-copied-indicator">
                      Copied!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Location and Time */}
          <div className="footer-right-side-container">
                             <div className="footer-location-time-container">
                   <h4 className="footer-location-heading">New York</h4>
                   <div className="footer-time-date-group">
                     <p className="footer-time-text">{formatTime(currentTime)}</p>
                     <p className="footer-date-text">{formatDate(currentTime)}</p>
                   </div>
                 </div>
          </div>
        </div>
      </section>

      {/* Bottom Footer Section */}
      <section className="footer-bottom-section">
        <div className="footer-bottom-content-wrapper">
          {/* Tech Stack Disclaimer */}
                           <div className="footer-tech-stack-container">
                   <p className="footer-tech-stack-text">
                     No Framer or Webflow here — I vibe-coded it from scratch using Next.js in Cursor
                   </p>
                 </div>

                           {/* Copyright and Last Updated */}
                 <div className="footer-copyright-container">
                   <p className="footer-copyright-text">© {new Date().getFullYear()}</p>
                   <p className="footer-last-updated-text">
                     Last Updated: {lastCommitDate.toLocaleDateString('en-US', { 
                       month: 'short', 
                       day: 'numeric', 
                       year: 'numeric' 
                     })}
                   </p>
                 </div>
        </div>
                   </section>
             
             {/* Gradient Frame Below Footer */}
             <div 
               className="footer-gradient-frame"
               style={{
                 background: `linear-gradient(90deg, 
                   ${theme === 'light' ? '#3032A2' : '#565AD3'} 0%, 
                   ${theme === 'light' ? '#3032A2' : '#565AD3'} ${gradientPosition - 20}%, 
                   ${theme === 'light' ? '#FA5068' : '#B33E81'} ${gradientPosition + 20}%, 
                   ${theme === 'light' ? '#FA5068' : '#B33E81'} 100%)`
               }}
             ></div>
           </footer>
           
           {/* Rating Modal */}
           <RatingModal 
             isOpen={isRatingModalOpen}
             onClose={handleCloseRatingModal}
           />
         </>
       );
     };

export default Footer; 