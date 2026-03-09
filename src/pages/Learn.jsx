import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ArticleCard, { VideoPlayIcon, ArticleTag } from '../components/common/ArticleCard';
import learnBitcoinImg from '../assets/Learn_Illustration_Ultimate_Guide_Bitcoin.avif';
import advancedImg     from '../assets/Advanced.avif';
import replaceBank     from '../assets/Replace_Bank.avif';
import imageAvif       from '../assets/image.avif';
import investImg       from '../assets/0_4mVyVaU6yLa--GR_.avif';
import cbLolp          from '../assets/CB_LOLP__1_.avif';
import p1 from '../assets/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png';
import p2 from '../assets/c347b6d1a7624e24c4e90089a69dfc8fb75523daf8eeb88007372a0c3a30d428.png';
import p3 from '../assets/3af4b33bde3012fd29dd1366b0ad737660f24acc91750ee30a034a0679256d0b.png';
import p4 from '../assets/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png';
import p5 from '../assets/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png';
import p6 from '../assets/1f8489bb280fb0a0fd643c1161312ba49655040e9aaaced5f9ad3eeaf868eadc.png';

// ─── Data ─────────────────────────────────────────────────────────────────────
const POPULAR_ARTICLES = [
  { tag: "BEGINNER'S GUIDE",  title: 'What is cryptocurrency?' },
  { tag: 'GETTING STARTED',   title: 'How to earn crypto rewards' },
  { tag: 'GETTING STARTED',   title: 'How to add crypto to your Coinbase Wallet' },
  { tag: 'YOUR CRYPTO',       title: 'Tax forms, explained: A guide to U.S. tax forms and crypto reports' },
  { tag: 'GETTING STARTED',   title: "Beginner's guide to dapps" },
  { tag: 'MARKET UPDATE',     title: 'Everything you need to know about the first-ever U.S. Bitcoin ETF' },
];

const CATEGORY_NAV = [
  { id: 'crypto-basics',    label: 'Crypto basics',    emoji: '🧠' },
  { id: 'tips-tutorials',   label: 'Tips and tutorials', emoji: '📋' },
  { id: 'advanced-trading', label: 'Advanced trading',  emoji: '📊' },
  { id: 'futures',          label: 'Futures',           emoji: '🔮' },
];

const CRYPTO_BASICS_LARGE = [
  {
    tag: "BEGINNER'S GUIDE",
    title: 'What is Bitcoin?',
    desc: 'Bitcoin is the world\'s first widely adopted cryptocurrency — it allows for secure and seamless peer-to-peer transactions on the internet.',
    img: learnBitcoinImg,
    bg: '#b2d8c8',
  },
  {
    tag: "BEGINNER'S GUIDE",
    title: 'Guide to DeFi tokens and altcoins',
    desc: 'From Aave to Zcash, decide what to trade with our beginner\'s guide',
    img: p1,
    bg: '#0a0b0d',
  },
];

const CRYPTO_BASICS_SMALL = [
  { tag: "BEGINNER'S GUIDE", title: 'What is Ethereum?',      img: p2, bg: '#1652f0' },
  { tag: 'KEY TERM',          title: 'What is DeFi?',          img: p3, bg: '#b5c7c4' },
  { tag: "BEGINNER'S GUIDE", title: 'What is a stablecoin?',  img: p4, bg: '#b5c7c4' },
  { tag: 'GLOSSARY',          title: "Don't let FUD give you FOMO or you'll end up REKT — crypto slang, explained", img: p5, bg: '#28a745' },
];

const GLOSSARY_TERMS = [
  'Bitcoin','Blockchain','Cardano','Crypto wallet','DeFi','Ethereum',
  'Fork','Inflation','Market cap','NFT','Private key','Protocol',
  'Smart contract','Token','Volatility memecoin',
];

const TIPS_ARTICLES = [
  { tag: 'GETTING STARTED', title: 'How to donate crypto',              img: imageAvif,  bg: '#b2d8c8', isVideo: false },
  { tag: 'VIDEO TUTORIAL',  title: 'How to set up a crypto wallet',     img: cbLolp,     bg: '#1652f0', isVideo: true  },
  { tag: 'VIDEO TUTORIAL',  title: 'When is the best time to invest in crypto?', img: investImg, bg: '#b2d8c8', isVideo: true },
  { tag: 'YOUR CRYPTO',     title: 'How to invest in crypto via your retirement account', img: p6, bg: '#0a0b0d', isVideo: false },
];

const ADVANCED_ARTICLES = [
  { tag: 'ADVANCED GUIDE', title: 'How to read advanced trading charts', img: advancedImg, bg: '#333' },
  { tag: 'KEY TERM',       title: 'What is an order book?',              img: p3,          bg: '#1652f0' },
];

const FUTURES_ARTICLES = [
  { title: 'Futures: Introductions and origins',           img: p1, bg: '#0a0b0d', tag: 'FUTURES GUIDE' },
  { title: 'Futures fundamentals: Understanding the basics', img: p2, bg: '#1652f0', tag: 'FUTURES GUIDE' },
  { title: 'Opening, holding, and closing a position in the futures market', img: p3, bg: '#1652f0', tag: 'FUTURES GUIDE' },
  { title: 'Trading strategies: Speculating, hedging, and spreading in the futures market', img: p4, bg: '#0a0b0d', tag: 'FUTURES GUIDE' },
];

const WALLET_ARTICLES = [
  {
    tag: '',
    title: "What's the difference between Coinbase and Coinbase Wallet?",
    desc: 'And how can a wallet help me access NFTs or DeFi? Your self-custody wallet questions, answered',
    img: replaceBank,
    bg: '#b2d8c8',
    isVideo: false,
  },
  {
    tag: 'VIDEO TUTORIAL',
    title: 'How to set up a crypto wallet',
    desc: 'Learn how to setup and get started with a crypto wallet.',
    img: cbLolp,
    bg: '#1652f0',
    isVideo: true,
  },
  {
    tag: 'GETTING STARTED',
    title: 'How to add crypto to your Coinbase Wallet',
    desc: 'A quick guide on how to add crypto to your Coinbase self-custody wallet.',
    img: p5,
    bg: '#8b6914',
    isVideo: false,
  },
  {
    tag: '',
    title: 'How to send or receive crypto using Coinbase Wallet',
    desc: 'Coinbase Wallet helps you unlock one of the most significant features of crypto: the ability to send or receive peer-to-peer transfers without any financial intermediaries.',
    img: p6,
    bg: '#1652f0',
    isVideo: false,
  },
];

// Sub-components (ArticleCard moved to src/components/common/ArticleCard)

function SeeMoreBtn({ label, sectionId }) {
  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-[#1652f0] hover:bg-[#1244c4] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors inline-flex items-center gap-2"
      >
        {label}
        <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round"><polyline points="6 4 10 8 6 12"/></svg>
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Learn() {
  const navigate = useNavigate();
  const basicsRef   = useRef(null);
  const tipsRef     = useRef(null);
  const advRef      = useRef(null);
  const futuresRef  = useRef(null);

  const sectionRefs = {
    'crypto-basics':    basicsRef,
    'tips-tutorials':   tipsRef,
    'advanced-trading': advRef,
    'futures':          futuresRef,
  };

  function scrollTo(id) {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="text-center py-16 px-4 border-b border-gray-100">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Crypto questions, answered</h1>
        <p className="text-base text-gray-500 max-w-xl mx-auto">
          Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between
        </p>
      </section>

      {/* ── Featured + Popular ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Featured */}
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-gray-900 mb-5">Featured</h2>
            <div className="cursor-pointer group">
              <div className="w-full h-64 rounded-2xl overflow-hidden relative bg-[#b2d8c8] mb-4">
                <img src={investImg} alt="Featured" className="w-full h-full object-cover" />
                <VideoPlayIcon />
              </div>
              <ArticleTag label="VIDEO TUTORIAL" />
              <h3 className="text-2xl font-bold text-gray-900 leading-snug group-hover:text-[#1652f0] transition-colors mb-2">
                When is the best time to invest in crypto?
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                When prices are fluctuating, how do you know when to buy? Learn more about using dollar-cost averaging to weather price volatility.
              </p>
            </div>
          </div>

          {/* Popular */}
          <div className="w-full lg:w-72 xl:w-80 shrink-0">
            <h2 className="text-sm font-bold text-gray-900 mb-5">Popular</h2>
            <div className="space-y-5">
              {POPULAR_ARTICLES.map((a, i) => (
                <div key={i} className="cursor-pointer group border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                  <ArticleTag label={a.tag} />
                  <p className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#1652f0] transition-colors">
                    {a.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Category nav strip ──────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORY_NAV.map(cat => (
              <button
                key={cat.id}
                onClick={() => scrollTo(cat.id)}
                className="flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors text-left group"
              >
                <span className="text-3xl shrink-0" role="img" aria-label={cat.label}>{cat.emoji}</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{cat.label}</p>
                  <p className="text-xs text-gray-500 group-hover:text-[#1652f0] transition-colors">
                    See more →
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Crypto basics ───────────────────────────────────────── */}
      <section ref={basicsRef} id="crypto-basics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Crypto basics</h2>
          <p className="text-base text-gray-500">New to crypto? Not for long — start with these guides and explainers</p>
        </div>

        {/* Two large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {CRYPTO_BASICS_LARGE.map((a, i) => (
            <ArticleCard key={i} article={a} large />
          ))}
        </div>

        {/* Four small cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {CRYPTO_BASICS_SMALL.map((a, i) => (
            <ArticleCard key={i} article={a} />
          ))}
        </div>

        <SeeMoreBtn label="See more crypto basics" sectionId="crypto-basics" />
      </section>

      {/* ── What is... glossary ─────────────────────────────────── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-10">What is…</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {GLOSSARY_TERMS.map(term => (
              <button
                key={term}
                onClick={() => navigate('/learn')}
                className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-[#1652f0] hover:text-[#1652f0] bg-white transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate('/learn')}
            className="bg-[#1652f0] hover:bg-[#1244c4] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
          >
            See more
          </button>
        </div>
      </section>

      {/* ── Tips and tutorials ──────────────────────────────────── */}
      <section ref={tipsRef} id="tips-tutorials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Tips and tutorials</h2>
          <p className="text-base text-gray-500">Get practical, step-by-step answers to all things crypto</p>
        </div>

        {/* Top row: 2 small horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
          {TIPS_ARTICLES.slice(0, 2).map((a, i) => (
            <ArticleCard key={i} article={a} horizontal />
          ))}
        </div>

        {/* Bottom row: 2 large */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TIPS_ARTICLES.slice(2).map((a, i) => (
            <ArticleCard key={i} article={a} large />
          ))}
        </div>

        <SeeMoreBtn label="See more tips and tutorials" sectionId="tips-tutorials" />
      </section>

      {/* ── Advanced trading ────────────────────────────────────── */}
      <section ref={advRef} id="advanced-trading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Advanced trading</h2>
          <p className="text-base text-gray-500">Tools, strategies, and terminology for experienced traders</p>
        </div>

        {/* Top: 2 small horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
          {ADVANCED_ARTICLES.map((a, i) => (
            <ArticleCard key={i} article={a} horizontal />
          ))}
        </div>

        {/* Bottom: 2 large */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { tag: 'ADVANCED GUIDE', title: 'How to read advanced trading charts',   img: advancedImg, bg: '#333', isVideo: false },
            { tag: 'KEY TERM',       title: 'What is an order book?',                img: p2,          bg: '#1652f0', isVideo: false },
          ].map((a, i) => (
            <ArticleCard key={i} article={a} large />
          ))}
        </div>

        <SeeMoreBtn label="See more advanced trading" sectionId="advanced-trading" />
      </section>

      {/* ── Futures ─────────────────────────────────────────────── */}
      <section ref={futuresRef} id="futures" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Futures</h2>
          <p className="text-base text-gray-500">New to futures trading? Get up to speed on the basics.</p>
        </div>

        {/* Top row 3-col */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {FUTURES_ARTICLES.slice(0, 3).map((a, i) => (
            <ArticleCard key={i} article={a} />
          ))}
        </div>

        {/* Bottom row 2-col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FUTURES_ARTICLES.slice(2).map((a, i) => (
            <ArticleCard key={i} article={a} large />
          ))}
        </div>

        <SeeMoreBtn label="See more about futures" sectionId="futures" />
      </section>

      {/* ── All Things Wallet ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">All Things Wallet</h2>
          <p className="text-base text-gray-500">Earn yield, dive into crypto apps, control your holdings, and much more</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WALLET_ARTICLES.map((a, i) => (
            <ArticleCard key={i} article={a} large />
          ))}
        </div>

        <SeeMoreBtn label="See more Wallet articles" sectionId="wallet" />
      </section>

      {/* ── Download the App ────────────────────────────────────── */}
      <section className="bg-gray-50 border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Download the App</h3>
            <div className="flex flex-col gap-3">
              {/* Google Play */}
              <a
                href="#"
                onClick={e => e.preventDefault()}
                className="flex items-center gap-3 bg-gray-900 hover:bg-gray-700 text-white rounded-xl px-4 py-3 transition-colors w-48"
                aria-label="Get it on Google Play"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white shrink-0" aria-hidden="true">
                  <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l15 8.5-15 8.5c-.5.33-1.5.33-1.5-.5z"/>
                </svg>
                <div>
                  <p className="text-[9px] uppercase tracking-wider opacity-70">Get it on</p>
                  <p className="text-sm font-semibold">Google Play</p>
                </div>
              </a>
              {/* App Store */}
              <a
                href="#"
                onClick={e => e.preventDefault()}
                className="flex items-center gap-3 bg-gray-900 hover:bg-gray-700 text-white rounded-xl px-4 py-3 transition-colors w-48"
                aria-label="Download on the App Store"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white shrink-0" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <p className="text-[9px] uppercase tracking-wider opacity-70">Download on the</p>
                  <p className="text-sm font-semibold">App Store</p>
                </div>
              </a>
            </div>
          </div>
          {/* Legal disclaimer */}
          <div className="max-w-2xl text-xs text-gray-400 leading-relaxed">
            Information provided on this Site is for general educational purposes only and is not intended to constitute investment or other advice on financial products. Such information is not, and should not be read as, an offer or recommendation to buy or sell or a solicitation of an offer or recommendation to buy or sell any particular digital asset or to use any particular investment strategy. Coinbase and its affiliates (collectively "Coinbase") makes no representations as to the accuracy, completeness, timeliness, suitability, or validity of any information on this Site and will not be liable for any errors, omissions, or damages arising from its display or use. Unless otherwise noted, all images are the property of Coinbase. Coinbase is not registered or licensed with the U.S. Securities and Exchange Commission or the U.S. Commodity Futures Trading Commission. Links provided to third-party sites are for informational purposes. Such sites are not under the control of Coinbase, and Coinbase is not responsible for the accuracy of the content on such third-party sites.
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
