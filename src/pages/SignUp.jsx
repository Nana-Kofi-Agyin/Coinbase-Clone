import { useState } from 'react';
import { Link } from 'react-router-dom';
import coinbaseLogo from '../assets/coinbaseLogoNavigation-4.svg';
import personalIcon from '../assets/delegate-3.svg';
import developerIcon from '../assets/developerPlatformNavigation-2.svg';

// ─── Inline Business icon (person + gear badge) ──────────────────────────────
const BusinessIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 49" className="w-full h-full">
    <path fill="#588AF5" d="M24 12a6 6 0 1 0 0-12 6 6 0 0 0 0 12m0 4.033c-8.287 0-15 5.37-15 12v15h30v-15c0-6.63-6.712-12-15-12"/>
    <path fill="#464B55" d="M48 28.033H0v20h48z"/>
    <path fill="#0A0B0D" d="M39 28.033H9v20h30z"/>
    {/* gear / settings badge */}
    <circle cx="34" cy="36" r="6" fill="#F5AC37"/>
    <circle cx="34" cy="36" r="2.5" fill="#0A0B0D"/>
    <path d="M34 29.5v1.5M34 41v1.5M27.5 36h1.5M39 36h1.5M30.2 31.7l1.1 1.1M37.7 39.2l1.1 1.1M30.2 40.3l1.1-1.1M37.7 32.8l1.1-1.1"
      stroke="#0A0B0D" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

// ─── Google icon ──────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// ─── Apple icon ───────────────────────────────────────────────────────────────
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-white" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

// ─── Eye toggle icons ─────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.8" aria-hidden="true">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.8" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

// ─── Back-arrow icon ──────────────────────────────────────────────────────────
const BackArrow = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

// ─── Check-circle icon ────────────────────────────────────────────────────────
const CheckCircle = ({ active }) => (
  <svg viewBox="0 0 24 24" className={`w-4 h-4 shrink-0 ${active ? 'text-green-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    {active && <polyline points="9 12 11 14 15 10"/>}
  </svg>
);

// ─── Account type data ────────────────────────────────────────────────────────
const ACCOUNT_TYPES = [
  {
    id: 'personal',
    label: 'Personal',
    description: 'Trade crypto as an individual.',
    iconSrc: personalIcon,
    iconAlt: 'Personal account',
  },
  {
    id: 'business',
    label: 'Business',
    description: 'Manage teams and portfolios, accept crypto payments, access APIs, and more',
    iconComponent: BusinessIcon,
  },
  {
    id: 'developer',
    label: 'Developer',
    description: 'Build onchain using developer tooling.',
    iconSrc: developerIcon,
    iconAlt: 'Developer account',
  },
];

// ─── Password rule helpers ─────────────────────────────────────────────────────
const passwordRules = [
  { id: 'length',  label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { id: 'upper',   label: 'One uppercase letter',  test: (p) => /[A-Z]/.test(p) },
  { id: 'lower',   label: 'One lowercase letter',  test: (p) => /[a-z]/.test(p) },
  { id: 'number',  label: 'One number',             test: (p) => /[0-9]/.test(p) },
];

const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

// ═════════════════════════════════════════════════════════════════════════════
export default function SignUp() {
  const [step, setStep]               = useState(1); // 1 = pick type, 2 = email, 3 = password
  const [accountType, setAccountType] = useState('');
  const [email, setEmail]             = useState('');
  const [emailError, setEmailError]   = useState('');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  // ── Step 1: pick account type ──
  const handleSelectType = (id) => {
    setAccountType(id);
    setStep(2);
  };

  // ── Step 2: email ──
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailError('Email is required.');
      return;
    }
    if (!isValidEmail(email.trim())) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setStep(3);
  };

  // ── Step 3: password ──
  const allRulesMet = passwordRules.every((r) => r.test(password));

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!allRulesMet) {
      setPasswordError('Please meet all password requirements.');
      return;
    }
    setPasswordError('');
    // Frontend-only demo
    alert(`Demo: account created!\nType: ${accountType}\nEmail: ${email}`);
  };

  // ── Shared header ──
  const Header = () => (
    <header className="px-6 pt-5 pb-2 flex items-center gap-3">
      {step > 1 && (
        <button
          type="button"
          onClick={() => setStep((s) => s - 1)}
          className="text-gray-400 hover:text-white p-1 -ml-1 transition-colors cursor-pointer"
          aria-label="Go back"
        >
          <BackArrow />
        </button>
      )}
      <Link to="/" aria-label="Coinbase home">
        <img src={coinbaseLogo} alt="Coinbase" className="h-8 w-8" />
      </Link>
    </header>
  );

  // ── Step progress indicator (steps 2 & 3) ──
  const StepDots = () => (
    <div className="flex items-center justify-center gap-2 mb-6" aria-label={`Step ${step - 1} of 2`}>
      {[2, 3].map((s) => (
        <span
          key={s}
          className={`h-1.5 rounded-full transition-all duration-200 ${
            step >= s ? 'w-6 bg-[#1652f0]' : 'w-1.5 bg-[#253151]'
          }`}
        />
      ))}
    </div>
  );

  // ══════════════════════════════════════════════
  // STEP 1 — Account type picker
  // ══════════════════════════════════════════════
  if (step === 1) {
    return (
      <div className="min-h-screen bg-[#0a0f1b] flex flex-col text-white">
        <Header />

        <main className="flex-1 flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-[440px]">
            <h1 className="text-3xl font-bold text-center mb-8 leading-snug">
              What kind of account are<br />you creating?
            </h1>

            <div className="flex flex-col gap-3">
              {ACCOUNT_TYPES.map(({ id, label, description, iconSrc, iconAlt, iconComponent: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSelectType(id)}
                  className="w-full flex items-center gap-4 bg-transparent hover:bg-[#151c2e] border border-[#253151] hover:border-[#3a4a6b] text-left rounded-2xl px-5 py-4 transition-colors duration-150 cursor-pointer group"
                >
                  {/* Icon box */}
                  <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden bg-[#0d1526] flex items-center justify-center p-1">
                    {iconSrc ? (
                      <img src={iconSrc} alt={iconAlt} className="w-full h-full object-contain" />
                    ) : (
                      <Icon />
                    )}
                  </div>

                  {/* Text */}
                  <div>
                    <p className="font-semibold text-white text-base">{label}</p>
                    <p className="text-gray-400 text-sm leading-snug mt-0.5">{description}</p>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-center mt-8 text-gray-400 text-sm">
              Already have an account?{' '}
              <Link
                to="/signin"
                className="text-[#1652f0] hover:text-[#4575f5] font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </main>

        {/* Cookie banner */}
        {showCookieBanner && <CookieBanner onDismiss={() => setShowCookieBanner(false)} />}
      </div>
    );
  }

  // ══════════════════════════════════════════════
  // STEP 2 — Email
  // ══════════════════════════════════════════════
  if (step === 2) {
    return (
      <div className="min-h-screen bg-[#0a0f1b] flex flex-col text-white">
        <Header />

        <main className="flex-1 flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-[400px]">
            <StepDots />

            <h1 className="text-3xl font-bold text-center mb-2 tracking-tight">
              Create your account
            </h1>
            <p className="text-gray-400 text-center text-sm mb-8">
              Enter your email to get started.
            </p>

            <form onSubmit={handleEmailSubmit} noValidate>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(''); }}
                placeholder="Your email address"
                autoComplete="email"
                className={[
                  'w-full bg-[#151c2e] text-white placeholder-gray-500',
                  'rounded-xl px-4 py-[14px] text-base border-2 outline-none',
                  'transition-colors duration-150',
                  emailError
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-[#253151] focus:border-[#1652f0]',
                ].join(' ')}
              />
              {emailError && (
                <p role="alert" className="mt-2 text-sm text-red-400">{emailError}</p>
              )}

              <button
                type="submit"
                className="w-full mt-4 bg-[#1652f0] hover:bg-[#1244cc] active:bg-[#0f3aaa] text-white font-semibold py-[14px] rounded-full text-base transition-colors duration-150 cursor-pointer"
              >
                Continue
              </button>
            </form>

            {/* OR divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-[#253151]" />
              <span className="text-gray-500 text-sm font-medium tracking-wide">OR</span>
              <div className="flex-1 h-px bg-[#253151]" />
            </div>

            {/* Social sign-up */}
            <div className="flex flex-col gap-3">
              <SocialButton icon={<GoogleIcon />} label="Continue with Google" />
              <SocialButton icon={<AppleIcon />} label="Continue with Apple" />
            </div>

            <p className="text-center mt-8 text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/signin" className="text-[#1652f0] hover:text-[#4575f5] font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </main>

        {showCookieBanner && <CookieBanner onDismiss={() => setShowCookieBanner(false)} />}
      </div>
    );
  }

  // ══════════════════════════════════════════════
  // STEP 3 — Password
  // ══════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#0a0f1b] flex flex-col text-white">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[400px]">
          <StepDots />

          <h1 className="text-3xl font-bold text-center mb-2 tracking-tight">
            Create a password
          </h1>
          <p className="text-gray-400 text-center text-sm mb-8">
            Use at least 8 characters with a mix of letters and numbers.
          </p>

          <form onSubmit={handlePasswordSubmit} noValidate>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
              Password
            </label>

            {/* Password input with show/hide toggle */}
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError(''); }}
                placeholder="Enter your password"
                autoComplete="new-password"
                className={[
                  'w-full bg-[#151c2e] text-white placeholder-gray-500',
                  'rounded-xl px-4 pr-12 py-[14px] text-base border-2 outline-none',
                  'transition-colors duration-150',
                  passwordError
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-[#253151] focus:border-[#1652f0]',
                ].join(' ')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            {/* Password strength rules */}
            {password.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {passwordRules.map((rule) => (
                  <li key={rule.id} className="flex items-center gap-2">
                    <CheckCircle active={rule.test(password)} />
                    <span className={`text-xs ${rule.test(password) ? 'text-green-400' : 'text-gray-500'}`}>
                      {rule.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {passwordError && (
              <p role="alert" className="mt-2 text-sm text-red-400">{passwordError}</p>
            )}

            <button
              type="submit"
              disabled={!allRulesMet}
              className={[
                'w-full mt-5 font-semibold py-[14px] rounded-full text-base transition-colors duration-150',
                allRulesMet
                  ? 'bg-[#1652f0] hover:bg-[#1244cc] active:bg-[#0f3aaa] text-white cursor-pointer'
                  : 'bg-[#1652f0]/40 text-white/40 cursor-not-allowed',
              ].join(' ')}
            >
              Create account
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600 text-xs leading-relaxed">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-gray-400 underline hover:text-gray-200 transition-colors">
              User Agreement
            </a>{' '}
            and{' '}
            <a href="#" className="text-gray-400 underline hover:text-gray-200 transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </main>

      {showCookieBanner && <CookieBanner onDismiss={() => setShowCookieBanner(false)} />}
    </div>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────
function SocialButton({ icon, label }) {
  return (
    <button
      type="button"
      className="w-full flex items-center bg-[#151c2e] hover:bg-[#1a2338] border border-[#253151] text-white font-semibold py-[14px] px-5 rounded-full text-base transition-colors duration-150 cursor-pointer"
    >
      <span className="w-6 flex justify-center">{icon}</span>
      <span className="flex-1 text-center">{label}</span>
    </button>
  );
}

function CookieBanner({ onDismiss }) {
  return (
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
        onClick={onDismiss}
        className="shrink-0 bg-[#1652f0] hover:bg-[#1244cc] text-white font-semibold px-8 py-2 rounded-full text-sm transition-colors cursor-pointer"
      >
        Dismiss
      </button>
    </div>
  );
}
