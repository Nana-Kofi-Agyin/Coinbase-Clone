import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { useCurrency } from '../context/CurrencyContext';
import Footer from '../components/layout/Footer';
import heroImg from '../assets/Hero__4_.avif';
import advancedImg from '../assets/Advanced.avif';
import zeroFeesImg from '../assets/zero_fees_us.avif';
import baseAppImg from '../assets/Replace_Bank.avif';
import learnBitcoinImg from '../assets/Learn_Illustration_Ultimate_Guide_Bitcoin.avif';
import learnImg2 from '../assets/image.avif';
import learnImg3 from '../assets/0_4mVyVaU6yLa--GR_.avif';
import { CRYPTO_ASSETS } from '../data/cryptoData';


const LEARN_ARTICLES = [
  {
    img: learnBitcoinImg,
    title: 'USDC: The digital dollar for the global crypto economy',
    desc: 'Coinbase believes crypto will be part of the solution for creating an open financial system that is both more efficient and more...',
  },
  {
    img: learnImg2,
    title: 'Can crypto really replace your bank account?',
    desc: "If you're a big enough fan of crypto, you've probably heard the phrase \"be your own bank\" or the term \"bankless\" — the idea being that...",
  },
  {
    img: learnImg3,
    title: 'When is the best time to invest in crypto?',
    desc: 'Cryptocurrencies like Bitcoin can experience daily (or even hourly) price volatility. As with any kind of investment, you may...',
    underline: true,
  },
];

const COIN_FLOATS = [
  { bg: '#1652f0', symbol: 'C',  size: 96, x: 160, y: 90  },
  { bg: '#0d0d0d', symbol: 'Ⓐ', size: 68, x: 310, y: 10  },
  { bg: '#f7cc02', symbol: '→',  size: 68, x: 420, y: 120 },
  { bg: '#f7931a', symbol: '₿',  size: 84, x: 340, y: 200 },
  { bg: '#c2a633', symbol: 'Ð',  size: 68, x: 70,  y: 220 },
  { bg: '#003087', symbol: '✦',  size: 68, x: 470, y: 250 },
  { bg: '#6279ea', symbol: 'Ξ',  size: 58, x: 235, y: 268 },
];

export default function Home() {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const [heroEmail, setHeroEmail]   = useState('');
  const [ctaEmail,  setCtaEmail]    = useState('');
  const [activeTab, setActiveTab]   = useState('tradable');

  const tabCoins = {
    tradable:      CRYPTO_ASSETS.filter(a => a.tradeable).slice(0, 6),
    topgainers:    [...CRYPTO_ASSETS].sort((a, b) => b.change - a.change).slice(0, 6),
    newOnCoinbase: CRYPTO_ASSETS.slice(-4),
  };

  function handleSignup() { navigate('/signup'); }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Phone mockup */}
        <div className="flex-1 flex justify-center order-2 lg:order-1">
          <img
            src={heroImg}
            alt="Coinbase portfolio app"
            className="w-full max-w-sm lg:max-w-lg rounded-3xl"
          />
        </div>
        {/* Text + sign-up */}
        <div className="flex-1 max-w-lg order-1 lg:order-2">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-5">
            The future of finance is here.
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Trade crypto and more on a platform you can trust.
          </p>
          <div className="flex gap-3">
            <input
              type="email"
              value={heroEmail}
              onChange={e => setHeroEmail(e.target.value)}
              placeholder="satoshi@nakamoto.com"
              className="flex-1 min-w-0 border border-gray-300 rounded-full px-5 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSignup}
              className="bg-[#1652f0] hover:bg-[#1244c4] text-white font-semibold px-6 py-3 rounded-full transition-colors whitespace-nowrap"
            >
              Sign up
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Stocks and prediction markets not available in your jurisdiction.
          </p>
        </div>
      </section>

      {/* ── Explore crypto ──────────────────────────────────────── */}
      <section className="bg-[#f5f5f5] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left text */}
          <div className="flex-1 max-w-lg">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Explore crypto like Bitcoin, Ethereum, and Dogecoin.
            </h2>
            <p className="text-base text-gray-500 mb-8">
              Simply and securely{' '}
              <Link to="/signup" className="text-[#1652f0] hover:underline font-normal">buy</Link>,{' '}
              <Link to="/signup" className="text-[#1652f0] hover:underline font-normal">sell</Link>, and{' '}
              <Link to="/explore" className="text-[#1652f0] hover:underline font-normal">manage</Link>{' '}
              hundreds of cryptocurrencies.
            </p>
            <Link
              to="/explore"
              className="inline-block bg-gray-900 hover:bg-gray-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              See more assets
            </Link>
          </div>
          {/* Right: dark price card */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="bg-[#0a0b0d] rounded-2xl w-full max-w-sm p-5 shadow-xl">
              {/* Tabs */}
              <div className="flex gap-1 mb-5">
                {[
                  ['tradable',      'Tradable'],
                  ['topgainers',    'Top gainers'],
                  ['newOnCoinbase', 'New on Coinbase'],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeTab === key
                        ? 'bg-[#2c2d30] text-white'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {/* Coin rows */}
              <div className="space-y-4">
                {tabCoins[activeTab].map(coin => (
                  <div key={coin.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                        style={{ backgroundColor: coin.color }}
                      >
                        {coin.ticker[0]}
                      </div>
                      <span className="text-white font-medium text-sm">{coin.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium text-sm">{formatPrice(coin.price)}</div>
                      <div className={`text-xs font-medium ${coin.change >= 0 ? 'text-[#05b169]' : 'text-[#f34141]'}`}>
                        {coin.change >= 0 ? '↑' : '↓'} {Math.abs(coin.change).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Advanced trader ─────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image */}
          <div className="flex-1 flex justify-center">
            <div className="bg-[#0a0b0d] rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl">
              <img src={advancedImg} alt="Advanced trading platform" className="w-full h-auto" />
            </div>
          </div>
          {/* Text */}
          <div className="flex-1 max-w-lg">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Powerful tools, designed for the advanced trader.
            </h2>
            <p className="text-base text-gray-500 mb-8 leading-relaxed">
              Powerful analytical tools with the safety and security of Coinbase deliver the ultimate trading experience.
              Tap into sophisticated charting capabilities, real-time order books, and deep liquidity across hundreds of markets.
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="bg-gray-900 hover:bg-gray-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              Start trading
            </button>
          </div>
        </div>
      </section>

      {/* ── Coinbase One — Zero fees ─────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text */}
          <div className="flex-1 max-w-lg">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1652f0]" />
              <span className="text-xs font-bold tracking-[0.15em] text-gray-700 uppercase">Coinbase One</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Zero trading fees, more rewards.
            </h2>
            <p className="text-base text-gray-500 mb-8 leading-relaxed">
              Get more out of crypto with one membership: zero trading fees, boosted rewards, priority support, and more.
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="bg-gray-900 hover:bg-gray-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              Claim free trial
            </button>
          </div>
          {/* Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="bg-gray-50 rounded-3xl overflow-hidden w-full max-w-md p-6 shadow-sm">
              <img src={zeroFeesImg} alt="Zero fees with Coinbase One" className="w-full h-auto rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Base App ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image */}
          <div className="flex-1 flex justify-center">
            <div className="bg-gray-50 rounded-3xl overflow-hidden w-full max-w-md p-6 shadow-sm">
              <img src={baseAppImg} alt="Base App" className="w-full h-auto rounded-xl" />
            </div>
          </div>
          {/* Text */}
          <div className="flex-1 max-w-lg">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1652f0]" />
              <span className="text-xs font-bold tracking-[0.15em] text-gray-700 uppercase">Base App</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Countless ways to earn crypto with the Base App.
            </h2>
            <p className="text-base text-gray-500 mb-8 leading-relaxed">
              An everything app to trade, create, discover, and chat, all in one place.
            </p>
            <button className="bg-gray-900 hover:bg-gray-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* ── Learn crypto basics ──────────────────────────────────── */}
      <section className="bg-[#f5f5f5] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 max-w-xs leading-tight">
              New to crypto? Learn some crypto basics
            </h2>
            <div className="max-w-md">
              <p className="text-base text-gray-500 mb-6">
                Beginner guides, practical tips, and market updates for first-timers, experienced
                investors, and everyone in between
              </p>
              <button className="bg-gray-900 hover:bg-gray-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors">
                Read More
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEARN_ARTICLES.map((article, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              >
                <img src={article.img} alt={article.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className={`font-semibold text-gray-900 mb-2 leading-snug ${article.underline ? 'underline' : ''}`}>
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{article.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Take control CTA ─────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text + form */}
          <div className="flex-1 max-w-lg">
            <h2 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Take control of your money
            </h2>
            <p className="text-base text-gray-600 mb-8">
              Start your portfolio today and discover crypto
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                value={ctaEmail}
                onChange={e => setCtaEmail(e.target.value)}
                placeholder="satoshi@nakamoto.com"
                className="flex-1 min-w-0 border border-gray-300 rounded-full px-5 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSignup}
                className="bg-[#1652f0] hover:bg-[#1244c4] text-white font-semibold px-6 py-3 rounded-full transition-colors whitespace-nowrap"
              >
                Sign up
              </button>
            </div>
          </div>
          {/* Floating coin icons */}
          <div className="flex-1 relative h-80 hidden lg:block">
            {COIN_FLOATS.map((coin, i) => (
              <div
                key={i}
                className="absolute rounded-full flex items-center justify-center text-white font-bold shadow-lg select-none"
                style={{
                  width:           coin.size,
                  height:          coin.size,
                  backgroundColor: coin.bg,
                  left:            coin.x,
                  top:             coin.y,
                  fontSize:        Math.round(coin.size * 0.38),
                }}
              >
                {coin.symbol}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Legal disclaimer ─────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <p className="text-sm text-gray-400">
            DEX trading is offered by Coinbase Bermuda Technologies Ltd.
          </p>
          <p className="text-sm text-gray-400 leading-relaxed">
            Products and features may not be available in all regions. Information is for informational
            purposes only, and is not (i) an offer, or solicitation of an offer, to invest in, or to buy
            or sell, any interests or shares, or to participate in any investment or trading strategy or
            (ii) intended to provide accounting, legal, or tax advice, or investment recommendations.
            Trading cryptocurrency comes with risk.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
