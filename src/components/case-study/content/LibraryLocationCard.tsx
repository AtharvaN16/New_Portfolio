'use client';

import React from 'react';
import Image from 'next/image';
import type { LibraryLocation } from '@/lib/data/library-hours-data';
import { LibraryCardNotificationBanner } from './ualberta/LibraryCardNotificationBanner';

interface LibraryLocationCardProps {
  library: LibraryLocation;
  notification?: string;
  animateNotification?: boolean;
}

const InfoRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex gap-5 py-2">
    <span className="w-[110px] flex-shrink-0 text-[11px] text-[#383838] font-semibold leading-snug pt-0.5">
      {label}
    </span>
    <div className="flex-1 text-[11px] text-[#383838] leading-snug">{children}</div>
  </div>
);

const AmenityChip: React.FC<{ label: string; value: string | number | boolean | undefined }> = ({
  label,
  value,
}) => {
  const isEmpty = value === undefined || value === false;
  return (
    <div className="flex flex-col items-start gap-1.5">
      <span className="text-[9px] text-[#888] font-medium uppercase tracking-wide leading-none">
        {label}
      </span>
      <span className={`leading-tight ${isEmpty ? 'text-[#BDBDBD]' : 'text-[#383838]'}`}>
        {typeof value === 'number' ? (
          <span className="text-[11px] font-semibold">{value} rooms</span>
        ) : value === true ? (
          <span className="material-symbols-rounded" style={{ fontSize: '15px', color: '#265D38', fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        ) : (
          <span className="text-[11px] font-semibold">—</span>
        )}
      </span>
    </div>
  );
};

export const LibraryLocationCard: React.FC<LibraryLocationCardProps> = ({
  library,
  notification,
  animateNotification = false,
}) => {
  const multiLocation = library.addresses.length > 1;
  const notificationText = notification ?? library.notification;

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-sm overflow-hidden w-full p-4 flex flex-col">
      {notificationText ? (
        <LibraryCardNotificationBanner
          text={notificationText}
          animate={animateNotification}
        />
      ) : null}

      {/* 2. Main Row: Image + Content */}
      <div className="flex gap-5 items-start">
        {/* Left: Library Image with Stroke */}
        <div className="w-[110px] flex-shrink-0">
          <div className="w-[110px] h-[110px] rounded-xl overflow-hidden bg-[#F5F5F5] border border-[#E0E0E0]">
            {library.imageUrl ? (
              <Image 
                src={library.imageUrl} 
                alt={library.name} 
                width={110}
                height={110}
                sizes="110px"
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-[#888]">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-[#1F5C35] text-[15px] font-bold mb-3 leading-tight">
            {library.name}
          </h3>

          {/* Amenities Row */}
          <div className="grid grid-cols-4 gap-3 mb-3 pb-3 border-b border-[#EFEFEF]">
            <AmenityChip label="Study Rooms" value={library.amenities.studyRooms} />
            <AmenityChip label="Workstations" value={library.amenities.workstations} />
            <AmenityChip label="Night Study" value={library.amenities.nightStudy} />
            <AmenityChip label="Printers" value={library.amenities.printers} />
          </div>

          {/* Info Rows */}
          <div className="mb-2">
            <InfoRow label="Today's Hours">
              <span className="inline-flex items-center gap-2 flex-wrap">
                <span>{library.hours}</span>
                <span className="text-[#BBB]">|</span>
                <a href="#" className="text-[#383838] font-semibold uppercase tracking-wide text-[9px] hover:text-[#1F5C35] transition-colors">
                  Library Hours →
                </a>
              </span>
            </InfoRow>

            <InfoRow label="Location">
              {multiLocation ? (
                <div className="grid grid-cols-2 gap-4">
                  {library.addresses.map((addr, i) => (
                    <div key={i}>
                      {addr.label && (
                        <p className="text-[10px] font-semibold text-[#383838] mb-0.5">{addr.label}</p>
                      )}
                      {addr.lines.map((line, j) => <div key={j}>{line}</div>)}
                      <a href="#" className="inline-block mt-3 text-[#383838] font-semibold uppercase tracking-wide text-[9px] hover:text-[#1F5C35] transition-colors">
                        Directions →
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {library.addresses[0].lines.map((line, i) => <div key={i}>{line}</div>)}
                  <a href="#" className="inline-block mt-3 text-[#383838] font-semibold uppercase tracking-wide text-[9px] hover:text-[#1F5C35] transition-colors">
                    Directions →
                  </a>
                </div>
              )}
            </InfoRow>

            {library.phone && (
              <InfoRow label="Phone">
                <a href={`tel:${library.phone}`} className="text-[#2C5CB8] hover:underline underline-offset-2">
                  {library.phone}
                </a>
              </InfoRow>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mt-auto">
            <button className="flex items-center gap-1.5 px-2.5 py-1 border border-[#BDBDBD] rounded-sm text-[10px] text-[#383838] font-medium hover:bg-[#F5F5F5] transition-colors">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              Email Us
            </button>
            {library.staffLabel && (
              <button className="flex items-center gap-1.5 px-2.5 py-1 border border-[#BDBDBD] rounded-sm text-[10px] text-[#383838] font-medium hover:bg-[#F5F5F5] transition-colors">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                {library.staffLabel} Staff
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryLocationCard;
