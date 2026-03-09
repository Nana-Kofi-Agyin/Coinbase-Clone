import React from 'react';

export default function CoinAvatar({ name, ticker, color }) {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
      style={{ backgroundColor: color }}
      aria-label={name}
    >
      {ticker.charAt(0)}
    </div>
  );
}
