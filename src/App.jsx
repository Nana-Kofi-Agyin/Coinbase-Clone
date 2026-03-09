import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import Loading from './components/common/Loading';
import { CurrencyProvider } from './context/CurrencyContext';

// Lazy-load page routes to show the loading UI while bundles load
const Home = lazy(() => import('./pages/Home'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Explore = lazy(() => import('./pages/Explore'));
const AssetDetail = lazy(() => import('./pages/AssetDetail'));
const Learn = lazy(() => import('./pages/Learn'));

function App() {
  return (
    <CurrencyProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/assets/:id" element={<AssetDetail />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </CurrencyProvider>
  );
}

export default App;
