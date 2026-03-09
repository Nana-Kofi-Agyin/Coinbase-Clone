import React from 'react';

export default function CoinBadge({ color, letter, size = 8 }) {
  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-bold shrink-0`}
      style={{ backgroundColor: color, width: size * 4, height: size * 4, fontSize: size * 1.6 }}
    >
      {letter}
    </div>
  );
}
