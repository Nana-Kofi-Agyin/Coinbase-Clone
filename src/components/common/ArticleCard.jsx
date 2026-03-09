import React from 'react';

export function VideoPlayIcon() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-14 h-14 rounded-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current ml-1" aria-hidden="true">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
      </div>
    </div>
  );
}

export function ArticleTag({ label }) {
  if (!label) return null;
  return (
    <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-gray-500 mb-1 block">
      {label}
    </span>
  );
}

export default function ArticleCard({ article, large = false, horizontal = false }) {
  if (horizontal) {
    return (
      <div className="flex gap-4 cursor-pointer group border-b border-gray-100 pb-5 last:border-0 last:pb-0">
        <div
          className="w-24 h-16 rounded-lg overflow-hidden shrink-0 relative"
          style={{ backgroundColor: article.bg }}
        >
          <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
          {article.isVideo && <VideoPlayIcon />}
        </div>
        <div>
          <ArticleTag label={article.tag} />
          <p className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#1652f0] transition-colors">
            {article.title}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="cursor-pointer group">
      <div
        className={`w-full overflow-hidden rounded-2xl relative mb-3 ${large ? 'h-64' : 'h-52'}`}
        style={{ backgroundColor: article.bg }}
      >
        <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
        {article.isVideo && <VideoPlayIcon />}
      </div>
      <ArticleTag label={article.tag} />
      <h3 className={`font-bold text-gray-900 leading-snug group-hover:text-[#1652f0] transition-colors ${large ? 'text-xl' : 'text-sm'}`}>
        {article.title}
      </h3>
      {article.desc && (
        <p className={`text-gray-500 leading-relaxed mt-1 ${large ? 'text-sm' : 'text-xs'}`}>
          {article.desc}
        </p>
      )}
    </div>
  );
}
