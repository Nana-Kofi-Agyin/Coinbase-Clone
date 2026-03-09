import { createContext, useContext, useState, useEffect } from 'react';

/**
 * CurrencyContext — source of truth for the app's pricing display.
 *
 * On mount it fetches the full list of supported vs-currencies from CoinGecko,
 * stores them alongside a `selectedCurrency` (default 'usd'), and exposes a
 * `formatPrice` helper that uses Intl.NumberFormat for proper symbol/locale
 * formatting, with a plain fallback for non-ISO-4217 crypto tickers.
 */

const CurrencyContext = createContext(null);

// CoinGecko returns ~80 currency codes; some (btc, eth, sats…) are not valid
// ISO 4217 codes and will throw in Intl.NumberFormat — we catch and fall back.
function buildFormatter(code, amount) {
  const fractionDigits = amount < 1 ? 6 : 2;
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: code.toUpperCase(),
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(amount);
  } catch {
    // Non-ISO currency (crypto ticker like BTC, ETH, SATS, etc.)
    const plain =
      amount >= 1000
        ? amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : amount >= 1
        ? amount.toFixed(2)
        : amount.toFixed(6);
    return `${code.toUpperCase()} ${plain}`;
  }
}

export function CurrencyProvider({ children }) {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then((data) => {
        // API returns an unsorted array of lowercase strings like ["btc","eth","usd","eur",…]
        const sorted = [...data].sort((a, b) => a.localeCompare(b));
        setCurrencies(sorted);
      })
      .catch(() => {
        // Graceful fallback: a minimal set of common currencies
        setCurrencies([
          'aud','brl','btc','cad','chf','cny','eur','gbp','ghs','hkd',
          'idr','inr','jpy','krw','mxn','myr','nok','nzd','php','pln',
          'rub','sar','sek','sgd','thb','try','twd','uah','usd','zar',
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  /** Format a numeric price value using the currently selected currency. */
  function formatPrice(amount) {
    return buildFormatter(selectedCurrency, amount);
  }

  /** The uppercase symbol / code label, e.g. "USD", "GHS", "BTC". */
  const currencyLabel = selectedCurrency.toUpperCase();

  return (
    <CurrencyContext.Provider
      value={{ currencies, selectedCurrency, setSelectedCurrency, formatPrice, currencyLabel, loading }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

/** Convenience hook — must be used inside <CurrencyProvider>.
 *  @eslint-disable-next-line react-refresh/only-export-components — intentional: hook is co-located with its provider
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within <CurrencyProvider>');
  return ctx;
}
