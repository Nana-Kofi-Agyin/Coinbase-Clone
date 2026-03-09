import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import coinbaseLogo from '../../assets/coinbaseLogoNavigation-4.svg';
import { useCurrency } from '../../context/CurrencyContext';

// ─── Icons ────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const MenuIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Nav items with dropdown data ─────────────────────────────────────────────
const NAV_ITEMS = [
  {
    label: 'Cryptocurrencies',
    href: '/explore',
  },
  {
    label: 'Individuals',
    href: '#',
    dropdown: {
      columns: [
        [
          { label: 'Buy and sell', desc: 'Buy, sell, and use crypto', bg: '#1652f0', letter: 'C', href: '/explore' },
          { label: 'Base App', desc: 'Post, earn, trade, and chat, all in one place', bg: '#000', letter: 'B' },
          { label: 'Coinbase One', desc: 'Get zero trading fees and more', bg: '#1652f0', letter: '1' },
          { label: 'Private Client', desc: 'For trusts, family offices, UHNWIs', bg: '#374151', letter: 'P' },
          { label: 'Onchain', desc: 'Dive into the world of onchain apps', bg: '#2563eb', letter: 'O' },
          { label: 'Learn', desc: 'Crypto tips and guides', bg: '#6b7280', letter: 'L', href: '/learn' },
        ],
        [
          { label: 'Advanced', desc: 'Professional-grade trading tools', bg: '#374151', letter: 'A' },
          { label: 'Earn', desc: 'Stake your crypto and earn rewards', bg: '#2563eb', letter: '%' },
          { label: 'Coinbase Wealth', desc: 'Institutional-grade services for UHNW', bg: '#1652f0', letter: 'W' },
          { label: 'Credit Card', desc: 'Earn up to 4% bitcoin back', bg: '#374151', letter: 'C' },
          { label: 'Debit Card', desc: 'Spend crypto, get crypto back', bg: '#374151', letter: 'D' },
        ],
      ],
      promo: {
        title: 'System Update 2025',
        subtitle: 'The next chapter of Coinbase. Live on X 12/17.',
        cta: 'Learn more',
      },
    },
  },
  {
    label: 'Businesses',
    href: '#',
    dropdown: {
      columns: [
        [
          { label: 'Coinbase Commerce', desc: 'Accept crypto payments globally', bg: '#1652f0', letter: 'C' },
          { label: 'Coinbase Prime', desc: 'Institutional-grade trading', bg: '#7c3aed', letter: 'P' },
          { label: 'Custody', desc: 'Secure digital asset storage', bg: '#374151', letter: 'C' },
        ],
        [
          { label: 'Onchain Payments', desc: 'Send and receive on any chain', bg: '#059669', letter: '$' },
          { label: 'Risk Solutions', desc: 'Compliance and fraud prevention', bg: '#dc2626', letter: 'R' },
          { label: 'Developer APIs', desc: 'Build on top of Coinbase', bg: '#1652f0', letter: 'D' },
        ],
      ],
    },
  },
  {
    label: 'Institutions',
    href: '#',
    dropdown: {
      columns: [
        [
          { label: 'Prime', desc: 'Advanced institutional trading', bg: '#7c3aed', letter: 'P' },
          { label: 'Custody', desc: 'Secure cold-storage custody', bg: '#374151', letter: 'C' },
          { label: 'Asset Management', desc: 'Managed crypto portfolios', bg: '#1652f0', letter: 'A' },
        ],
        [
          { label: 'Research', desc: 'Quarterly crypto market reports', bg: '#374151', letter: 'R' },
          { label: 'Regulatory', desc: 'Compliance & regulatory guidance', bg: '#059669', letter: 'Rg' },
          { label: 'Global Markets', desc: 'Trade in 100+ countries', bg: '#0284c7', letter: 'G' },
        ],
      ],
    },
  },
  {
    label: 'Developers',
    href: '#',
    dropdown: {
      columns: [
        [
          { label: 'Developer Platform', desc: 'APIs, SDKs, and documentation', bg: '#111827', letter: '<>' },
          { label: 'Base', desc: 'Ethereum L2 blockchain by Coinbase', bg: '#2563eb', letter: 'B' },
          { label: 'Wallet as a Service', desc: 'Embed secure wallets in your app', bg: '#374151', letter: 'W' },
        ],
        [
          { label: 'Paymaster', desc: 'Sponsor gas fees for users', bg: '#7c3aed', letter: 'P' },
          { label: 'Smart Wallet', desc: 'Frictionless onchain UX', bg: '#059669', letter: 'S' },
          { label: 'Documentation', desc: 'Guides and API reference', bg: '#1652f0', letter: 'D' },
        ],
      ],
    },
  },
  {
    label: 'Company',
    href: '#',
    dropdown: {
      columns: [
        [
          { label: 'About', desc: 'Our mission and story', bg: '#374151', letter: 'A' },
          { label: 'Careers', desc: 'Join the Coinbase team', bg: '#1652f0', letter: 'C' },
          { label: 'Blog', desc: 'Product updates and insights', bg: '#374151', letter: 'B' },
        ],
        [
          { label: 'Press', desc: 'Media kit and PR contacts', bg: '#374151', letter: 'P' },
          { label: 'Legal & Privacy', desc: 'Terms, policies, and compliance', bg: '#374151', letter: 'L' },
          { label: 'Affiliates', desc: 'Partner with Coinbase', bg: '#059669', letter: 'A' },
        ],
      ],
    },
  },
];

// ─── Dropdown panel ───────────────────────────────────────────────────────────
function DropdownPanel({ dropdown, alignRight }) {
  const { columns, footer, promo } = dropdown;
  return (
    <div
      className={`absolute top-full pt-1.5 z-50 invisible opacity-0 translate-y-1 pointer-events-none
        group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
        transition-all duration-150 ease-out
        ${alignRight ? 'right-0' : 'left-0'}`}
    >
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex">
          {/* Content columns */}
          <div className="flex p-3 gap-0">
            {columns.map((col, ci) => (
              <div
                key={ci}
                className={`flex flex-col gap-1 min-w-[220px] ${ci > 0 ? 'border-l border-gray-100 pl-3' : ''} ${ci < columns.length - 1 ? 'pr-3' : ''}`}
              >
                {col.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href || '#'}
                    className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-white text-[10px] font-bold mt-0.5 shadow-sm"
                      style={{ backgroundColor: item.bg || '#6b7280' }}
                    >
                      {item.letter}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 leading-snug">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-snug max-w-[190px]">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Promo card */}
          {promo && (
            <div className="w-52 shrink-0 border-l border-gray-100 p-5 bg-gray-50 flex flex-col gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#1652f0] flex items-center justify-center shadow-md">
                <img src={coinbaseLogo} alt="" className="w-10 h-10 brightness-0 invert" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 leading-snug">{promo.title}</p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{promo.subtitle}</p>
              </div>
              {promo.cta && (
                <Link to="#" className="text-sm font-semibold text-[#1652f0] hover:underline">
                  {promo.cta}
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Footer link */}
        {footer && (
          <div className="border-t border-gray-100 px-5 py-3">
            <Link to={footer.href} className="text-sm text-[#1652f0] font-medium hover:underline">
              {footer.label}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Currency Selector ───────────────────────────────────────────────────────
function CurrencySelector() {
  const { currencies, selectedCurrency, setSelectedCurrency, loading } = useCurrency();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function onOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  const filtered = query
    ? currencies.filter((c) => c.includes(query.toLowerCase()))
    : currencies;

  return (
    <div ref={ref} className="relative hidden sm:block">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => { setOpen((v) => !v); setQuery(''); }}
        disabled={loading}
        className="flex items-center gap-1 h-9 px-3 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200 disabled:opacity-40"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select currency"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-gray-300 border-t-[#1652f0] rounded-full animate-spin" />
        ) : (
          <>
            <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="uppercase text-xs tracking-wide">{selectedCurrency}</span>
            <svg viewBox="0 0 16 16" className={`w-3 h-3 opacity-50 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="4 6 8 10 12 6" />
            </svg>
          </>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-gray-100">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search currency…"
              autoFocus
              className="w-full bg-gray-100 rounded-lg px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#1652f0]"
            />
          </div>
          {/* List */}
          <ul role="listbox" className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-2 text-xs text-gray-400">No results</li>
            )}
            {filtered.map((code) => (
              <li
                key={code}
                role="option"
                aria-selected={code === selectedCurrency}
                onClick={() => { setSelectedCurrency(code); setOpen(false); setQuery(''); }}
                className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors ${
                  code === selectedCurrency
                    ? 'bg-[#1652f0]/5 text-[#1652f0] font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="uppercase font-mono text-xs tracking-wider">{code}</span>
                {code === selectedCurrency && (
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="3 8 6.5 12 13 4" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-4">

        {/* ── Left: logo + desktop nav ── */}
        <div className="flex items-center gap-6 shrink-0">
          <Link to="/" aria-label="Coinbase home">
            <img src={coinbaseLogo} alt="Coinbase" className="h-8 w-8" style={{ filter: 'invert(30%) sepia(99%) saturate(2000%) hue-rotate(210deg) brightness(95%)' }} />
          </Link>

          <nav className="hidden lg:flex items-center" aria-label="Main navigation">
            {NAV_ITEMS.map(({ label, href, dropdown }, idx) => (
              <div key={label} className="relative group">
                <NavLink
                  to={href}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive && href !== '#'
                        ? 'text-[#1652f0]'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  {label}
                  {/* chevron removed to match requested design */}
                </NavLink>
                {dropdown && (
                  <DropdownPanel dropdown={dropdown} alignRight={idx >= NAV_ITEMS.length - 2} />
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* ── Right: actions ── */}
        <div className="flex items-center gap-2">
          <button type="button" className="hidden sm:flex items-center justify-center w-9 h-9 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors cursor-pointer" aria-label="Search">
            <SearchIcon />
          </button>
          <CurrencySelector />
          <Link to="/signin" className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 hover:text-[#1652f0] transition-colors">
            Sign In
          </Link>
          <Link to="/signup" className="inline-flex items-center px-4 py-2 rounded-full bg-[#1652f0] hover:bg-[#1244cc] text-white text-sm font-semibold transition-colors">
            Sign up
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden flex items-center justify-center w-9 h-9 text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer ml-1"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map(({ label, href }) => (
            <NavLink
              key={label}
              to={href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {label}
            </NavLink>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-2 flex gap-2">
            <Link to="/signin" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              Sign In
            </Link>
            <Link to="/signup" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2 rounded-full bg-[#1652f0] hover:bg-[#1244cc] text-white text-sm font-semibold transition-colors">
              Sign up
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
