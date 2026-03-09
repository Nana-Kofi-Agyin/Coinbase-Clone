import React from 'react';

export default function AccordionItem({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left text-sm font-medium text-gray-900 hover:text-[#1652f0] transition-colors"
      >
        {q}
        <span className="ml-4 shrink-0 text-lg leading-none text-gray-400">{open ? '−' : '+'}</span>
      </button>
      {open && a && (
        <div className="pb-4 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
          {a}
        </div>
      )}
    </div>
  );
}
