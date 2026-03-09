import React from 'react';

export default function Loading({ size = 48 }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0c0d]">
      <div className="flex items-center justify-center">
        <svg
          className="animate-spin text-white"
          style={{ width: size, height: size }}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.15" fill="none" />
          <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    </div>
  );
}
