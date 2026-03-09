import React from 'react';

export default function Tag({ label }) {
  return (
    <span className="inline-block border border-gray-300 text-gray-700 text-xs px-2.5 py-1 rounded-full mr-1.5 mb-1.5">
      {label}
    </span>
  );
}
