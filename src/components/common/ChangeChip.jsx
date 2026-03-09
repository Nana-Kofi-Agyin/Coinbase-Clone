import React from 'react';

export default function ChangeChip({ value, prefix = '' }) {
  const pos = value >= 0;
  return (
    <span className={`text-sm font-medium ${pos ? 'text-[#05b169]' : 'text-[#f34141]'}`}>
      {pos ? '↑' : '↓'} {prefix}{Math.abs(value).toFixed(2)}%
    </span>
  );
}
