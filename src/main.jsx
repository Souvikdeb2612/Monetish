import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StackProvider } from '@stackframe/react';
import App from './App.jsx';
import { StoreProvider } from './lib/store.jsx';
import { stackApp } from './lib/stack.js';
import './styles/app.css';

// Until Stack keys land in Vercel env, render without the provider so the
// existing localStorage demo still works. Once VITE_STACK_PROJECT_ID and
// VITE_STACK_PUBLISHABLE_CLIENT_KEY are set, real auth kicks in automatically.
function Root({ children }) {
  if (!stackApp) return children;
  return <StackProvider app={stackApp}>{children}</StackProvider>;
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
