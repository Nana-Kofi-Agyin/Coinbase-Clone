import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { useCurrency } from '../context/CurrencyContext';
import Footer from '../components/layout/Footer';
import { CRYPTO_ASSETS, MARKET_STATS, TOP_MOVERS, NEW_ON_COINBASE } from '../data/cryptoData';
import holdingCoin from '../assets/holdingCoin-3.svg';
import Sparkline from '../components/common/Sparkline';
// asset logos (auto-picked best matches)
import bitcoinLogo from '../assets/Learn_Illustration_Ultimate_Guide_Bitcoin.avif';
import ethereumLogo from '../assets/Advanced.avif';
import tetherLogo from '../assets/image.avif';
import bnbLogo from '../assets/Advanced (1).avif';
import xrpLogo from '../assets/c347b6d1a7624e24c4e90089a69dfc8fb75523daf8eeb88007372a0c3a30d428.png';
import usdcLogo from '../assets/coinbase_logo@2x.png';
import solanaLogo from '../assets/3af4b33bde3012fd29dd1366b0ad737660f24acc91750ee30a034a0679256d0b.png';
import tronLogo from '../assets/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png';
import dogeLogo from '../assets/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png';
import cardanoLogo from '../assets/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png';

const LOGO_MAP = {
  bitcoin: bitcoinLogo,
  ethereum: ethereumLogo,
  tether: tetherLogo,
  bnb: bnbLogo,
  xrp: xrpLogo,
  'usd-coin': usdcLogo,
  solana: solanaLogo,
  tron: tronLogo,
  dogecoin: dogeLogo,
  cardano: cardanoLogo,
};

// ─── Icon helpers ─────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const ChevronDown = () => (
  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="4 6 8 10 12 6"/>
  </svg>
);
const StarIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" className={`w-4 h-4 transition-colors ${filled ? 'fill-yellow-400 stroke-yellow-400' : 'fill-none stroke-gray-300 hover:stroke-gray-500'}`} strokeWidth="2" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const SortIcon = () => (
  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 ml-1 opacity-40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <line x1="8" y1="3" x2="8" y2="13"/><polyline points="5 6 8 3 11 6"/><polyline points="5 10 8 13 11 10"/>
  </svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const InfoDot = () => (
  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 ml-1 text-gray-400 inline-block" fill="currentColor" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 7v5M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Sparkline and CoinAvatar extracted to shared components in src/components/common


// ═════════════════════════════════════════════════════════════════════════════
export default function Explore() {
  const { formatPrice, currencyLabel } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites]     = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const TOTAL_ASSETS = 18561;
  const PER_PAGE = 10;
  const TOTAL_PAGES = Math.ceil(TOTAL_ASSETS / PER_PAGE);

  const toggleFav = (id) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filtered = CRYPTO_ASSETS.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.ticker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageNumbers = [1, 2, 3, '...', TOTAL_PAGES];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* ── Page body ── */}
      <main className="flex-1">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-8">

          {/* Two-column layout: main + sidebar */}
          <div className="flex gap-8 items-start">

            {/* ══════════════════════════════ LEFT MAIN COLUMN ══════════════════════════════ */}
            <div className="flex-1 min-w-0">

              {/* ── Page header ── */}
              <section className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Explore crypto</h1>
                <p className="text-sm text-gray-500 mb-4">
                  Coinbase 50 Index is down{' '}
                  <span className="text-red-500 font-medium">↘1.56% (24hrs)</span>
                  <InfoDot />
                </p>

                {/* Search bar */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <SearchIcon />
                  </span>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for an asset"
                    className="w-full bg-gray-100 border border-transparent focus:border-gray-300 focus:bg-white rounded-full pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors"
                  />
                </div>
              </section>

              {/* ── Market stats ── */}
              <section className="mb-10">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-gray-900">Market stats</h2>
                  <div className="flex gap-1">
                    <button type="button" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"><ChevronLeft /></button>
                    <button type="button" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"><ChevronRight /></button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-1 leading-snug">
                  The overall crypto market is growing this week. As of today, the total crypto market capitalization is 23.97 trillion, representing a 0.38% increase from last week.
                </p>
                <button type="button" className="text-sm text-[#1652f0] hover:underline mb-4">Read more</button>

                {/* Stat cards */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                  {MARKET_STATS.map((stat) => (
                    <div key={stat.id} className="border border-gray-200 rounded-xl p-4 bg-white">
                      <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                      <p className="text-base font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-xs font-medium mb-2 ${stat.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {stat.change >= 0 ? '↗' : '↘'}{Math.abs(stat.change).toFixed(2)}%
                      </p>
                      <div className="h-10">
                        <Sparkline points={stat.sparkline} color={stat.sparkColor} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Crypto market prices table ── */}
              <section className="mb-10">
                <div className="flex items-baseline gap-2 mb-1">
                  <h2 className="text-xl font-bold text-gray-900">Crypto market prices</h2>
                  <span className="text-sm text-gray-400">{TOTAL_ASSETS.toLocaleString()} assets</span>
                </div>
                <p className="text-sm text-gray-500 mb-1 leading-snug">
                  The overall crypto market is growing this week. As of today, the total crypto market capitalization is 23.97 trillion, representing a 0.38% increase from last week.
                </p>
                <button type="button" className="text-sm text-[#1652f0] hover:underline mb-4">Read more</button>

                {/* Filter row */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { icon: '🌐', label: 'All assets' },
                    { label: '1D' },
                    { label: 'GHS', realLabel: currencyLabel },
                    { label: '10 rows' },
                  ].map(({ icon, label, realLabel }) => (
                    <button
                      key={label}
                      type="button"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      {icon && <span className="text-xs">{icon}</span>}
                      {realLabel ?? label}
                      <ChevronDown />
                    </button>
                  ))}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="w-6 pb-2" />
                        <th className="text-left font-medium text-gray-500 pb-2">
                          <div className="flex items-center">Asset <SortIcon /></div>
                        </th>
                        <th className="text-right font-medium text-gray-500 pb-2 pr-4">
                          <div className="flex items-center justify-end">Market price <SortIcon /></div>
                        </th>
                        <th className="text-left font-medium text-gray-500 pb-2 pl-4 hidden md:table-cell">Chart</th>
                        <th className="text-right font-medium text-gray-500 pb-2 pr-4">
                          <div className="flex items-center justify-end">Change <SortIcon /></div>
                        </th>
                        <th className="text-right font-medium text-gray-500 pb-2 pr-4 hidden lg:table-cell">
                          <div className="flex items-center justify-end text-[#1652f0]">Mkt cap <SortIcon /></div>
                        </th>
                        <th className="text-right font-medium text-gray-500 pb-2 pr-4 hidden lg:table-cell">
                          <div className="flex items-center justify-end">Volume <SortIcon /></div>
                        </th>
                        <th className="text-right font-medium text-gray-500 pb-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((asset) => (
                        <tr key={asset.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                          {/* Star */}
                          <td className="py-3 pr-2">
                            <button
                              type="button"
                              onClick={() => toggleFav(asset.id)}
                              className="cursor-pointer"
                              aria-label={`${favorites.has(asset.id) ? 'Remove from' : 'Add to'} favorites`}
                            >
                              <StarIcon filled={favorites.has(asset.id)} />
                            </button>
                          </td>

                          {/* Asset name */}
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-white flex items-center justify-center">
                                  <img src={LOGO_MAP[asset.id] || ''} alt={`${asset.name} logo`} className="w-full h-full object-cover" />
                                </div>
                              <div>
                                <p className="font-semibold text-gray-900">{asset.name}</p>
                                <p className="text-xs text-gray-400">
                                  {asset.ticker}
                                  {asset.badge && (
                                    <span className="ml-1 text-[#1652f0]">• {asset.badge}</span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Price */}
                          <td className="py-3 pr-4 text-right font-medium text-gray-900 whitespace-nowrap">
                            {formatPrice(asset.price)}
                          </td>

                          {/* Sparkline */}
                          <td className="py-3 pl-4 pr-4 hidden md:table-cell w-20">
                            <div className="w-14 h-8">
                              <Sparkline points={asset.sparkline} color={asset.sparkColor} />
                            </div>
                          </td>

                          {/* Change */}
                          <td className={`py-3 pr-4 text-right font-medium whitespace-nowrap ${asset.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {asset.change >= 0 ? '↗' : '↘'}{Math.abs(asset.change).toFixed(2)}%
                          </td>

                          {/* Market cap */}
                          <td className="py-3 pr-4 text-right text-gray-700 whitespace-nowrap hidden lg:table-cell">
                            {asset.marketCap}
                          </td>

                          {/* Volume */}
                          <td className="py-3 pr-4 text-right text-gray-700 whitespace-nowrap hidden lg:table-cell">
                            {asset.volume}
                          </td>

                          {/* Trade button */}
                          <td className="py-3 text-right">
                            {asset.tradeable ? (
                              <Link
                                to={`/assets/${asset.id}`}
                                className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#1652f0] hover:bg-[#1244cc] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                              >
                                Trade
                              </Link>
                            ) : (
                              <span className="inline-block w-14" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col items-center gap-2 mt-6">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <ChevronLeft />
                    </button>

                    {pageNumbers.map((n, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => typeof n === 'number' && setCurrentPage(n)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors cursor-pointer ${
                          n === currentPage
                            ? 'bg-[#1652f0] text-white font-semibold'
                            : n === '...'
                            ? 'text-gray-400 cursor-default'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {n}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
                      disabled={currentPage === TOTAL_PAGES}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <ChevronRight />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    {((currentPage - 1) * PER_PAGE) + 1}–{Math.min(currentPage * PER_PAGE, TOTAL_ASSETS)} of {TOTAL_ASSETS.toLocaleString()} assets
                  </p>
                </div>
              </section>

              {/* ── Blue CTA banner ── */}
              <section className="rounded-2xl bg-[#1652f0] overflow-hidden mb-4">
                <div className="flex items-center justify-between px-8 py-8 gap-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white leading-snug mb-4">
                      Create a Coinbase account to trade<br />crypto. It&apos;s quick, easy, and secure.
                    </h2>
                    <Link
                      to="/signup"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Start Trading <ArrowRight />
                    </Link>
                  </div>
                  <div className="hidden md:block shrink-0 w-40 h-32">
                    <img src={holdingCoin} alt="" className="w-full h-full object-contain" aria-hidden="true" />
                  </div>
                </div>
              </section>
            </div>

            {/* ══════════════════════════════ RIGHT SIDEBAR ══════════════════════════════ */}
            <aside className="hidden xl:flex flex-col gap-5 w-64 shrink-0">

              {/* Get started card */}
              <div className="rounded-2xl bg-[#1652f0] p-5 relative overflow-hidden">
                <h3 className="text-white font-bold text-base mb-0.5">Get started</h3>
                <p className="text-blue-200 text-sm mb-3">Create your account today</p>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-4 py-2 rounded-full bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
                >
                  Sign up
                </Link>
                <div className="absolute -right-2 -bottom-2 w-20 h-20 opacity-90">
                  <img src={holdingCoin} alt="" className="w-full h-full object-contain" aria-hidden="true" />
                </div>
              </div>

              {/* Top movers */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-gray-900 text-base">Top movers</h3>
                  <div className="flex gap-1">
                    <button type="button" className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-100 cursor-pointer transition-colors"><ChevronLeft /></button>
                    <button type="button" className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-100 cursor-pointer transition-colors"><ChevronRight /></button>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-3">24hr change</p>
                <div className="flex gap-2">
                  {TOP_MOVERS.map((m) => (
                    <div key={m.ticker} className="flex-1 border border-gray-100 rounded-xl p-3 bg-white">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mb-2"
                        style={{ backgroundColor: m.bgColor }}
                      >
                        {m.ticker.charAt(0)}
                      </div>
                      <p className="text-xs text-gray-500 font-medium">{m.ticker}</p>
                      <p className="text-sm font-bold text-red-500">↘{Math.abs(m.change).toFixed(2)}%</p>
                      <p className="text-xs text-gray-400">{m.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* New on Coinbase */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900 text-base">New on Coinbase</h3>
                  <div className="flex gap-1">
                    <button type="button" className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-100 cursor-pointer transition-colors"><ChevronLeft /></button>
                    <button type="button" className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-100 cursor-pointer transition-colors"><ChevronRight /></button>
                  </div>
                </div>
                <div className="flex gap-2">
                  {NEW_ON_COINBASE.map((c) => (
                    <div key={c.ticker} className="flex-1 border border-gray-100 rounded-xl p-3 bg-white">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mb-2"
                        style={{ backgroundColor: c.color }}
                      >
                        {c.ticker.charAt(0)}
                      </div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{c.ticker}</p>
                      <p className="text-sm font-bold text-gray-900">{c.name}</p>
                      <p className="text-xs text-gray-400">{c.addedDate}</p>
                    </div>
                  ))}
                </div>
              </div>

            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
