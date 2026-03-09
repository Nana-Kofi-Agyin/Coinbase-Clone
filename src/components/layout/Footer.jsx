import { Link } from 'react-router-dom';
import coinbaseLogo from '../../assets/coinbaseLogoNavigation-4.svg';

// ─── Social icons (inlined from assets, recoloured for light footer) ──────────
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
    <path fill="currentColor" d="M9.524 6.776 15.48 0H14.07L8.895 5.882 4.765 0H0l6.247 8.896L0 16h1.411l5.462-6.213L11.235 16H16M1.92 1.041H4.09l9.98 13.969H11.9"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
    <path fill="currentColor" d="M12.667 0H3.333A3.334 3.334 0 0 0 0 3.333v9.334A3.334 3.334 0 0 0 3.333 16h9.334A3.333 3.333 0 0 0 16 12.667V3.333A3.333 3.333 0 0 0 12.667 0M5.333 12.667h-2V5.333h2zm-1-8.179a1.17 1.17 0 0 1-1.166-1.176c0-.65.522-1.176 1.166-1.176S5.5 2.663 5.5 3.312c0 .65-.522 1.176-1.167 1.176m9 8.179h-2V8.93c0-2.246-2.666-2.076-2.666 0v3.736h-2V5.333h2V6.51c.93-1.724 4.666-1.851 4.666 1.65z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
    <path fill="currentColor" d="M8 1.442c2.136 0 2.39.008 3.233.047 2.168.098 3.181 1.127 3.28 3.279.038.843.046 1.097.046 3.233s-.008 2.389-.046 3.232c-.1 2.15-1.11 3.181-3.28 3.28-.844.038-1.096.046-3.233.046s-2.39-.008-3.233-.046c-2.173-.1-3.18-1.133-3.279-3.28-.039-.844-.047-1.096-.047-3.233s.009-2.389.047-3.233c.1-2.151 1.11-3.18 3.28-3.279C5.61 1.45 5.863 1.442 8 1.442M8 0C5.827 0 5.555.01 4.702.048 1.797.181.182 1.793.049 4.701.009 5.555 0 5.827 0 8s.01 2.445.048 3.299c.133 2.905 1.745 4.52 4.653 4.653C5.555 15.991 5.827 16 8 16s2.445-.01 3.299-.048c2.902-.133 4.521-1.745 4.652-4.653.04-.854.049-1.126.049-3.299s-.01-2.445-.048-3.298c-.13-2.903-1.745-4.52-4.653-4.653C10.445.009 10.173 0 8 0m0 3.892a4.108 4.108 0 1 0 0 8.216 4.108 4.108 0 0 0 0-8.216m0 6.775a2.666 2.666 0 1 1 0-5.333 2.666 2.666 0 0 1 0 5.333m4.27-7.897a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92"/>
  </svg>
);
const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
    <path fill="currentColor" d="M11.382 0H8.686v10.899c0 1.298-1.037 2.365-2.328 2.365S4.03 12.197 4.03 10.899c0-1.276 1.015-2.32 2.259-2.366V5.797c-2.743.046-4.955 2.296-4.955 5.102C1.334 13.728 3.593 16 6.381 16c2.789 0 5.047-2.296 5.047-5.101V5.31a6.24 6.24 0 0 0 3.573 1.206V3.78c-2.028-.07-3.619-1.74-3.619-3.78"/>
  </svg>
);

// ─── Footer link columns ──────────────────────────────────────────────────────
const FOOTER_COLS = [
  {
    heading: 'Company',
    links: ['About','Careers','Affiliates','Blog','Press','Security','Investors','Vendors','Legal & privacy','Cookie policy','Cookie preferences','Digital Asset Disclosures'],
  },
  {
    heading: 'Individuals',
    links: ['Buy & sell','Earn free crypto','Base App','Coinbase One','Debit Card'],
    subHeading: 'Businesses',
    subLinks: ['Asset Listings','Coinbase Business','Payments','Commerce','Token Manager'],
  },
  {
    heading: 'Developers',
    links: ['Developer Platform','Base','Server Wallets','Embedded Wallets','Base Accounts (Smart Wallets)','Onramp & Offramp','x402','Trade API','Paymaster','OnchainKit','Data API','Verifications','Node','AgentKit','Staking','Faucet','Exchange API','International Exchange API','Prime API','Derivatives API'],
  },
  {
    heading: 'Learn',
    links: ['Explore','Market statistics','Coinbase Bytes newsletter','Crypto basics','Tips & tutorials','Crypto glossary','Market updates','What is Bitcoin?','What is crypto?','What is a blockchain?','How to set up a crypto wallet?','How to send crypto?','Taxes'],
  },
  {
    heading: 'Support',
    links: ['Help center','Contact us','Create account','ID verification','Account information','Payment methods','Account access','Supported crypto','Status'],
    subHeading: 'Asset prices',
    subLinks: ['Bitcoin price','Ethereum price','Solana price','XRP price'],
    extraHeading: 'Stock prices',
    extraLinks: ['NVIDIA price','Apple price','Microsoft price','Amazon price'],
  },
];

// Inside the Institutions group we add separately
const INSTITUTIONS = {
  heading: 'Institutions',
  links: ['Prime','Staking','Exchange','International Exchange','Derivatives Exchange','Verified Pools'],
};

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f0] border-t border-gray-200 pt-14 pb-8">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-6">

        {/* ── Top section: logo + columns ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">

          {/* Logo */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link to="/" aria-label="Coinbase home">
              <img
                src={coinbaseLogo}
                alt="Coinbase"
                className="h-10 w-10"
                style={{ filter: 'invert(24%) sepia(99%) saturate(1800%) hue-rotate(210deg) brightness(90%)' }}
              />
            </Link>
          </div>

          {/* Company */}
          <FooterCol col={FOOTER_COLS[0]} />

          {/* Individuals + Businesses */}
          <div>
            <FooterCol col={FOOTER_COLS[1]} />
            {FOOTER_COLS[1].subHeading && (
              <div className="mt-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">{FOOTER_COLS[1].subHeading}</h3>
                <ul className="space-y-2">
                  {FOOTER_COLS[1].subLinks.map((l) => (
                    <li key={l}><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{l}</a></li>
                  ))}
                </ul>
                {/* Institutions inline below Businesses */}
                <h3 className="text-sm font-bold text-gray-900 mb-3 mt-6">{INSTITUTIONS.heading}</h3>
                <ul className="space-y-2">
                  {INSTITUTIONS.links.map((l) => (
                    <li key={l}><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Developers */}
          <FooterCol col={FOOTER_COLS[2]} />

          {/* Learn */}
          <FooterCol col={FOOTER_COLS[3]} />

          {/* Support + Asset prices + Stock prices */}
          <div>
            <FooterCol col={{ heading: FOOTER_COLS[4].heading, links: FOOTER_COLS[4].links }} />
            <h3 className="text-sm font-bold text-gray-900 mb-3 mt-6">{FOOTER_COLS[4].subHeading}</h3>
            <ul className="space-y-2 mb-6">
              {FOOTER_COLS[4].subLinks.map((l) => (
                <li key={l}><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{l}</a></li>
              ))}
            </ul>
            <h3 className="text-sm font-bold text-gray-900 mb-3">{FOOTER_COLS[4].extraHeading}</h3>
            <ul className="space-y-2">
              {FOOTER_COLS[4].extraLinks.map((l) => (
                <li key={l}><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Social icons ── */}
        <div className="flex gap-4 mb-8">
          {[
            { Icon: XIcon,         label: 'X (Twitter)' },
            { Icon: LinkedInIcon,  label: 'LinkedIn' },
            { Icon: InstagramIcon, label: 'Instagram' },
            { Icon: TikTokIcon,    label: 'TikTok' },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Icon />
            </a>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
            <span>© 2026 Coinbase</span>
            <span className="text-gray-300">•</span>
            <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
            <span className="text-gray-300">•</span>
            <a href="#" className="hover:text-gray-700 transition-colors">Terms &amp; Conditions</a>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            Global
            <span className="text-gray-300">•</span>
            English
          </div>
        </div>

      </div>
    </footer>
  );
}

// ── Small helper ──────────────────────────────────────────────────────────────
function FooterCol({ col }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-900 mb-3">{col.heading}</h3>
      <ul className="space-y-2">
        {col.links.map((l) => (
          <li key={l}>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
