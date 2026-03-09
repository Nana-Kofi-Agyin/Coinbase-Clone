import { useState } from 'react';
import { Link } from 'react-router-dom';
import coinbaseLogo from '../assets/coinbaseLogoNavigation-4.svg';

// Google "G" colour icon
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

// Apple logo icon
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-white" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

// Passkey / person icon
const PasskeyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-white" aria-hidden="true">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    if (!isValidEmail(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    // Frontend-only demo — no backend call
    alert(`Demo: continuing sign-in for ${email.trim()}`);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-[#0a0f1b] flex flex-col text-white">
      {/* ─── Header / Logo ─── */}
      <header className="px-6 pt-5 pb-2">
        <Link to="/" aria-label="Coinbase home">
          <img src={coinbaseLogo} alt="Coinbase" className="h-8 w-8" />
        </Link>
      </header>

      {/* ─── Main form ─── */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[400px]">
          <h1 className="text-3xl font-bold text-center mb-8 tracking-tight">
            Sign in to Coinbase
          </h1>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email label */}
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-2"
            >
              Email
            </label>

            {/* Email input */}
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Your email address"
              autoComplete="email"
              className={[
                'w-full bg-[#151c2e] text-white placeholder-gray-500',
                'rounded-xl px-4 py-[14px] text-base border-2 outline-none',
                'transition-colors duration-150',
                error
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-[#253151] focus:border-[#1652f0]',
              ].join(' ')}
            />

            {/* Inline validation error */}
            {error && (
              <p role="alert" className="mt-2 text-sm text-red-400">
                {error}
              </p>
            )}

            {/* Continue button */}
            <button
              type="submit"
              className="w-full mt-4 bg-[#1652f0] hover:bg-[#1244cc] active:bg-[#0f3aaa] text-white font-semibold py-[14px] rounded-full text-base transition-colors duration-150 cursor-pointer"
            >
              Continue
            </button>
          </form>

          {/* ─── OR divider ─── */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#253151]" />
            <span className="text-gray-500 text-sm font-medium tracking-wide">OR</span>
            <div className="flex-1 h-px bg-[#253151]" />
          </div>

          {/* ─── Social sign-in buttons ─── */}
          <div className="flex flex-col gap-3">
            {/* Passkey */}
            <button
              type="button"
              className="w-full flex items-center bg-[#151c2e] hover:bg-[#1a2338] border border-[#253151] text-white font-semibold py-[14px] px-5 rounded-full text-base transition-colors duration-150 cursor-pointer"
            >
              <span className="w-6 flex justify-center">
                <PasskeyIcon />
              </span>
              <span className="flex-1 text-center">Sign In with Passkey</span>
            </button>

            {/* Google */}
            <button
              type="button"
              className="w-full flex items-center bg-[#151c2e] hover:bg-[#1a2338] border border-[#253151] text-white font-semibold py-[14px] px-5 rounded-full text-base transition-colors duration-150 cursor-pointer"
            >
              <span className="w-6 flex justify-center">
                <GoogleIcon />
              </span>
              <span className="flex-1 text-center">Sign In with Google</span>
            </button>

            {/* Apple */}
            <button
              type="button"
              className="w-full flex items-center bg-[#151c2e] hover:bg-[#1a2338] border border-[#253151] text-white font-semibold py-[14px] px-5 rounded-full text-base transition-colors duration-150 cursor-pointer"
            >
              <span className="w-6 flex justify-center">
                <AppleIcon />
              </span>
              <span className="flex-1 text-center">Sign In with Apple</span>
            </button>
          </div>

          {/* ─── Sign up link ─── */}
          <p className="text-center mt-8 text-gray-400 text-sm">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="text-[#1652f0] hover:text-[#4575f5] font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>

          {/* ─── Private window note ─── */}
          <p className="text-center mt-4 text-gray-600 text-xs leading-relaxed">
            Not your device? Use a private window. See our{' '}
            <a href="#" className="text-gray-500 underline hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>{' '}
            for more info.
          </p>
        </div>
      </main>

      {/* ─── Cookie consent banner ─── */}
      {showCookieBanner && (
        <div className="fixed bottom-0 inset-x-0 bg-[#0d1526] border-t border-[#253151] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-50">
          <p className="text-gray-400 text-sm leading-relaxed">
            We use strictly necessary cookies to enable essential functions, such as security and
            authentication. For more information, see our{' '}
            <a href="#" className="text-gray-300 underline hover:text-white transition-colors">
              Cookie Policy
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => setShowCookieBanner(false)}
            className="shrink-0 bg-[#1652f0] hover:bg-[#1244cc] text-white font-semibold px-8 py-2 rounded-full text-sm transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
