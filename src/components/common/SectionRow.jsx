import React from 'react';

export default function SectionRow({ label, children }) {
  return (
    <div className="flex border-b border-gray-100 last:border-0">
      <div className="w-56 shrink-0 py-6 pr-8">
        <span className="text-lg font-bold text-gray-900">{label}</span>
      </div>
      <div className="flex-1 py-6 border-l border-gray-100 pl-8">
        {children}
      </div>
    </div>
  );
}
