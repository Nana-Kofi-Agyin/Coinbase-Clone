import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { useCurrency } from '../context/CurrencyContext';
import Footer from '../components/layout/Footer';
import { CRYPTO_ASSETS } from '../data/cryptoData';
import CoinBadge from '../components/common/CoinBadge';
import ChangeChip from '../components/common/ChangeChip';
import SectionRow from '../components/common/SectionRow';
import Tag from '../components/common/Tag';
import AccordionItem from '../components/common/AccordionItem';
import ChartSvg from '../components/crypto/ChartSvg';

// ─── Chart paths for each time period ────────────────────────────────────────
const CHART_PATHS = {
  '1H':  'M 0,130 L 60,120 L 120,125 L 180,115 L 240,118 L 300,112 L 360,108 L 420,115 L 480,110 L 540,105 L 600,108 L 660,112 L 720,108 L 780,112 L 800,110',
  '1D':  'M 0,112 L 30,118 L 60,115 L 90,122 L 120,118 L 150,125 L 180,130 L 210,138 L 240,145 L 270,155 L 300,165 L 330,175 L 360,185 L 390,172 L 410,160 L 435,145 L 460,130 L 490,112 L 515,95 L 540,80 L 568,65 L 590,80 L 615,95 L 640,108 L 660,115 L 680,120 L 700,118 L 720,122 L 740,128 L 760,130 L 800,133',
  '1W':  'M 0,155 L 100,140 L 150,130 L 200,115 L 250,125 L 300,110 L 350,100 L 400,92 L 450,105 L 500,98 L 550,110 L 600,115 L 650,120 L 700,125 L 750,120 L 800,128',
  '1M':  'M 0,180 L 80,165 L 160,145 L 200,130 L 240,120 L 280,112 L 320,105 L 360,95 L 400,100 L 440,110 L 480,115 L 520,120 L 560,112 L 600,118 L 640,122 L 720,128 L 800,132',
  '1Y':  'M 0,190 L 80,180 L 160,170 L 240,155 L 320,130 L 400,100 L 480,80 L 520,60 L 560,55 L 600,65 L 640,80 L 680,90 L 720,110 L 760,120 L 800,132',
  'ALL': 'M 0,195 L 100,190 L 200,185 L 300,178 L 400,160 L 500,130 L 560,100 L 600,75 L 640,55 L 680,65 L 720,80 L 760,100 L 800,132',
};

const CHART_LABELS = {
  '1H':  ['5:10 PM','5:20 PM','5:30 PM','5:40 PM','5:50 PM','6:00 PM','6:10 PM','6:20 PM'],
  '1D':  ['6:00 PM','9:20 PM','12:40 AM','3:55 AM','7:15 AM','10:32 AM','1:50 PM','5:10 PM'],
  '1W':  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
  '1M':  ['Feb 7','Feb 14','Feb 21','Feb 28','Mar 7'],
  '1Y':  ['Mar \'25','Jun \'25','Sep \'25','Dec \'25','Mar \'26'],
  'ALL': ['2020','2021','2022','2023','2024','2025','2026'],
};

const TABS = ['About','Info','Insights','FAQ','News','Social','Calculator','Bytes','Related','Legal'];

// ─── Per-asset detail data ────────────────────────────────────────────────────
const DETAIL = {
  bitcoin: {
    description: "The world's first cryptocurrency, Bitcoin is stored and exchanged securely on the Internet through a digital ledger known as a blockchain. Bitcoins are divisible into smaller units known as satoshis — each satoshi is worth 0.00000001 bitcoin.",
    whitepaper: true,
    marketStats: { marketCap:'GHS 14.45T', fdv:'GHS 15.17T', circSupply:'20M BTC', maxSupply:'21M BTC', totalSupply:'20M BTC', dilutedVal:'GHS 14.46T' },
    performance: { popularity:'#1', dominance:'60.15%', vol24h:'GHS 317.93B', vol24hChange:16.9, vol7d:'GHS 2.16T', vol30d:'GHS 8.24T', ath:'GHS 1.36M', priceChange1yLabel:'Not enough data', priceChange1y:-16.88 },
    trading: { buyerRatio:75, buyersCount:'35K', buyersChange:21.47, sellersCount:'14K', sellersChange:-11.28, tradersCount:'47K', tradersChange:-18.73, searched:'8.5K' },
    priceHistory: [
      { period:'Today',   price:'GHS 720,479.04', change:-1.31 },
      { period:'1 Day',   price:'GHS 731,271.40', change:-1.15 },
      { period:'1 Week',  price:'GHS 702,729.64', change:+1.61 },
      { period:'1 Month', price:'GHS 775,140.77', change:-5.15 },
      { period:'1 Year',  price:'GHS 1,252,623.06', change:-16.88 },
    ],
    networks: [
      { name:'Arbitrum', address:'0xcbB7C0000aB88B473b1f5aFd9e...' },
      { name:'Solana',   address:'cbbtcf3aa214zXHbiAZQwf4122FBY' },
      { name:'Ethereum', address:'0xcbB7C0000aB88B473b1f5aFd9e...' },
      { name:'Base',     address:'0xcbB7C0000aB88B473b1f5aFd9e...' },
    ],
    marketDetails: { vsMarkets:'+1.85%', vsEth:'+13.7%' },
    tags: ['mineable','pow','sha-256','store-of-value','+6'],
    social: { popularityInPosts:'#1', contributors:83381, posts:440435, percentAbout:35.159, articles:1382, twitterBullish:50.92, sentiment:4.1 },
    faq: [
      { q:'What is Bitcoin?', a:"Bitcoin (BTC) is a decentralized digital asset introduced in 2008 through a whitepaper by an anonymous creator or group known as Satoshi Nakamoto and officially launched in January 2009. Bitcoin is designed as a peer-to-peer payment system, enabling people to send, receive, and store value without traditional banks or central authorities.\n\nAll transactions are recorded on a public blockchain, a secure, transparent, and decentralized ledger maintained by thousands of independent computers worldwide. The total supply is capped at 21 million BTC, which cannot be increased, making Bitcoin scarce. Each Bitcoin can be divided into 100 million satoshis (0.00000001 BTC), allowing both microtransactions and large transfers.\n\nBitcoin trades globally against the U.S. dollar in the BTC/USD market. The Bitcoin price today changes in real time depending on global demand and supply across cryptocurrency exchanges." },
      { q:'How does Bitcoin work?', a:"Bitcoin operates through a decentralized peer-to-peer network in which participants can transfer BTC directly to each other without relying on intermediaries. The history of all transactions is stored on the Bitcoin blockchain, a public ledger secured and updated by a distributed network of computers called nodes.\n\nThe process of adding new transactions to the blockchain is called mining. Miners use specialized hardware to solve mathematical problems that confirm transaction validity. When a block of transactions is successfully verified, the miner receives a block reward in newly issued BTC along with transaction fees. This process also controls the rate at which new Bitcoin enters circulation.\n\nThe BTC/USD price changes continuously in response to market activity. Individuals can buy, sell, and store Bitcoin using wallets that are secured by cryptographic keys, giving them control over their holdings." },
      { q:'What are the potential use cases for Bitcoin?' },
      { q:'What is the history of Bitcoin?' },
      { q:'How can I buy Bitcoin?' },
      { q:'What is Bitcoin mining?' },
      { q:'Who are the founders of Bitcoin?' },
      { q:'Why is the Bitcoin price so volatile?' },
      { q:'How much will I get if I put $1 in Bitcoin?' },
      { q:'What was the price of 1 Bitcoin in 2009?' },
      { q:'Who owns the most Bitcoin?' },
      { q:'How much Bitcoin is in circulation?' },
    ],
    news: [
      { source:'CoinDesk', date:'Mar 8, 2026 04:00PM', headline:'Bitcoin is still a great way to diversify portfolio even if it trades like a tech stock, analyst says', blurb:'The central debate has shifted from whether bitcoin can survive to if it can function as a sovereign reserve asset, as critics assess it by institutional standards.' },
      { source:'CoinDesk', date:'Mar 8, 2026 01:41PM', headline:"Oil leaving Middle East trades over $100 a barrel. Here's how it could affect bitcoin", blurb:'Murban crude, a key benchmark for barrels that can bypass the Strait of Hormuz, now trades at $103 per barrel.' },
      { source:'DL News',  date:'Mar 8, 2026 09:11AM', headline:'Bitcoin recovers from $66,000 shock as experts predict volatility — and silver linings', blurb:'Bitcoin prices are climbing back towards $70,000 after a gradual March 7 slide resulted in a dramatic but short-lived drop to $66,000.' },
      { source:'CoinDesk', date:'Mar 7, 2026 06:15AM', headline:'Bitcoin slips below $68,000 as dollar posts steepest weekly gain in a year', blurb:"Most majors gave back Friday's gains, with solana down 4%, ether falling 4.4%, and 43% of bitcoin's supply now sitting at a loss according to Glassnode data." },
    ],
    insights: {
      happeningNow:'BTC dropped ↘1% since Sunday afternoon, outperforming ETH and SOL during market correction.',
      recentTrends:'The latest BTC price is GHS 722,198.60. Compared to Bitcoin\'s value of GHS 731,271.40 from 24 hours ago, there\'s been a -1% decrease, while the current price is 2% up from GHS 702,729.64 which was recorded one week ago. Bitcoin\'s all time high is GHS 1,359,826.12, which was reached on October 6, 2025. This is a -47% change from its price today.\n\nThe current circulating supply of Bitcoin is 19,999,600. This is 95% of its max supply of 21,000,000 BTC and 100% of its total supply of 19,000,600. The market cap is currently GHS 14.45T.',
      bullsSay:'Bitcoin, as the original blockchain and cryptocurrency, has achieved an unparalleled level of recognition and trust.',
      bearsSay:'While Bitcoin pioneered blockchain technology, it now faces challenges from newer digital currencies prioritizing faster and cheaper transactions.',
    },
    bytes: {
      date:'Jul 16, 2025',
      title:'Market Bytes: Bitcoin hit a new all-time high above $123,000',
      body:['Driving the surge was a combination of factors, including optimism over Congress tackling a suite of crypto rules this week; a wave of institutional investment via crypto exchange-traded funds (ETFs), and analysts\' belief that the Federal Reserve will resume cutting interest rates this year.','By Tuesday, BTC settled to around $117,000 as some traders sold to lock in profits and U.S. inflation figures began to rise (although by less than many market watchers expected). Prices ticked back upward towards $120,000 on Wednesday. Speaking to Bloomberg, one analyst described the dip as a "standard pullback" that often follows a rapid increase in prices.'],
    },
    calculator: [
      { label:'1 Bitcoin (BTC) to United States Dollar (USD)',      value:'$66,870.38' },
      { label:'1 Bitcoin (BTC) to Canadian Dollar (CAD)',           value:'CA$90,887.00' },
      { label:'1 Bitcoin (BTC) to British Pound (GBP)',             value:'£49,907.97' },
      { label:'1 Bitcoin (BTC) to Japanese Yen (JPY)',              value:'¥35,600,000.00' },
      { label:'1 Bitcoin (BTC) to Indian Rupee (INR)',              value:'₹6,145,766.10' },
      { label:'1 Bitcoin (BTC) to Real (BRL)',                      value:'R$350,858.38' },
      { label:'1 Bitcoin (BTC) to Euro (EUR)',                      value:'€57,701.23' },
      { label:'1 Bitcoin (BTC) to Nigerian Naira (NGN)',            value:'NGN 92,721,307.06' },
      { label:'1 Bitcoin (BTC) to South Korean Won (KRW)',          value:'₩99,212,445.73' },
      { label:'1 Bitcoin (BTC) to Singapore Dollar (SGD)',          value:'S$85,397.43' },
    ],
    relatedCryptos: ['tokenbot','Bitcoin Cash','Cosmos','Dogecoin','Internet Computer','Monad','Subsquid','SUI','USDC','World Liberty Financial','XRP','Zcash'],
    howToBuy: ['How to buy Bitcoin USD','How to buy Gold coin','How to buy HASH','How to buy Hyperliquid','How to buy real token','How to buy Stable Coin','How to buy Dogecoin','How to buy Ethereum','How to buy J.P. Morgan Deposit Token','How to buy USRX','How to buy WAR','How to buy Worldcoin'],
    popularConversions: ['TRON - try','XRP - eur','IRR - usd','Tether - ldr','Tether - myr','Green Satoshi Token - bdt','Gram Silver - usd','handleFOREX - iqd','Stellar Lumens - kes','STEPN - bdt','usd - Solana','Litecoin - usd'],
    popularPredictions: ['BNB','Cronos','Flare','Kaspa','OFFICIAL TRUMP','PepeNode','predict','American Bitcoin','Tether','TRON','World Liberty Financial','Zcash'],
    similarMarketCap: ['Ethereum','Tether','BNB','XRP','USDC','Solana','TRON','Dogecoin','Cardano','Bitcoin Cash','UNUS SED LEO','Hyperliquid'],
    discoverMore: ['Aurra by Virtuals','BMIC','Canton CC','Dingocoin','DSNT','Duh','Opinion Finance','Simpson Pepe','BESC LLC','Stellar (XLM) NFT Art','Usual','Weedcoin'],
  },
};

// ─── Helper: default detail for non-Bitcoin assets ────────────────────────────
function getDetail(asset) {
  const d = DETAIL[asset.id];
  if (d) return d;
  return {
    description: `${asset.name} (${asset.ticker}) is a digital asset traded on Coinbase. It is one of the top cryptocurrencies by market capitalization.`,
    whitepaper: false,
    marketStats: { marketCap: asset.marketCap, fdv: asset.marketCap, circSupply: '—', maxSupply: '—', totalSupply: '—', dilutedVal: asset.marketCap },
    performance:  { popularity: '—', dominance: '—', vol24h: asset.volume, vol24hChange: 0, vol7d: '—', vol30d: '—', ath: '—', priceChange1yLabel: '—', priceChange1y: 0 },
    trading: { buyerRatio: 60, buyersCount: '—', buyersChange: 0, sellersCount: '—', sellersChange: 0, tradersCount: '—', tradersChange: 0, searched: '—' },
    priceHistory: [],
    networks: [],
    marketDetails: { vsMarkets: '—', vsEth: '—' },
    tags: [],
    social: { popularityInPosts: '—', contributors: 0, posts: 0, percentAbout: 0, articles: 0, twitterBullish: 0, sentiment: 0 },
    faq: [],
    news: [],
    insights: { happeningNow: `${asset.ticker} market activity is being monitored.`, recentTrends: `The current price of ${asset.name} is ${asset.price.toLocaleString()}.`, bullsSay: '—', bearsSay: '—' },
    bytes: null,
    calculator: [],
    relatedCryptos: [],
    howToBuy: [],
    popularConversions: [],
    popularPredictions: [],
    similarMarketCap: [],
    discoverMore: [],
  };
}


// Small reusable components have been moved to src/components/common and src/components/crypto

// ─── Main component ───────────────────────────────────────────────────────────
export default function AssetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatPrice, currencyLabel } = useCurrency();

  const asset = CRYPTO_ASSETS.find(a => a.id === id) || CRYPTO_ASSETS[0];
  const detail = getDetail(asset);

  const [period, setPeriod]         = useState('1D');
  const [activeTab, setActiveTab]   = useState('About');
  const [openFaq, setOpenFaq]       = useState(new Set([0, 1]));
  const [tabScrollStart, setTabScrollStart] = useState(0);

  function toggleFaq(i) {
    setOpenFaq(prev => {
      const s = new Set(prev);
      s.has(i) ? s.delete(i) : s.add(i);
      return s;
    });
  }

  const chartColor = asset.change >= 0 ? '#05b169' : '#f0a500';
  const labels = CHART_LABELS[period] || CHART_LABELS['1D'];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* ── Sticky asset sub-header ──────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-3 overflow-x-auto scrollbar-hide">
            {/* Coin identity */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ backgroundColor: asset.color }}
            >
              {asset.ticker[0]}
            </div>
            <h1 className="text-base font-bold text-gray-900 whitespace-nowrap shrink-0">
              {asset.name} Price&nbsp;
              <span className="text-gray-500 font-normal">({asset.ticker})</span>
              &nbsp;
              <span className="text-gray-900">{formatPrice(asset.price)}</span>
            </h1>
            {/* Star */}
            <button className="text-gray-400 hover:text-yellow-400 transition-colors shrink-0" aria-label="Add to watchlist">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </button>
            {/* Share */}
            <button className="text-gray-400 hover:text-gray-600 transition-colors shrink-0" aria-label="Share">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            </button>
            {/* Currency */}
            <button className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 shrink-0">
              {currencyLabel}
              <svg viewBox="0 0 16 16" className="w-3 h-3 fill-none stroke-current" strokeWidth="2"><polyline points="4 6 8 10 12 6"/></svg>
            </button>
            {/* Divider */}
            <div className="h-5 w-px bg-gray-200 shrink-0 mx-1" />
            {/* Scrollable tabs */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide min-w-0">
              {TABS.slice(tabScrollStart, tabScrollStart + 8).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {tabScrollStart + 8 < TABS.length && (
              <button
                onClick={() => setTabScrollStart(s => Math.min(s + 2, TABS.length - 8))}
                className="shrink-0 text-gray-400 hover:text-gray-600"
                aria-label="More tabs"
              >
                <svg viewBox="0 0 16 16" className="w-4 h-4 fill-none stroke-current" strokeWidth="2"><polyline points="6 4 10 8 6 12"/></svg>
              </button>
            )}
            {/* Search */}
            <button className="shrink-0 text-gray-400 hover:text-gray-600 ml-auto" aria-label="Search">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Two-column layout: sidebar + main ────────────────── */}
        <div className="flex flex-col lg:flex-row gap-0 border-b border-gray-200">

          {/* Left sidebar */}
          <aside className="w-full lg:w-72 xl:w-80 shrink-0 lg:border-r border-gray-200 py-8 pr-0 lg:pr-8">

            {/* About */}
            <h2 className="text-lg font-bold text-gray-900 mb-3">About {asset.name}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">{detail.description}</p>

            {/* Whitepaper / Official website */}
            <div className="flex gap-2 mb-6">
              {detail.whitepaper && (
                <button className="flex items-center gap-1.5 border border-gray-300 rounded-full px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="1.5"><rect x="3" y="1" width="10" height="14" rx="1"/><line x1="6" y1="5" x2="10" y2="5"/><line x1="6" y1="8" x2="10" y2="8"/><line x1="6" y1="11" x2="8" y2="11"/></svg>
                  Whitepaper
                </button>
              )}
              <button className="flex items-center gap-1.5 border border-gray-300 rounded-full px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 2a9 9 0 010 12M2 8h12"/><path d="M4 4.5C5 7 7 8 8 8s3-1 4-3.5M4 11.5C5 9 7 8 8 8s3 1 4 3.5"/></svg>
                Official website
              </button>
            </div>

            {/* Buy button */}
            <button
              onClick={() => navigate('/signup')}
              className="w-full flex items-center justify-between bg-[#1652f0] hover:bg-[#1244c4] text-white font-semibold px-5 py-3.5 rounded-xl transition-colors mb-6"
            >
              Buy {asset.name}
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>

            {/* Happening now */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#1652f0]" />
                <span className="text-xs font-semibold text-gray-900">Happening now</span>
                <span className="text-xs text-gray-400 ml-auto">AI generated 1h ago</span>
                <button className="text-gray-400 hover:text-gray-600" aria-label="Info">
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 7.5v3.5M8 5.5v.5" strokeLinecap="round"/></svg>
                </button>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">{detail.insights.happeningNow}</p>
              <button className="w-full bg-white border border-gray-200 rounded-lg py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                See more
              </button>
            </div>

            {/* Keep exploring */}
            <div className="bg-[#f5d000] rounded-xl p-4">
              <p className="text-sm font-bold text-gray-900 mb-1">Keep exploring</p>
              <p className="text-xs text-gray-700 mb-3">View assets on the same network and more with search</p>
              <Link
                to="/explore"
                className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-gray-700 text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors"
              >
                Explore
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="8" x2="13" y2="8"/><polyline points="9 4 13 8 9 12"/></svg>
              </Link>
            </div>
          </aside>

          {/* Main price + chart + stats */}
          <div className="flex-1 min-w-0 py-8 lg:pl-8">
            {/* Price row */}
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-4xl font-bold text-gray-900">{formatPrice(asset.price)}</span>
              <span className={`text-base font-semibold ${asset.change >= 0 ? 'text-[#05b169]' : 'text-[#f34141]'}`}>
                {asset.change >= 0 ? '↑' : '↓'} {formatPrice(Math.abs(asset.change * asset.price / 100))} ({Math.abs(asset.change).toFixed(2)}%)
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-6">1D • as of now</p>

            {/* Period tabs */}
            <div className="flex justify-end gap-1 mb-4">
              {['1H','1D','1W','1M','1Y','ALL'].map(p => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    period === p ? 'bg-gray-100 text-[#1652f0]' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Chart */}
            <div className="h-48 w-full mb-2">
              <ChartSvg period={period} color={chartColor} />
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between mb-8">
              {labels.map(l => (
                <span key={l} className="text-[10px] text-gray-400">{l}</span>
              ))}
            </div>

            {/* Three stat columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-100 pt-6">
              {/* Trading Insights */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Trading Insights</h3>
                <div className="flex items-start gap-4 mb-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Buyer Ratio</p>
                    {/* Donut */}
                    <div className="relative w-14 h-14">
                      <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="4"/>
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#1652f0" strokeWidth="4"
                          strokeDasharray={`${detail.trading.buyerRatio * 0.88} 88`}
                          strokeLinecap="round"/>
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-800">
                        {detail.trading.buyerRatio}%
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3 mt-1">
                    {[
                      { label:'BUYERS',  v: detail.trading.buyersCount,  c: detail.trading.buyersChange },
                      { label:'SELLERS', v: detail.trading.sellersCount, c: detail.trading.sellersChange },
                      { label:'TRADERS', v: detail.trading.tradersCount, c: detail.trading.tradersChange },
                    ].map(row => (
                      <div key={row.label}>
                        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">{row.label}</p>
                        <p className="text-xs font-semibold text-gray-800">{row.v} <ChangeChip value={row.c} /></p>
                      </div>
                    ))}
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">SEARCHED</p>
                      <p className="text-xs font-semibold text-gray-800">{detail.trading.searched}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Stats */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Market Stats</h3>
                <div className="space-y-2">
                  {[
                    { label:'MARKET CAP',        v: detail.marketStats.marketCap,   c: asset.change },
                    { label:'FDV',               v: detail.marketStats.fdv },
                    { label:'CIRC. SUPPLY',      v: detail.marketStats.circSupply },
                    { label:'MAX SUPPLY',        v: detail.marketStats.maxSupply },
                    { label:'TOTAL SUPPLY',      v: detail.marketStats.totalSupply },
                    { label:'DILUTED VALUATION', v: detail.marketStats.dilutedVal },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between items-start">
                      <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">{row.label}</span>
                      <div className="text-right">
                        <span className="text-xs font-medium text-gray-800">{row.v}</span>
                        {row.c != null && <div><ChangeChip value={row.c} /></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Performance</h3>
                <div className="space-y-2">
                  {[
                    { label:'POPULARITY',      v: detail.performance.popularity },
                    { label:'DOMINANCE',       v: detail.performance.dominance },
                    { label:'VOLUME (24H)',    v: detail.performance.vol24h, c: detail.performance.vol24hChange },
                    { label:'VOLUME (7D)',     v: detail.performance.vol7d },
                    { label:'VOLUME (30D)',    v: detail.performance.vol30d },
                    { label:'ALL TIME HIGH',  v: detail.performance.ath },
                    { label:'PRICE CHANGE (1Y)', v: detail.performance.priceChange1yLabel, c: detail.performance.priceChange1y },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between items-start">
                      <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">{row.label}</span>
                      <div className="text-right">
                        <span className="text-xs font-medium text-gray-800">{row.v}</span>
                        {row.c != null && row.c !== 0 && <div><ChangeChip value={row.c} /></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Additional details ─────────────────────────────────── */}
        <SectionRow label="Additional details">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Market details */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-3">Market details</h4>
              <div className="space-y-2 mb-4">
                {[
                  { label: 'BTC VS MARKETS', v: detail.marketDetails.vsMarkets },
                  { label: 'BTC VS ETH',     v: detail.marketDetails.vsEth },
                ].map(r => (
                  <div key={r.label}>
                    <p className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">{r.label}</p>
                    <p className="text-sm font-medium text-gray-800">{r.v}</p>
                  </div>
                ))}
              </div>
              {detail.tags.length > 0 && (
                <>
                  <p className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold mb-2">TAGS</p>
                  <div>{detail.tags.map(t => <Tag key={t} label={t} />)}</div>
                </>
              )}
            </div>

            {/* Network & Addresses */}
            {detail.networks.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3">Network &amp; Addresses</h4>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold mb-2">NetworkAddress</p>
                <div className="space-y-2">
                  {detail.networks.map(n => (
                    <div key={n.name} className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-[#1652f0] shrink-0 w-20">{n.name}</span>
                      <span className="text-xs text-gray-600 truncate">{n.address}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-3 border border-gray-300 rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">See all</button>
              </div>
            )}

            {/* Price history */}
            {detail.priceHistory.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3">Price history</h4>
                <div className="grid grid-cols-3 text-[9px] uppercase tracking-widest text-gray-400 font-semibold mb-2 gap-2">
                  <span>Time</span><span className="text-right">Price</span><span className="text-right">Change</span>
                </div>
                <div className="space-y-2">
                  {detail.priceHistory.map(r => (
                    <div key={r.period} className="grid grid-cols-3 gap-2 items-center">
                      <span className="text-xs text-gray-700">{r.period}</span>
                      <span className="text-xs text-gray-700 text-right">{r.price}</span>
                      <span className={`text-xs font-medium text-right ${r.change >= 0 ? 'text-[#05b169]' : 'text-[#f34141]'}`}>
                        {r.change >= 0 ? '↑' : '↓'} {Math.abs(r.change).toFixed(2)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionRow>

        {/* ── Coinbase insights ──────────────────────────────────── */}
        <SectionRow label="Coinbase insights">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Happening now */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-bold text-gray-900">Happening now</span>
                <span className="w-2 h-2 rounded-full bg-[#1652f0]" />
                <span className="text-xs text-gray-400">AI generated 1h ago</span>
              </div>
              <p className="text-sm text-gray-700 mb-4">{detail.insights.happeningNow}</p>
              <p className="text-sm font-bold text-gray-900 mb-2">Market Position</p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 mb-4">
                <li>Represents {detail.performance.dominance} of total cryptocurrency market cap</li>
                <li>Weekly volume fell ↘28% with sell ratios reaching roughly 50%</li>
                <li>Down ↘17% year-to-date while maintaining elevated trading activity</li>
              </ul>
              <p className="text-sm font-bold text-gray-900 mb-2">Latest Stories</p>
              {detail.news.slice(0, 2).map((n, i) => (
                <div key={i} className="text-sm text-gray-600 mb-1">• {n.headline.slice(0, 60)}... <span className="text-[#1652f0] cursor-pointer hover:underline">Source↗</span></div>
              ))}
              <button className="mt-3 border border-gray-300 rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">See all</button>
            </div>
            {/* Recent trends */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-3">Recent trends</h4>
              {detail.insights.recentTrends.split('\n\n').map((p, i) => (
                <p key={i} className="text-sm text-[#1652f0] leading-relaxed mb-3">{p}</p>
              ))}
              <button className="mt-2 border border-gray-300 rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">See all</button>
            </div>
          </div>
        </SectionRow>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        {detail.faq.length > 0 && (
          <SectionRow label="FAQ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              {detail.faq.map((item, i) => (
                <AccordionItem
                  key={i}
                  q={item.q}
                  a={item.a}
                  open={openFaq.has(i)}
                  onToggle={() => toggleFaq(i)}
                />
              ))}
            </div>
            <button className="mt-4 border border-gray-300 rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">See all</button>
          </SectionRow>
        )}

        {/* ── News ───────────────────────────────────────────────── */}
        {detail.news.length > 0 && (
          <SectionRow label={`${asset.name} news`}>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-4">Trending articles</h4>
              <div className="space-y-5">
                {detail.news.map((n, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 pb-5 border-b border-gray-100 last:border-0 last:pb-0 cursor-pointer group">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-gray-700">{n.source}</span>
                        <span className="text-xs text-gray-400">{n.date}</span>
                      </div>
                      <p className="text-sm text-[#1652f0] group-hover:underline leading-snug mb-1">{n.headline}</p>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{n.blurb}</p>
                    </div>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 text-gray-400 mt-1 fill-none stroke-current" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                ))}
              </div>
              <button className="mt-4 border border-gray-300 rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">See all</button>
            </div>
          </SectionRow>
        )}

        {/* ── Social stats ───────────────────────────────────────── */}
        <SectionRow label="Social stats">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Stats table */}
            <div>
              <div className="space-y-2 mb-6">
                {[
                  { label:'POPULARITY IN POSTS', v: detail.social.popularityInPosts },
                  { label:'CONTRIBUTORS',        v: detail.social.contributors.toLocaleString() },
                  { label:'POSTS',               v: detail.social.posts.toLocaleString() },
                  { label:`% ABOUT ${asset.ticker}`,v: `${detail.social.percentAbout}%` },
                  { label:'ARTICLES',            v: detail.social.articles.toLocaleString() },
                  { label:'X (TWITTER)',         v: `${detail.social.twitterBullish}% bullish` },
                  { label:'SENTIMENT',           v: `${detail.social.sentiment} ★` },
                ].map(r => (
                  <div key={r.label} className="flex items-center justify-between py-1 border-b border-gray-50">
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">{r.label}</span>
                    <span className="text-sm font-medium text-gray-800">{r.v}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">Highlights</p>
            </div>
            {/* Analysis + Guides */}
            <div>
              <div className="mb-6">
                <p className="text-sm font-bold text-gray-900 mb-3">Analysis</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-[#05b169] mb-1">Bulls say</p>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">{detail.insights.bullsSay}</p>
                    <button className="text-xs font-semibold text-gray-800 hover:text-[#1652f0] transition-colors">Read more</button>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#f34141] mb-1">Bears say</p>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">{detail.insights.bearsSay}</p>
                    <button className="text-xs font-semibold text-gray-800 hover:text-[#1652f0] transition-colors">Read more</button>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 mb-3">Guides</p>
                <div className="grid grid-cols-2 gap-4">
                  {['How to Buy Bitcoin','How to Stake Bitcoin'].map(g => (
                    <div key={g} className="flex items-center gap-3 cursor-pointer group">
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 font-semibold mb-0.5">Coinbase</p>
                        <p className="text-xs font-bold text-gray-900 mb-1">{g}</p>
                        <p className="text-xs text-gray-500 line-clamp-2">Good news! You can {g.toLowerCase()} on Coinbase's centralized exchange...</p>
                        <button className="text-xs font-semibold text-gray-800 group-hover:text-[#1652f0] transition-colors mt-1">Read more</button>
                      </div>
                      <div className="w-12 h-12 rounded-full shrink-0" style={{ backgroundColor: asset.color }}>
                        <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold">{asset.ticker[0]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionRow>

        {/* ── Calculator ─────────────────────────────────────────── */}
        {detail.calculator.length > 0 && (
          <SectionRow label={`${asset.name} calculator`}>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 mb-4">
                {detail.calculator.map(r => (
                  <div key={r.label} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-xs text-gray-600">{r.label}</span>
                    <span className="text-xs font-semibold text-gray-900">{r.value}</span>
                  </div>
                ))}
              </div>
              <button className="border border-gray-300 rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">Try calculator</button>
            </div>
          </SectionRow>
        )}

        {/* ── Coinbase Bytes ─────────────────────────────────────── */}
        {detail.bytes && (
          <SectionRow label="Coinbase Bytes">
            <div className="flex gap-6">
              {/* Thumbnail */}
              <div className="w-48 h-32 shrink-0 bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center">
                <div className="grid grid-cols-3 gap-1 p-3">
                  {['B','T','C','A','T','H'].map(l => (
                    <div key={l} className="w-8 h-8 bg-[#4da3e8] opacity-80 rounded flex items-center justify-center text-white text-xs font-bold">{l}</div>
                  ))}
                </div>
              </div>
              {/* Text */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-[#1652f0] flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">Coinbase Bytes</span>
                  <span className="text-xs text-gray-400">{detail.bytes.date}</span>
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-3">{detail.bytes.title}</h4>
                {detail.bytes.body.map((p, i) => (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed mb-2 flex gap-2">
                    <span className="text-[#1652f0] shrink-0">→</span>
                    {p}
                  </p>
                ))}
                <button className="mt-3 border border-gray-300 rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">Full story</button>
              </div>
            </div>
          </SectionRow>
        )}

        {/* ── Related assets ─────────────────────────────────────── */}
        {detail.relatedCryptos.length > 0 && (
          <SectionRow label="Related assets">
            <div className="space-y-6">
              {[
                { title: 'Popular cryptocurrencies', items: detail.relatedCryptos },
                { title: 'Learn how to buy popular cryptocurrencies', items: detail.howToBuy },
                { title: 'Most popular conversions', items: detail.popularConversions },
                { title: 'Popular price predictions', items: detail.popularPredictions },
                { title: 'Cryptocurrencies with similar market cap', items: detail.similarMarketCap },
                { title: 'Discover more assets', items: detail.discoverMore },
              ].filter(g => g.items.length).map(group => (
                <div key={group.title} className="border-t border-gray-100 pt-5 first:border-t-0 first:pt-0">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">{group.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(item => {
                      const related = CRYPTO_ASSETS.find(a => a.name === item || a.ticker === item);
                      return (
                        <button
                          key={item}
                          onClick={() => related && navigate(`/assets/${related.id}`)}
                          className="flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-700 hover:border-[#1652f0] hover:text-[#1652f0] transition-colors"
                        >
                          {related && (
                            <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold" style={{ backgroundColor: related.color }}>
                              {related.ticker[0]}
                            </span>
                          )}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </SectionRow>
        )}

        {/* ── Legal ──────────────────────────────────────────────── */}
        <SectionRow label="Legal">
          <div className="space-y-4">
            <p className="text-xs text-gray-500 leading-relaxed">
              Information is provided for informational purposes only and is not investment advice. This is not a recommendation to buy or sell a particular digital asset or to employ a particular investment strategy. Coinbase makes no representation on the accuracy, suitability, or validity of any information provided or for a particular asset.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Certain content has been prepared by third parties not affiliated with Coinbase Inc. or any of its affiliates and Coinbase is not responsible for such content. Coinbase is not liable for any errors or delays in content, or for any actions taken in reliance on any content. Information is provided for informational purposes only and is not investment advice. Prices shown are for illustrative purposes only. Actual cryptocurrency prices and associated stats may vary. Data presented may reflect assets traded on Coinbase's exchange and select other cryptocurrency exchanges.
            </p>
          </div>
        </SectionRow>
      </div>

      <Footer />
    </div>
  );
}
