import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.jsx';
import { StoreProvider } from './lib/store.jsx';
import './styles/app.css';

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// During Phase 1 setup the Clerk key may not be set yet — render without the
// provider so the existing localStorage demo still works. Once the env var is
// added in Vercel, real auth kicks in automatically.
function Root({ children }) {
  if (!CLERK_KEY) return children;
  return <ClerkProvider publishableKey={CLERK_KEY}>{children}</ClerkProvider>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root>
      <StoreProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreProvider>
    </Root>
  </React.StrictMode>,
);
